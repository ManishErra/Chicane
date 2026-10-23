const canonical = value => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const slug = value => canonical(value).replace(/\s+/g, "-");
const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value || "") && !Number.isNaN(Date.parse(value + "T00:00:00Z")) && new Date(value + "T00:00:00Z").toISOString().slice(0,10) === value;
function sessionDate(race, key) {
 const value = race?.[key]?.date;
 return validDate(value) ? value : null;
}
function endDate(race, fallback) {
 const dates = ["FirstPractice","SecondPractice","ThirdPractice","Sprint","Qualifying","SprintQualifying","SprintShootout"].map(key => sessionDate(race,key)).filter(Boolean);
 dates.push(fallback);
 return dates.sort().at(-1);
}
export function normalizeJolpicaSchedule(payload, year = new Date().getUTCFullYear()) {
 const races = payload?.MRData?.RaceTable?.Races;
 if (!Array.isArray(races) || races.length === 0) throw new Error("Jolpica F1 schedule contains no races");
 const seen = new Set();
 return races.map((race, index) => {
  const name = String(race.raceName || "").trim();
  const raceDate = race.date;
  if (!name || !validDate(raceDate)) throw new Error("Jolpica F1 race " + index + " has invalid name/date");
  const country = String(race.Circuit?.Location?.country || "").trim();
  const locality = String(race.Circuit?.Location?.locality || "").trim();
  const circuit = String(race.Circuit?.circuitName || "").trim();
  const id = "f1-" + slug(name) + "-" + year;
  if (seen.has(id)) throw new Error("Jolpica F1 schedule contains duplicate race " + id);
  seen.add(id);
  const sessionStarts = ["FirstPractice","SecondPractice","ThirdPractice","Sprint","Qualifying","SprintQualifying","SprintShootout"].map(key => sessionDate(race,key)).filter(Boolean);
  const start = sessionStarts.length ? sessionStarts.sort()[0] : raceDate;
  const source = typeof race.url === "string" && race.url.startsWith("https://") ? race.url : "https://api.jolpi.ca/ergast/f1/" + year + ".json";
  return {
   id, series:"f1", short:"F1", name, start, end:endDate(race,raceDate),
   status:"scheduled", venue:[circuit,locality,country].filter(Boolean).join(" · "),
   source, sourceName:"Jolpica F1 schedule", provider:"Jolpica F1",
   dataOrigin:"live-provider", freshness:"checked", providerUpdated:new Date().toISOString()
  };
 });
}
export function mergeJolpicaSchedule(existingEvents, incomingEvents) {
 if (!Array.isArray(existingEvents) || !Array.isArray(incomingEvents) || incomingEvents.length === 0) throw new Error("Existing and incoming F1 event arrays are required");
 const incomingById = new Map(incomingEvents.map(event => [event.id,event]));
 const incomingByName = new Map(incomingEvents.map(event => [canonical(event.name),event]));
 const consumed = new Set();
 let matchedCount = 0;
 const result = existingEvents.map(event => {
  const incoming = incomingById.get(event.id) || (event.series === "f1" ? incomingByName.get(canonical(event.name)) : null);
  if (!incoming) return event;
  consumed.add(incoming.id);
  matchedCount++;
  // Only replace schedule fields from the validated F1 schedule; preserve the
  // curated event identity and any app-specific display metadata.
  return {...event,start:incoming.start,end:incoming.end,name:incoming.name,venue:incoming.venue || event.venue,source:incoming.source,sourceName:incoming.sourceName,provider:"Jolpica F1",dataOrigin:"live-provider"};
 });
 const additions = incomingEvents.filter(event => !consumed.has(event.id) && !result.some(existing => existing.series === "f1" && canonical(existing.name) === canonical(event.name)));
 return {events:[...result,...additions],updatedCount:additions.length,matchedCount};
}
