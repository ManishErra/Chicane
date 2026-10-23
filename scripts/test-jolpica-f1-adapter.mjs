import assert from "node:assert/strict";
import { normalizeJolpicaSchedule, mergeJolpicaSchedule } from "../jolpica-f1-adapter.mjs";
const payload = { MRData: { RaceTable: { Races: [
 { season:"2026",round:"1",raceName:"Australian Grand Prix",date:"2026-03-08",url:"https://en.wikipedia.org/wiki/2026_Australian_Grand_Prix",Circuit:{circuitName:"Albert Park Grand Prix Circuit",Location:{locality:"Melbourne",country:"Australia"}},FirstPractice:{date:"2026-03-06"},Qualifying:{date:"2026-03-07"} },
 { season:"2026",round:"19",raceName:"United States Grand Prix",date:"2026-10-25",url:"https://en.wikipedia.org/wiki/United_States_Grand_Prix",Circuit:{circuitName:"Circuit of the Americas",Location:{locality:"Austin",country:"USA"}},FirstPractice:{date:"2026-10-23"},Qualifying:{date:"2026-10-24"} },
 { season:"2026",round:"20",raceName:"New Global Grand Prix",date:"2026-11-08",url:"https://en.wikipedia.org/wiki/New_Global_Grand_Prix",Circuit:{circuitName:"New Circuit",Location:{locality:"Test City",country:"Testland"}}}
]}}};
const normalized = normalizeJolpicaSchedule(payload,2026);
assert.equal(normalized.length,3);
assert.equal(normalized.find(e=>e.name==="United States Grand Prix").start,"2026-10-23");
assert.equal(normalized.find(e=>e.name==="United States Grand Prix").end,"2026-10-25");
const curated = [
 {id:"motogp-au-2026",series:"motogp",name:"Australian Grand Prix",start:"2026-10-22",end:"2026-10-25",venue:"Phillip Island"},
 {id:"f1-us-2026",series:"f1",name:"United States Grand Prix",start:"2026-10-24",end:"2026-10-26",venue:"Austin"},
];
const merged = mergeJolpicaSchedule(curated,normalized);
assert.equal(merged.events.length,4,"same-named MotoGP event must not be replaced by F1");
assert.equal(merged.events.find(e=>e.id==="f1-us-2026").start,"2026-10-23","existing curated F1 event should update by name");
assert.equal(merged.events.find(e=>e.id==="f1-us-2026").end,"2026-10-25");
assert.equal(merged.events.filter(e=>e.series==="f1"&&e.name==="United States Grand Prix").length,1,"no duplicate F1 event");
assert.equal(merged.events.filter(e=>e.name==="New Global Grand Prix").length,1,"new F1 event should be added");
assert.throws(()=>normalizeJolpicaSchedule({MRData:{RaceTable:{Races:[]}}},2026),/no races/);
assert.throws(()=>normalizeJolpicaSchedule({MRData:{RaceTable:{Races:[{raceName:"Bad",date:"2026-02-30"}]}}},2026),/invalid name\/date/);
console.log("Jolpica F1 adapter tests passed: normalize, date range, safe name matching, add new race, no cross-series collision, malformed feed rejection.");
