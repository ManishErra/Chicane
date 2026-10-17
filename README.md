# CHICANE Motorsport Hub

**A mobile-first motorsport hub.** Monochrome black-and-white card UI, bold typography, no account, and a ₹0 target.

## Current preview milestone

- Reference-matched dashboard with two image-led hero cards, rounded race cards, circuit-outline silhouettes, and bottom navigation on mobile
- Reference-matched championship selector buttons with recognisable series marks, clear selected states, and synchronised event filtering
- Fixed mobile bottom navigation for Home, Calendar, Results and Standings with active states
- Championship chips filter the upcoming-event board; categories with no confirmed upcoming date show a clear empty state and official calendar link
- Image-led series directory with motorsport photography, brand identifiers, search, category filters, and browser-local favourites
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

## Latest visual refinement (October 2026)

- Added the current MotoGP wordmark from Wikimedia Commons and the IndyCar Series wordmark to championship chips and the image-led series cards. These are used as brand identifiers; their marks remain the property of their respective owners. Sources: [MotoGP logo (2024)](https://commons.wikimedia.org/wiki/File:MotoGP_logo_(2024).svg) and [IndyCar Series text logo](https://commons.wikimedia.org/wiki/File:IndyCar_Series_textlogo.svg).
- Reworked the Dakar mark into a more intentional orange wordmark treatment rather than the previous generic “D” icon. The official Dakar cheich/logo is trademark-protected and the organiser restricts use; use an official asset only with the required authorisation. See [Dakar communication tools and logo terms](https://competitors.dakar.com/en/communication/communication-tools).
- Kept the approved black UI, full-colour race photos, event card layout and circuit silhouettes unchanged.
- The current preview has passed JavaScript syntax and duplicate-ID checks. Remote SVG loading still depends on the source host and should be visually confirmed on the target phone.

## Next features / backlog

The current UX/UI direction is approved and should be preserved. Do not redesign the layout while implementing these follow-up items.

### 1. Event-matched motorsport imagery (requested)

- Replace the current generic/reused stock photos with imagery that actually matches the event and series shown on each card.
- Follow the supplied CHICANE reference: realistic race photography, the right category of vehicle, recognisable event/venue context, dark monochrome treatment where appropriate, and consistent crops that work on mobile.
- Give each upcoming-event card a relevant image rather than reusing one image across F1, GT3, WEC, NASCAR, rally raid and MotoGP.
- Keep the hand-drawn circuit-outline element as a separate visual; use the correct circuit outline only when it can be verified.
- Add graceful fallbacks for events without a suitable image; never show a misleading venue, car class or race.
- Use only images with clear permission for reuse (for example, appropriately licensed/open-licensed photography or original generated artwork). Do not copy official series photos, logos or circuit artwork without permission. Formula 1's published IP guidelines specifically identify still images and circuit IP as protected material. See [Formula 1 IP guidelines](https://www.formula1.com/en/information/guidelines.4EOKE9RRqevL4niTK9kWyt) and the [NASCAR brand portal](https://brand.nascar.com/).
- Keep the existing card layout, typography, spacing, navigation and black-and-white visual style unchanged unless a separate UI change is requested.

### 2. Reference-matched buttons and controls (implemented in preview)

- Implemented: monochrome pill-shaped championship buttons with circular original marks, clear selected/unselected states, and horizontally scrollable mobile controls.
- Implemented: button sizing, spacing, typography, borders and black/white selected state tuned toward the supplied reference.
- Implemented: mobile bottom navigation for Home, Calendar, Results and Standings with active-state synchronisation and safe-area spacing.
- Implemented: selecting a championship updates the selected button and event list together; accessible `aria-pressed` state follows the selection.
- Used restrained original lettermarks instead of copying protected series logos. The final design can use licensed assets if needed.
- Preserve the approved layout; this is a targeted visual-fidelity pass, not a redesign. Remaining visual work: event-matched imagery.

### 3. Schedule and data improvements

- Automatically refresh schedules from sources whose reuse terms permit it, and surface the source and last-updated date.
- Add verified session times converted to IST only when an authoritative source publishes them.
- Add historical results and championship standings (target: five seasons) where a permitted source exists.
- Add reminders using calendar export first, then optional free browser notifications.
- Continue to hide unverified dates/results/standings rather than filling gaps with guesses.

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

## Image credits

The current preview uses representative motorsport-series photography from Wikimedia Commons. These images are **series-relevant examples, not verified photographs of each listed event or venue**. They are displayed in grayscale and must not be interpreted as event-specific imagery.

- Formula racing: [2022 Formula One car at the 2021 British Grand Prix](https://commons.wikimedia.org/wiki/File:2022_Formula_One_car_at_the_2021_British_Grand_Prix_(51350002179).jpg) — Jen Ross, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- GT racing: [GT3 and GT4 race one](https://commons.wikimedia.org/wiki/File:GT3_and_GT4_race_one_-_McLaren_leading_a_Lamborghini_and_an_Aston_Martin_(51372326297).jpg) — 35mmMan, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- NASCAR: [NASCAR Cup Series at Daytona Speedweeks](https://commons.wikimedia.org/wiki/File:Nascar_cup_series_(49562235351).jpg) — Zach Catanzareti Photo, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- Rally: [Škoda rally car](https://commons.wikimedia.org/wiki/File:Skoda_Fabia_rally_car.jpg) — Collard, [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- MotoGP: [MotoGP final race](https://commons.wikimedia.org/wiki/File:MotoGP_final_race.jpg) — Robert Scoble, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- Endurance racing: [2021 FIA WEC 8 Hours of Bahrain](https://commons.wikimedia.org/wiki/File:2021_FIA_WEC_8_Hours_of_Bahrain_Alpine_A480_Alpine_Elf_Matmut.jpg) — Kobokem2021, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Formula E: [Nio Formula E car](https://commons.wikimedia.org/wiki/File:Nio_Formula_E_car.jpg) — Rivera0997, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Image crops and grayscale treatment are modifications. The event-specific photo pass remains open work: use a verified venue/event image where available, retain license/author credits, and use a non-misleading fallback otherwise.

## Run locally

Open `index.html` for the core interface. For service-worker/PWA behavior, serve the folder on localhost or HTTPS.

## Hosting and costs

Designed to stay within ₹0. No paid APIs, analytics, or third-party runtime dependencies are included.

## Credits and trademarks

CHICANE is an unofficial fan companion. Series names and trademarks belong to their respective owners. This prototype uses text labels and an original abstract circuit illustration rather than official championship logos.

## Status

**Preview milestone:** image-led dashboard, functioning championship filters, curated event board and calendar export. Not production-ready. Automatic schedule refresh, verified session times, five-season historical data, integrated live results/standings, reminder delivery, and event-matched/licensed imagery remains future work; screenshot-matched championship controls and mobile navigation are implemented in the latest preview. Results and standings cards currently link to official pages rather than inventing values.
