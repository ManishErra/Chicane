import assert from "node:assert/strict";
import { calendarSignature, persistCalendarSnapshot } from "../calendar-snapshot.mjs";

const today = "2026-10-23";
const priorDate = "2026-10-22";
const checkedAt = "2026-10-23T11:30:00.000Z";
const base = [
  { id:"f1-us-2026", series:"f1", name:"United States Grand Prix", start:"2026-10-23", end:"2026-10-25", status:"scheduled", venue:"Austin", source:"official" },
  { id:"motogp-au-2026", series:"motogp", name:"Australian Grand Prix", start:"2026-10-22", end:"2026-10-25", status:"scheduled", venue:"Phillip Island", source:"official" }
];
function mockStorage(shouldThrow = false) {
  const values = new Map();
  return { values, setItem(key, value) { if (shouldThrow) throw new Error("quota"); values.set(key, value); } };
}
const storageKey = "test-snapshot";
const unchangedStorage = mockStorage();
const unchanged = persistCalendarSnapshot({storage:unchangedStorage,storageKey,events:base,baselineEvents:base,previousSnapshotDate:priorDate,curatedSnapshotDate:priorDate,today,checkedAt});
assert.equal(unchanged.changed,false);
assert.equal(unchanged.saved,true);
assert.equal(unchanged.snapshotDate,priorDate);
assert.equal(JSON.parse(unchangedStorage.values.get(storageKey)).checkedAt,checkedAt);

const added = [...base,{id:"wec-bahrain-2026",series:"wec",name:"Bahrain 8 Hours",start:"2026-11-07",end:"2026-11-07",status:"scheduled",venue:"Bahrain",source:"official"}];
const addStorage=mockStorage();
const addResult=persistCalendarSnapshot({storage:addStorage,storageKey,events:added,baselineEvents:base,previousSnapshotDate:priorDate,curatedSnapshotDate:priorDate,today,checkedAt});
assert.equal(addResult.changed,true);
assert.equal(addResult.saved,true);
assert.equal(addResult.snapshotDate,today);
assert.equal(JSON.parse(addStorage.values.get(storageKey)).events.length,3);

const rescheduled=base.map(e=>e.id==="f1-us-2026"?{...e,start:"2026-10-24",end:"2026-10-26"}:e);
const dateStorage=mockStorage();
const dateResult=persistCalendarSnapshot({storage:dateStorage,storageKey,events:rescheduled,baselineEvents:base,previousSnapshotDate:priorDate,curatedSnapshotDate:priorDate,today,checkedAt});
assert.equal(dateResult.changed,true);
assert.equal(dateResult.snapshotDate,today);
assert.equal(JSON.parse(dateStorage.values.get(storageKey)).events.find(e=>e.id==="f1-us-2026").start,"2026-10-24");

const cancelled=base.map(e=>e.id==="motogp-au-2026"?{...e,status:"cancelled"}:e);
assert.notEqual(calendarSignature(base),calendarSignature(cancelled),"cancellation must count as a calendar change");

const failedStorage=mockStorage(true);
const failed=persistCalendarSnapshot({storage:failedStorage,storageKey,events:added,baselineEvents:base,previousSnapshotDate:priorDate,curatedSnapshotDate:priorDate,today,checkedAt});
assert.equal(failed.changed,true);
assert.equal(failed.saved,false);
assert.equal(failed.snapshotDate,priorDate,"failed persistence must retain prior snapshot date");

assert.equal(calendarSignature([...base].reverse()),calendarSignature(base),"ordering alone is not a change");
console.log("Calendar snapshot tests passed: unchanged check, new race, reschedule, cancellation, order stability, persisted payload and storage failure.");
