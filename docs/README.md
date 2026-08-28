# Insights

## Overview

```vega
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "width": 800,
  "height": 300,
  "title": "Top 10 Repositories by Visitors",
  "data": {
    "values": [
      {"repository": "priordate", "views": 158}
    ]
  },
  "mark": "bar",
  "encoding": {
    "y": {"field": "repository", "type": "nominal", "title": "Repository", "sort": "-x"},
    "x": {"field": "views", "type": "quantitative", "title": "Total Views"}
  }
}
```


```vega
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "width": 800,
  "height": 300,
  "title": "Top 10 Repositories by Git Clones",
  "data": {
    "values": [
      {"repository": "priordate", "clones": 292}
    ]
  },
  "mark": "bar",
  "encoding": {
    "y": {"field": "repository", "type": "nominal", "title": "Repository", "sort": "-x"},
    "x": {"field": "clones", "type": "quantitative", "title": "Total Clones"}
  }
}
```

## Repository Breakdown

### mponagandla/priordate

```vega
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "width": 800,
  "title": "Visitors for mponagandla/priordate",
  "data": {
    "values": [
      {"date": "2026-07-29", "type": "Total Views", "value": 0},
      {"date": "2026-07-30", "type": "Total Views", "value": 0},
      {"date": "2026-07-31", "type": "Total Views", "value": 0},
      {"date": "2026-08-01", "type": "Total Views", "value": 0},
      {"date": "2026-08-02", "type": "Total Views", "value": 0},
      {"date": "2026-08-03", "type": "Total Views", "value": 0},
      {"date": "2026-08-04", "type": "Total Views", "value": 0},
      {"date": "2026-08-05", "type": "Total Views", "value": 0},
      {"date": "2026-08-06", "type": "Total Views", "value": 0},
      {"date": "2026-08-07", "type": "Total Views", "value": 0},
      {"date": "2026-08-08", "type": "Total Views", "value": 0},
      {"date": "2026-08-09", "type": "Total Views", "value": 0},
      {"date": "2026-08-10", "type": "Total Views", "value": 67},
      {"date": "2026-08-11", "type": "Total Views", "value": 19},
      {"date": "2026-08-12", "type": "Total Views", "value": 3},
      {"date": "2026-08-13", "type": "Total Views", "value": 27},
      {"date": "2026-08-14", "type": "Total Views", "value": 0},
      {"date": "2026-08-15", "type": "Total Views", "value": 0},
      {"date": "2026-08-16", "type": "Total Views", "value": 0},
      {"date": "2026-08-17", "type": "Total Views", "value": 24},
      {"date": "2026-08-18", "type": "Total Views", "value": 2},
      {"date": "2026-08-19", "type": "Total Views", "value": 0},
      {"date": "2026-08-20", "type": "Total Views", "value": 11},
      {"date": "2026-08-21", "type": "Total Views", "value": 0},
      {"date": "2026-08-22", "type": "Total Views", "value": 5},
      {"date": "2026-08-23", "type": "Total Views", "value": 0},
      {"date": "2026-08-24", "type": "Total Views", "value": 0},
      {"date": "2026-08-25", "type": "Total Views", "value": 0},
      {"date": "2026-08-26", "type": "Total Views", "value": 0},
      {"date": "2026-08-27", "type": "Total Views", "value": 0},
      {"date": "2026-07-29", "type": "Unique Views", "value": 0},
      {"date": "2026-07-30", "type": "Unique Views", "value": 0},
      {"date": "2026-07-31", "type": "Unique Views", "value": 0},
      {"date": "2026-08-01", "type": "Unique Views", "value": 0},
      {"date": "2026-08-02", "type": "Unique Views", "value": 0},
      {"date": "2026-08-03", "type": "Unique Views", "value": 0},
      {"date": "2026-08-04", "type": "Unique Views", "value": 0},
      {"date": "2026-08-05", "type": "Unique Views", "value": 0},
      {"date": "2026-08-06", "type": "Unique Views", "value": 0},
      {"date": "2026-08-07", "type": "Unique Views", "value": 0},
      {"date": "2026-08-08", "type": "Unique Views", "value": 0},
      {"date": "2026-08-09", "type": "Unique Views", "value": 0},
      {"date": "2026-08-10", "type": "Unique Views", "value": 1},
      {"date": "2026-08-11", "type": "Unique Views", "value": 1},
      {"date": "2026-08-12", "type": "Unique Views", "value": 1},
      {"date": "2026-08-13", "type": "Unique Views", "value": 1},
      {"date": "2026-08-14", "type": "Unique Views", "value": 0},
      {"date": "2026-08-15", "type": "Unique Views", "value": 0},
      {"date": "2026-08-16", "type": "Unique Views", "value": 0},
      {"date": "2026-08-17", "type": "Unique Views", "value": 1},
      {"date": "2026-08-18", "type": "Unique Views", "value": 1},
      {"date": "2026-08-19", "type": "Unique Views", "value": 0},
      {"date": "2026-08-20", "type": "Unique Views", "value": 1},
      {"date": "2026-08-21", "type": "Unique Views", "value": 0},
      {"date": "2026-08-22", "type": "Unique Views", "value": 1},
      {"date": "2026-08-23", "type": "Unique Views", "value": 0},
      {"date": "2026-08-24", "type": "Unique Views", "value": 0},
      {"date": "2026-08-25", "type": "Unique Views", "value": 0},
      {"date": "2026-08-26", "type": "Unique Views", "value": 0},
      {"date": "2026-08-27", "type": "Unique Views", "value": 0}
    ]
  },
  "mark": "line",
  "encoding": {
    "x": {
      "field": "date",
      "type": "temporal",
      "title": "Date",
      "scale": { "type": "utc" },
      "axis": {
        "format": "%Y-%m-%d",
        "labelAngle": -45,
        "labelOverlap": false,
        "tickCount": {"interval": "day", "step": 1}
      }
    },
    "y": {"field": "value", "type": "quantitative", "title": "Views"},
    "color": {
      "field": "type",
      "type": "nominal",
      "legend": {
        "title": null
      }
    },
    "tooltip": [
      { "field": "date", "type": "temporal", "title": "Date" },
      { "field": "type", "type": "nominal", "title": "Metric" },
      { "field": "value", "type": "quantitative", "title": "Value" }
    ]
  }
}
```


