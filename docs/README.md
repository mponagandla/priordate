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
      {"repository": "priordate", "views": 116}
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
      {"repository": "priordate", "clones": 223}
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
      {"date": "2026-08-14", "type": "Unique Views", "value": 0}
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
      {"date": "2026-08-14", "type": "Unique Clones", "value": 7}
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
| github.com | 17 | 1 |

