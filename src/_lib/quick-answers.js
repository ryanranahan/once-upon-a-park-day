// "Quick answers" for hotel guide pages: short, direct question-and-answer
// pairs built only from facts already on the page (tier, area, transport,
// best for, keep in mind, tips). Search engines and AI assistants quote this
// kind of plain answer, and it feeds the FAQPage structured data.
//
// A guide can add its own hand-written questions as a `faq` array of
// { "q": "...", "a": "..." } in its guide data. Those are shown first.

import { execFileSync } from "node:child_process";

const LOWER_FIRST = new Set([
  "Buses", "Boat", "Boats", "Walking", "Monorail", "Internal", "A", "An", "Its", "Dedicated",
  "Resort", "Water", "Shuttle", "Same", "Closest", "Couples", "Families", "Family", "Budget-minded",
  "Animal", "Campers", "Guests", "Thrill", "Large", "Fans", "Anyone", "Adults",
]);

function lowerFirst(s) {
  const first = s.split(/\s/)[0];
  return LOWER_FIRST.has(first) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}
const sentence = (s) => (/[.!?]$/.test(s.trim()) ? s.trim() : s.trim() + ".");
const article = (word) => (/^[AEIOU]/i.test(word) ? "an" : "a");
const hasPlaceholder = (s) => /\[[A-Z][A-Z ,]*\]/.test(s || "");
const usable = (s) => typeof s === "string" && s.trim() && !hasPlaceholder(s);

export function quickAnswers(resort, g, dest) {
  if (!resort) return [];
  g = g || {};
  const out = [];
  const short = resort.short || resort.name;
  // Questions use the full name (what people search for) unless it's very long.
  const qName = resort.name.length <= 45 ? resort.name : short;

  if (Array.isArray(g.faq)) {
    for (const f of g.faq) if (usable(f.q) && usable(f.a)) out.push({ q: f.q, a: f.a });
  }

  // What kind of hotel is it?
  let kind;
  if (dest && dest.slug === "wdw") {
    kind = `${resort.name} is ${article(resort.tier)} ${resort.tier} resort in the ${resort.area} of Walt Disney World.`;
  } else if (dest) {
    const tier = ["Hotel", "Villa"].includes(resort.tier) ? "on-site hotel" : `${resort.tier} hotel`;
    kind = `${resort.name} is ${article(tier)} ${tier} at the ${dest.name}.`;
  }
  if (kind) {
    if (usable(resort.theme)) kind += " " + sentence(resort.theme);
    if (resort.dvc) kind += " It's a Disney Vacation Club resort, but you don't need to be a member to stay here.";
    out.push({ q: `What kind of hotel is ${qName}?`, a: kind });
  }

  if (usable(g.bestFor)) {
    out.push({ q: `Who is ${qName} best for?`, a: `${short} is best for ${lowerFirst(sentence(g.bestFor))}` });
  }

  const transport = (resort.transport || []).filter(usable);
  if (transport.length) {
    const list = transport.map(lowerFirst);
    const joined =
      list.length === 1 ? list[0]
      : list.length === 2 ? `${list[0]}, or ${list[1]}`
      : list.slice(0, -1).join("; ") + "; or " + list[list.length - 1];
    const a = /^same as /i.test(transport[0]) && transport.length === 1
      ? `From ${short}, getting around is the ${sentence(lowerFirst(transport[0]).replace(/^same as/i, "same as"))}`
      : `From ${short}, your options are ${sentence(joined)}`;
    out.push({ q: `How do you get from ${qName} to the parks?`, a });
  }

  const cons = (g.cons || []).filter(usable);
  if (cons.length) {
    out.push({ q: `What are the downsides of staying at ${qName}?`, a: "Things to keep in mind: " + cons.map(sentence).join(" ") });
  }

  const tips = (g.tips || []).filter(usable).slice(0, 2);
  if (tips.length) {
    out.push({ q: `What should first-timers know about ${qName}?`, a: tips.map(sentence).join(" ") });
  }

  // Hand-written questions win over a generated one with the same wording.
  const seen = new Set();
  return out.filter((f) => !seen.has(f.q.toLowerCase()) && seen.add(f.q.toLowerCase()));
}

const listJoin = (items) =>
  items.length <= 1 ? items.join("") : items.length === 2 ? `${items[0]} and ${items[1]}` : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

// Quick answers for a Disney Cruise Line ship page, from the ship's facts.
export function shipAnswers(ship) {
  if (!ship) return [];
  const out = [];
  const name = ship.name;
  const the = "the " + name;

  if (Array.isArray(ship.faq)) {
    for (const f of ship.faq) if (usable(f.q) && usable(f.a)) out.push({ q: f.q, a: f.a });
  }

  const size = [];
  if (usable(ship.size)) size.push(`${the} is ${ship.size}`);
  const parts = [];
  if (usable(ship.staterooms)) parts.push(`${ship.staterooms} staterooms`);
  if (usable(ship.decks)) parts.push(/deck/i.test(ship.decks) ? ship.decks : `${ship.decks} decks`);
  if (parts.length) size.push((size.length ? "with " : `${the} has `) + listJoin(parts));
  let sizeA = size.join(", ");
  if (sizeA) sizeA = sentence(sizeA.charAt(0).toUpperCase() + sizeA.slice(1));
  if (usable(ship.guests)) {
    const guests = ship.guests.replace(/^((?:up to )?(?:about )?[\d,]+)/, "$1 guests");
    sizeA += (sizeA ? " " : "") + `It carries ${sentence(guests)}`;
  }
  if (sizeA) out.push({ q: `How big is ${the}?`, a: sizeA });

  if (usable(ship.homePorts)) out.push({ q: `Where does ${the} sail from?`, a: `${the.charAt(0).toUpperCase() + the.slice(1)} sails from ${sentence(ship.homePorts)}` });

  const rotation = (ship.rotation || []).filter(usable);
  const adult = (ship.adult || []).filter(usable);
  if (rotation.length) {
    let a = `The main dining rotation on ${the} is ${listJoin(rotation)}. You move between them on different nights, and your servers move with you.`;
    if (adult.length) a += ` Adult-only dining, for an extra charge, is ${listJoin(adult)}.`;
    out.push({ q: `What are the restaurants on ${the}?`, a });
  }

  const cons = (ship.cons || []).filter(usable);
  if (cons.length) out.push({ q: `What are the downsides of ${the}?`, a: "Things to keep in mind: " + cons.map(sentence).join(" ") });

  const tips = (ship.tips || []).filter(usable).slice(0, 2);
  if (tips.length) out.push({ q: `What should first-time cruisers know about ${the}?`, a: tips.map(sentence).join(" ") });

  const seen = new Set();
  return out.filter((f) => !seen.has(f.q.toLowerCase()) && seen.add(f.q.toLowerCase()));
}

// The month a file was last changed in git, e.g. "November 2026". Used as the
// "Last updated" date on guides that don't have a "facts last checked" date.
const gitCache = new Map();
export function lastChanged(file) {
  if (gitCache.has(file)) return gitCache.get(file);
  let value = null;
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], { encoding: "utf8" }).trim();
    if (iso) {
      const d = new Date(iso + "T00:00:00Z");
      value = { iso, month: d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }) };
    }
  } catch {
    value = null;
  }
  gitCache.set(file, value);
  return value;
}