```vega
{
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "width": 800,
  "title": "Git Clones for mponagandla/priordate",
  "data": {
    "values": [
      {"date": "2026-07-29", "type": "Total Clones", "value": 0},
      {"date": "2026-07-30", "type": "Total Clones", "value": 0},
      {"date": "2026-07-31", "type": "Total Clones", "value": 0},
      {"date": "2026-08-01", "type": "Total Clones", "value": 0},
      {"date": "2026-08-02", "type": "Total Clones", "value": 0},
      {"date": "2026-08-03", "type": "Total Clones", "value": 0},
      {"date": "2026-08-04", "type": "Total Clones", "value": 0},
      {"date": "2026-08-05", "type": "Total Clones", "value": 0},
      {"date": "2026-08-06", "type": "Total Clones", "value": 0},
      {"date": "2026-08-07", "type": "Total Clones", "value": 0},
      {"date": "2026-08-08", "type": "Total Clones", "value": 0},
      {"date": "2026-08-09", "type": "Total Clones", "value": 0},
      {"date": "2026-08-10", "type": "Total Clones", "value": 67},
      {"date": "2026-08-11", "type": "Total Clones", "value": 129},
      {"date": "2026-08-12", "type": "Total Clones", "value": 4},
      {"date": "2026-08-13", "type": "Total Clones", "value": 10},
      {"date": "2026-08-14", "type": "Total Clones", "value": 13},
      {"date": "2026-08-15", "type": "Total Clones", "value": 4},
      {"date": "2026-08-16", "type": "Total Clones", "value": 5},
      {"date": "2026-08-17", "type": "Total Clones", "value": 11},
      {"date": "2026-08-18", "type": "Total Clones", "value": 2},
      {"date": "2026-08-19", "type": "Total Clones", "value": 4},
      {"date": "2026-08-20", "type": "Total Clones", "value": 3},
      {"date": "2026-08-21", "type": "Total Clones", "value": 5},
      {"date": "2026-08-22", "type": "Total Clones", "value": 6},
      {"date": "2026-08-23", "type": "Total Clones", "value": 7},
      {"date": "2026-08-24", "type": "Total Clones", "value": 5},
      {"date": "2026-08-25", "type": "Total Clones", "value": 7},
      {"date": "2026-08-26", "type": "Total Clones", "value": 6},
      {"date": "2026-08-27", "type": "Total Clones", "value": 4},
      {"date": "2026-07-29", "type": "Unique Clones", "value": 0},
      {"date": "2026-07-30", "type": "Unique Clones", "value": 0},
      {"date": "2026-07-31", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-01", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-02", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-03", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-04", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-05", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-06", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-07", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-08", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-09", "type": "Unique Clones", "value": 0},
      {"date": "2026-08-10", "type": "Unique Clones", "value": 22},
      {"date": "2026-08-11", "type": "Unique Clones", "value": 45},
      {"date": "2026-08-12", "type": "Unique Clones", "value": 4},
      {"date": "2026-08-13", "type": "Unique Clones", "value": 4},
      {"date": "2026-08-14", "type": "Unique Clones", "value": 7},
      {"date": "2026-08-15", "type": "Unique Clones", "value": 2},
      {"date": "2026-08-16", "type": "Unique Clones", "value": 3},
      {"date": "2026-08-17", "type": "Unique Clones", "value": 5},
      {"date": "2026-08-18", "type": "Unique Clones", "value": 1},
      {"date": "2026-08-19", "type": "Unique Clones", "value": 2},
      {"date": "2026-08-20", "type": "Unique Clones", "value": 2},
      {"date": "2026-08-21", "type": "Unique Clones", "value": 3},
      {"date": "2026-08-22", "type": "Unique Clones", "value": 4},
      {"date": "2026-08-23", "type": "Unique Clones", "value": 5},
      {"date": "2026-08-24", "type": "Unique Clones", "value": 3},
      {"date": "2026-08-25", "type": "Unique Clones", "value": 5},
      {"date": "2026-08-26", "type": "Unique Clones", "value": 4},
      {"date": "2026-08-27", "type": "Unique Clones", "value": 2}
    ]
  },
  "mark": "line",
  "encoding": {
    "x": {
      "field": "date",
      "type": "temporal",
      "title": "Date",
      "scale": { "type": "utc" },
      "axis": {
        "format": "%Y-%m-%d",
        "labelAngle": -45,
        "labelOverlap": false,
        "tickCount": {"interval": "day", "step": 1}
      }
    },
    "y": {"field": "value", "type": "quantitative", "title": "Clones"},
    "color": {
      "field": "type",
      "type": "nominal",
      "legend": {
        "title": null
      }
    },
    "tooltip": [
      { "field": "date", "type": "temporal", "title": "Date" },
      { "field": "type", "type": "nominal", "title": "Metric" },
      { "field": "value", "type": "quantitative", "title": "Value" }
    ]
  }
}
```

| Referral Source | Views | Unique Visitors |
|-|-|-|
| github.com | 20 | 1 |

