export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const upstream = await fetch("https://race.mx/data/calendar.json", {
      headers: { Accept: "application/json", "User-Agent": "CHICANE-Motorsport-Hub/1.0" },
      signal: AbortSignal.timeout(8000)
    });
    if (!upstream.ok) {
      res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
      return res.status(502).json({ error: "Race.mx upstream returned HTTP " + upstream.status });
    }
    const payload = await upstream.json();
    if (!payload || !Array.isArray(payload.events) || !/CC BY 4\.0/i.test(String(payload.license || ""))) {
      return res.status(502).json({ error: "Race.mx returned an invalid or unlicensed calendar" });
    }
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(payload);
  } catch (error) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ error: "Race.mx feed is temporarily unreachable", detail: String(error?.message || error) });
  }
}
