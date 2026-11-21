const TRACKED_FIELDS = ["id", "series", "name", "start", "end", "status", "venue", "source"];
export function calendarSignature(events) {
  if (!Array.isArray(events)) throw new Error("Calendar events must be an array");
  return JSON.stringify(events.map(event => Object.fromEntries(
    TRACKED_FIELDS.map(field => [field, event[field] ?? null])
  )).sort((a, b) => String(a.id).localeCompare(String(b.id))));
}
export function persistCalendarSnapshot({
  storage, storageKey, events, baselineEvents, previousSnapshotDate,
  curatedSnapshotDate, today, checkedAt
}) {
  const changed = calendarSignature(baselineEvents) !== calendarSignature(events);
  const priorDate = /^\d{4}-\d{2}-\d{2}$/.test(previousSnapshotDate || "")
    ? previousSnapshotDate : curatedSnapshotDate;
  const snapshotDate = changed ? today : priorDate;
  const snapshot = { schemaVersion: 1, snapshotDate, checkedAt, events };
  try {
    storage.setItem(storageKey, JSON.stringify(snapshot));
    return { changed, saved: true, snapshotDate, snapshot };
  } catch (error) {
    return { changed, saved: false, snapshotDate: priorDate, error };
  }
}
