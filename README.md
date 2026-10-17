# CHICANE Motorsport Hub

**A mobile-first motorsport hub.** Monochrome black-and-white card UI, bold typography, no account, and a ₹0 target.

## Current preview milestone

- Reference-matched dashboard with two image-led hero cards, rounded race cards, circuit-outline silhouettes, and bottom navigation on mobile
- Championship chips filter the upcoming-event board; categories with no confirmed upcoming date show a clear empty state and official calendar link
- Series directory with search, category filters, and browser-local favourites
- Race cards with date badges, IST-aware countdown labels, venue, and official-source links
- `.ics` export for listed upcoming events (all-day events; no guessed session times)
- India Standard Time clock
- Installable-app foundation and versioned shell cache where supported

## Current schedule coverage

The preview includes manually curated upcoming dates confirmed against official public calendars checked on **18 October 2026** for:
- Formula 1
- NASCAR Cup Series
- MotoGP
- Formula E (2026/27)
- Dakar Rally 2027
- GT World Challenge regional calendars

WEC, WRC and IndyCar remain available as championship filters and official links, but no unconfirmed upcoming dates are displayed for them in this snapshot. The 2026 WRC Saudi Arabia round was removed after the championship announced it would not count toward the WRC season. Speculative 2027 WEC dates were removed rather than presented as confirmed.

Dates are event ranges, not session start times. Each listed event links to an official source. Calendars can change; verify details on the linked official source before travel or viewing. This is a curated static snapshot, not an automatically refreshed live feed.

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
- [MotoGP 2026 calendar](https://www.motogp.com/en/calendar)
- [Formula E 2026/27 calendar announcement](https://www.fiaformulae.com/en/news/races/the-202627-formula-e-calendar-is-here)
- [Dakar 2027 route and dates](https://www.dakar.com/en/news//2027-route-the-art-of-illusion/208293)
- [GT World Challenge 2026 calendar](https://www.gt-world-challenge.com/calendar)
- [WRC 2026 calendar update / cancellation notice](https://www.wrc.com/en/news/fia-and-wrc-promoter-confirm-final-round-of-the-2026-wrc-season)

## Run locally

Open `index.html` for the core interface. For service-worker/PWA behavior, serve the folder on localhost or HTTPS.

## Hosting and costs

Designed to stay within ₹0. No paid APIs, analytics, or third-party runtime dependencies are included.

## Credits and trademarks

CHICANE is an unofficial fan companion. Series names and trademarks belong to their respective owners. This prototype uses text labels and an original abstract circuit illustration rather than official championship logos.

## Status

**Preview milestone:** image-led dashboard, functioning championship filters, curated event board and calendar export. Not production-ready. Automatic schedule refresh, verified session times, five-season historical data, integrated live results/standings and reminder delivery remain future work. Results and standings cards currently link to official pages rather than inventing values.
