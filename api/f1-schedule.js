export default async function handler(req, res) {
 if (req.method !== "GET") { res.setHeader("Allow","GET"); return res.status(405).json({error:"Method not allowed"}); }
 try {
  const year = new Date().getUTCFullYear();
  const upstream = await fetch("https://api.jolpi.ca/ergast/f1/" + year + ".json?limit=100", {
   headers:{Accept:"application/json","User-Agent":"CHICANE-Motorsport-Hub/1.0"},
   signal:AbortSignal.timeout(8000)
  });
  if (!upstream.ok) throw new Error("Jolpica F1 returned HTTP " + upstream.status);
  const payload = await upstream.json();
  if (!Array.isArray(payload?.MRData?.RaceTable?.Races) || payload.MRData.RaceTable.Races.length === 0) throw new Error("Jolpica F1 returned no scheduled races");
  res.setHeader("Cache-Control","no-store, no-cache, must-revalidate");
  res.setHeader("Access-Control-Allow-Origin","*");
  return res.status(200).json(payload);
 } catch (error) {
  res.setHeader("Cache-Control","no-store");
  return res.status(502).json({error:"Jolpica F1 schedule unavailable",detail:String(error?.message || error)});
 }
}
