import { readFile } from "node:fs/promises";

const file = new URL("../data/calendar.json", import.meta.url);
const payload = JSON.parse(await readFile(file, "utf8"));
const allowedSeries = new Set(["f1","gt3","gtwc","nascar","motogp","wec","wrc","indy","fe","dakar"]);
const errors = [];
const seen = new Set();
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

if (payload.schemaVersion !== 1) errors.push("schemaVersion must be 1");
if (!isoDate.test(payload.snapshotDate || "")) errors.push("snapshotDate must use YYYY-MM-DD");
if (payload.updateMode !== "curated-static") errors.push("updateMode must explicitly identify the current curated-static mode");
if (!Array.isArray(payload.events) || payload.events.length === 0) errors.push("events must be a non-empty array");

for (const [index, event] of (payload.events || []).entries()) {
  const at = "events[" + index + "]";
  for (const field of ["id","series","short","name","venue","start","end","source","sourceName"]) {
    if (typeof event[field] !== "string" || !event[field].trim()) errors.push(at + "." + field + " is required");
  }
  if (event.id && seen.has(event.id)) errors.push(at + " duplicates id " + event.id);
  if (event.id) seen.add(event.id);
  if (event.series && !allowedSeries.has(event.series)) errors.push(at + " has unknown series " + event.series);
  for (const field of ["start","end"]) {
    if (!isoDate.test(event[field] || "") || Number.isNaN(Date.parse(event[field] + "T00:00:00Z"))) errors.push(at + "." + field + " must be an ISO calendar date");
  }
  if (event.start && event.end && event.end < event.start) errors.push(at + " ends before it starts");
  try {
    const url = new URL(event.source);
    if (url.protocol !== "https:") errors.push(at + ".source must use HTTPS");
  } catch { errors.push(at + ".source must be a valid URL"); }
}

if (errors.length) {
  console.error("CHICANE calendar validation failed:");
  for (const error of errors) console.error(" - " + error);
  process.exitCode = 1;
} else {
  console.log("CHICANE calendar validation passed: " + payload.events.length + " events, " + seen.size + " unique IDs, snapshot " + payload.snapshotDate + ".");
}
