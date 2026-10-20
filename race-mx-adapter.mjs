const SERIES_MAP = new Map([
 ["f1",{id:"f1",short:"F1"}],["formula 1",{id:"f1",short:"F1"}],
 ["formula e",{id:"fe",short:"FE"}],["nascar mexico",{id:"nascar-mexico",short:"NASCAR MX"}],
 ["score desert racing",{id:"score",short:"SCORE"}],["baja 1000",{id:"score",short:"SCORE"}]
]);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES = new Set(["scheduled","completed","cancelled"]);
const canonical = value => String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
function validDate(value){return ISO_DATE.test(value||"")&&!Number.isNaN(Date.parse(value+"T00:00:00Z"))&&new Date(value+"T00:00:00Z").toISOString().slice(0,10)===value}
function https(value,label){let u;try{u=new URL(value)}catch{throw new Error(label+" must be a valid URL")}if(u.protocol!=="https:")throw new Error(label+" must use HTTPS");return u.href}
function slug(value){return canonical(value).replace(/\s+/g,"-")}
export function normalizeRaceMxCalendar(payload){
 if(!payload||typeof payload!=="object")throw new Error("Race.mx payload must be an object");
 if(!/CC BY 4\.0/i.test(String(payload.license||"")))throw new Error("Race.mx licence is missing or is not CC BY 4.0");
 if(!validDate(String(payload.updated||"").slice(0,10)))throw new Error("Race.mx updated timestamp is invalid");
 if(!Array.isArray(payload.events))throw new Error("Race.mx events must be an array");
 const events=[],ids=new Set();let skippedUnsupportedSeries=0;
 for(const [i,item] of payload.events.entries()){
  const at="Race.mx events["+i+"]";
  if(!item||typeof item!=="object")throw new Error(at+" must be an object");
  for(const field of ["name","series","start_date","end_date","status","url"])if(typeof item[field]!=="string"||!item[field].trim())throw new Error(at+"."+field+" is required");
  if(!validDate(item.start_date)||!validDate(item.end_date)||item.end_date<item.start_date)throw new Error(at+" has an invalid date range");
  if(!STATUSES.has(item.status))throw new Error(at+" has an unsupported status");
  const source=https(item.url,at+".url"),mapped=SERIES_MAP.get(canonical(item.series));
  if(!mapped){skippedUnsupportedSeries++;continue}
  const name=item.name.trim(),id="racemx-"+mapped.id+"-"+slug(name)+"-"+item.start_date;
  if(ids.has(id))throw new Error(at+" duplicates generated id "+id);ids.add(id);
  const venue=typeof item.venue==="string"&&item.venue.trim()?item.venue.trim():typeof item.location==="string"&&item.location.trim()?item.location.trim():"Venue to be confirmed";
  events.push({id,series:mapped.id,short:mapped.short,name,venue:typeof item.location==="string"&&item.location.trim()&&venue!==item.location.trim()?venue+" · "+item.location.trim():venue,start:item.start_date,end:item.end_date,status:item.status,source,sourceName:"Race.mx · CC BY 4.0",provider:"Race.mx",providerUpdated:payload.updated,license:"CC BY 4.0",sessions:Array.isArray(item.sessions)?item.sessions.filter(s=>s&&typeof s.name==="string"&&typeof s.start==="string"):[]});
 }
 return {updated:payload.updated,events,skippedUnsupportedSeries};
}
export function mergeRaceMxEvents(baseEvents,providerEvents){
 if(!Array.isArray(baseEvents)||!Array.isArray(providerEvents))throw new Error("Calendar merge expects two event arrays");
 const merged=baseEvents.map(e=>({...e})),matched=new Set();let updatedExisting=0,added=0;
 for(const incoming of providerEvents){
  const n=canonical(incoming.name),v=canonical(incoming.venue);
  // Match by series and normalized event title only. Date-only matches can
  // overwrite a different race in a same-weekend calendar.
  let i=merged.findIndex(e=>{if(matched.has(e.id)||e.series!==incoming.series)return false;const en=canonical(e.name);return n&&en&&(n.includes(en)||en.includes(n))});
  if(i>=0){const old=merged[i];merged[i]={...old,...incoming,id:old.id,name:old.name,short:old.short,venue:incoming.venue||old.venue};matched.add(old.id);updatedExisting++}
  else{merged.push({...incoming});matched.add(incoming.id);added++}
 }
 const ids=new Set();for(const e of merged){if(ids.has(e.id))throw new Error("Duplicate merged event id "+e.id);ids.add(e.id)}
 return {events:merged,updatedExisting,added};
}
