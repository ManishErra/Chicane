import assert from "node:assert/strict";
import { normalizeRaceMxCalendar, mergeRaceMxEvents } from "../race-mx-adapter.mjs";

const payload = {
  license: "CC BY 4.0 — attribute Race.mx and link to https://race.mx",
  updated: "2026-10-18T13:55:37+00:00",
  events: [
    { name:"2026 Mexico City Grand Prix (F1)", series:"F1", start_date:"2026-10-31", end_date:"2026-11-02", status:"scheduled", venue:"Autódromo Hermanos Rodríguez", location:"Mexico City, CDMX", url:"https://race.mx/eventos/mexico-city-grand-prix-2026/", sessions:[] },
    { name:"NASCAR Mexico Series Finale – Mexico City 2026", series:"NASCAR Mexico", start_date:"2026-11-07", end_date:"2026-11-08", status:"scheduled", venue:"Autódromo Hermanos Rodríguez", location:"Mexico City, CDMX", url:"https://race.mx/eventos/nascar-mexico-finale-mexico-city-2026/", sessions:[] },
    { name:"2026 SCORE Baja 1000", series:"Baja 1000", start_date:"2026-11-09", end_date:"2026-11-15", status:"scheduled", venue:"Los Cabos – 2026 Baja 1000 Start/Finish", location:"Los Cabos, Baja California Sur", url:"https://race.mx/eventos/score-baja-1000-2026/", sessions:[] },
    { name:"NASCAR Mexico Series Monterrey 120 (2026, cancelled)", series:"NASCAR Mexico", start_date:"2026-09-05", end_date:"2026-09-05", status:"cancelled", venue:"Autódromo Monterrey", location:"Apodaca, Nuevo León", url:"https://race.mx/eventos/nascar-mexico-monterrey-120-2026/", sessions:[] },
    { name:"Unmapped series event", series:"Unmapped Championship", start_date:"2026-11-20", end_date:"2026-11-20", status:"scheduled", venue:"Test Venue", location:"Mexico", url:"https://race.mx/eventos/test/", sessions:[] }
  ]
};

const normalized = normalizeRaceMxCalendar(payload);
assert.equal(normalized.events.length, 4);
assert.equal(normalized.skippedUnsupportedSeries, 1);
assert.equal(normalized.events.find(e => e.series === "f1").license, "CC BY 4.0");
assert.equal(normalized.events.find(e => e.series === "nascar-mexico").short, "NASCAR MX");
assert.equal(normalized.events.find(e => e.series === "score").status, "scheduled");
assert.equal(normalized.events.find(e => e.status === "cancelled").status, "cancelled");

const base = [
  { id:"f1-mexico-2026", series:"f1", short:"F1", name:"Mexico City Grand Prix", venue:"Autódromo Hermanos Rodríguez · Mexico City", start:"2026-10-30", end:"2026-11-01", source:"https://www.formula1.com/en/racing/2026", sourceName:"Formula 1 official calendar" },
  { id:"f1-us-2026", series:"f1", short:"F1", name:"United States Grand Prix", venue:"Circuit of The Americas · Austin, USA", start:"2026-10-23", end:"2026-10-25", source:"https://www.formula1.com/en/racing/2026", sourceName:"Formula 1 official calendar" }
];
const merged = mergeRaceMxEvents(base, normalized.events);
assert.equal(merged.updatedExisting, 1);
assert.equal(merged.added, 3);
assert.equal(merged.events.length, 5);
assert.equal(merged.events.filter(e => e.id === "f1-mexico-2026").length, 1);
assert.equal(merged.events.find(e => e.id === "f1-mexico-2026").start, "2026-10-31");
assert.equal(merged.events.find(e => e.id === "f1-mexico-2026").sourceName, "Race.mx · CC BY 4.0");
assert.equal(merged.events.find(e => e.status === "cancelled").series, "nascar-mexico");
assert.throws(() => normalizeRaceMxCalendar({ ...payload, license:"Unknown" }), /licence/i);
assert.throws(() => normalizeRaceMxCalendar({ ...payload, events:[{ ...payload.events[0], start_date:"2026-02-30" }] }), /date range/i);
assert.throws(() => normalizeRaceMxCalendar({ ...payload, events:[{ ...payload.events[0], url:"http://race.mx/event" }] }), /HTTPS/i);
console.log("Race.mx adapter tests passed: licence gate, schema, mapping, attribution, reschedule merge, cancellation status and duplicate protection.");
