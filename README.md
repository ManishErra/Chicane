# CHICANE Motorsport Hub

**A minimal, mobile-first motorsport calendar.** Black-first interface, bold typography, no account, and a ₹0 target.

## Current preview milestone

- Responsive dashboard with series search, filters, and browser-local favourites
- Upcoming race board with search and series filtering
- Date-only race weekends linked to official series calendars
- Real `.ics` export of the curated upcoming event list (all-day events; no guessed session times)
- India Standard Time clock/date
- Installable-app foundation and versioned shell cache where supported

## Current schedule coverage

The preview contains manually curated dates verified against official public calendars as of **17 October 2026** for:
- Formula 1
- NASCAR Cup Series
- MotoGP
- FIA World Endurance Championship (WEC)
- World Rally Championship (WRC)
- Formula E
- Dakar Rally
- GT World Challenge

Dates are weekend/event ranges, not session start times. Each event links to the source calendar. Race dates can change; verify details on the linked official source before travel or viewing. This is a curated static snapshot, not yet an automatically refreshed live feed. The event list will roll forward only when the dataset is updated.

## Data integrity

- Never invent schedules, results, standings, or session times.
- Hide unsupported data rather than showing empty placeholders.
- GT3 is a class, not a standalone championship. Le Mans 24 Hours is part of WEC; Dakar is rally raid.
- Keep source links visible and dates-only where exact session times are not verified.
- Before adding more data sources, check reuse terms, attribution, timezone and update method.
- Results, standings, full historical seasons, and reminders are not part of this milestone yet.

## Sources used for the current date snapshot

- [Formula 1 2026 calendar](https://www.formula1.com/en/racing/2026)
- [NASCAR Cup Series 2026 schedule](https://www.nascar.com/nascar-cup-series/2026/schedule/)
- [MotoGP 2026 calendar](https://www.motogp.com/en/calendar)
- [FIA WEC official calendar](https://www.fiawec.com/en/page/homepage-world-endurance-championship)
- [WRC 2026 calendar](https://www.wrc.com/en/news/2026-fia-world-rally-championship-calendar)
- [Formula E calendar](https://www.fiaformulae.com/en/calendar)
- [Dakar official website](https://www.dakar.com/en/)
- [GT World Challenge calendar](https://www.gt-world-challenge.com/calendar)

## Run locally

Open `index.html` for the core interface. For service-worker/PWA behavior, serve the folder on localhost or HTTPS.

## Hosting and costs

Designed to stay within ₹0. No paid APIs, analytics, or third-party runtime dependencies are included.

## Credits and trademarks

CHICANE is an unofficial fan companion. Series names and trademarks belong to their respective owners. This prototype uses text labels and an original abstract circuit illustration rather than official championship logos.

## Status

**Preview milestone:** curated upcoming race board and calendar export. Not production-ready. Automatic schedule refresh, verified session times, five-season historical data, results/standings and reminder delivery remain future work.
