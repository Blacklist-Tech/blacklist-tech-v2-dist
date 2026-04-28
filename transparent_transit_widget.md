# 🚆 Transparent Transit Widget (Rust)

## Full Development Specification

------------------------------------------------------------------------

# 🧠 1. OVERVIEW

A Rust-native real-time transit intelligence system that powers a
transparent iOS widget.

## Core Idea

Convert a user's **street address or location** into: - nearest transit
station - real-time train arrivals - simplified Uptown / Downtown view -
Apple-level ambient widget experience

------------------------------------------------------------------------

# 🎯 2. PRODUCT GOAL

> A minimal, fast, visually invisible widget that shows only the trains
> that matter.

Core outputs: - Local time - Uptown trains - Downtown trains - Next
arrivals (ETA)

------------------------------------------------------------------------

# 🧱 3. SYSTEM ARCHITECTURE (RUST FIRST)

## Pipeline

Address → Geocode → Coordinates → Station Match → Transit Feeds → Filter
→ Rank → Widget JSON

------------------------------------------------------------------------

## Modules

-   geocoding/
-   stations/
-   realtime/
-   direction/
-   ranking/
-   cache/
-   api/
-   ui_shaping/

------------------------------------------------------------------------

# 📍 4. GEO RESOLUTION SYSTEM

## Input

"100 Hudson St, Hoboken, NJ"

## Output

lat/lon coordinates

## Providers

-   Mapbox
-   Google Maps
-   OpenStreetMap fallback

## Rules

-   normalize address
-   cache aggressively
-   fallback chain if failure

------------------------------------------------------------------------

## Flow

Address → Normalize → Cache → Provider Router → Response → Normalize →
Cache → Output

------------------------------------------------------------------------

# 🚉 5. TRANSIT DATA SOURCES

-   MTA
-   NJ Transit
-   PATH

Uses GTFS + GTFS-Realtime feeds

------------------------------------------------------------------------

# ⚙️ 6. REAL-TIME ENGINE

## Responsibilities

-   ingest feeds
-   normalize routes
-   compute ETAs
-   filter irrelevant trains

------------------------------------------------------------------------

# 🧭 7. DIRECTION SYSTEM

Normalize everything into:

-   Uptown
-   Downtown

------------------------------------------------------------------------

# 🧠 8. RELEVANCE ENGINE

## Scoring formula

score = ETA urgency + station proximity + reliability + direction match

## Rules

-   max 3 trains per direction
-   remove noisy predictions
-   ignore long ETA trains (\>20 min)

------------------------------------------------------------------------

# 🧊 9. CACHING STRATEGY

## Layers

### L1: Memory cache (10--30 sec)

### L2: Disk cache (1--5 min)

### L3: fallback last-known-good

------------------------------------------------------------------------

## Principle

> Never hit API if cached data is usable

------------------------------------------------------------------------

# 🚦 10. RATE LIMIT SYSTEM

## Strategy

-   centralized API client
-   token bucket limiter
-   per-provider quotas

## Providers

-   MTA (strict)
-   NJ Transit (moderate)
-   PATH (light polling)

------------------------------------------------------------------------

## Behavior

If limit hit: - use cache - extend refresh interval - degrade gracefully

------------------------------------------------------------------------

# 🔁 11. REQUEST OPTIMIZATION

-   deduplicate identical requests
-   batch station queries
-   reuse in-flight futures

------------------------------------------------------------------------

# ⚡ 12. REFRESH STRATEGY

Adaptive refresh:

-   near station → 15--30 sec
-   normal → 45--90 sec
-   idle → 2--5 min

------------------------------------------------------------------------

# 🧠 13. APPLE-LEVEL UI DESIGN

## Principles

-   invisible UI
-   frosted glass materials
-   SF-style typography
-   no borders
-   soft hierarchy

------------------------------------------------------------------------

## Layout

TIME

UPTOWN A • 2 min C • 5 min

DOWNTOWN A • 1 min E • 6 min

------------------------------------------------------------------------

## Motion rules

-   subtle fades
-   no decorative animation
-   state-driven transitions only

------------------------------------------------------------------------

# 🪟 14. UI SHAPING LAYER (RUST)

Rust transforms raw data into UI-ready structure:

-   blur intensity
-   contrast mode
-   display hierarchy
-   noise reduction

------------------------------------------------------------------------

# 📦 15. OUTPUT FORMAT

``` json
{
  "time": "16:42",
  "uptown": [...],
  "downtown": [...]
}
```

------------------------------------------------------------------------

# ⚡ 16. PERFORMANCE GOALS

-   \<150ms cached response
-   \<500ms live response
-   minimal memory footprint
-   zero blocking calls in widget path

------------------------------------------------------------------------

# 🧠 17. SYSTEM PHILOSOPHY

-   Rust owns all logic
-   APIs are passive data sources
-   UI is purely a renderer
-   system prioritizes relevance over completeness

------------------------------------------------------------------------

# 🔮 18. FUTURE EXPANSION

-   Live Activities integration
-   Dynamic Island updates
-   predictive commute engine
-   MCP integration layer
-   multi-city support

------------------------------------------------------------------------

# 🧩 19. FINAL SYSTEM FLOW

Address Input → Geocoding → Station Detection → Feed Fetch → Relevance
Engine → Caching Layer → Rate Limit Protection → UI Shaping → Widget
Output

------------------------------------------------------------------------

# 🚀 RESULT

A Rust-native transit intelligence engine that behaves like a
system-level Apple widget layer.
