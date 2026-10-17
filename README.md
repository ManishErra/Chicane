# CHICANE Motorsport Hub

**A unified, dark-mode home for upcoming motorsport weekends.**

CHICANE's first milestone is a fast, responsive series directory that helps fans reach official race calendars without fabricating dates or session times.

## Current prototype

- Responsive desktop and mobile layout
- Series directory and discipline filters
- Search across series and disciplines
- Browser-local favourites (no account)
- India Standard Time clock and date
- Official calendar / series links
- Installable-app foundation and basic shell caching where supported
- Calendar export foundation (event records will be added only after source verification)

## Coverage model

The directory has 11 championship/discipline entries. GT3 is represented as a **class**, not a standalone championship. Le Mans 24 Hours is part of WEC; Dakar is represented as rally raid. We will avoid duplicate championship entries when we add event data.

## Data integrity

- Do not invent schedules, results, standings, or session times.
- The current prototype links to official series pages; it does **not** claim to have integrated or verified a live multi-series schedule feed.
- Before displaying event dates in-app, validate the source, timezone, publication terms, attribution requirements, and update method.
- Hide empty data sections instead of presenting prominent “unavailable” cards.
- Source and freshness details should be available without dominating the interface.

## Planned milestones

1. **Core UI:** series directory, filters, favourites, mobile layout, PWA shell.
2. **Verified schedule layer:** add confirmed event data and timezone-aware session listings; preserve season rollover and last-good data.
3. **Results and standings:** only for sources with verified fields and compatible reuse terms.
4. **Reminders:** assess calendar exports first; browser push only if a reliable free delivery mechanism is feasible.

## Run locally

This is a static prototype. Open `index.html` in a browser. For service-worker/PWA behavior, serve the directory over localhost or HTTPS.

## Hosting and costs

Designed to stay within a ₹0 budget. No paid API keys, analytics, or third-party runtime dependencies are included.

## Credits and trademarks

CHICANE is an unofficial fan companion. Championship names, logos, and trademarks belong to their respective owners. This prototype uses text labels and an original abstract circuit illustration rather than official championship logos.

## Status

Early prototype — not production-ready. Schedule integration and cross-device reminder delivery remain future work.
