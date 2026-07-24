export const dashboardLayout = [
  {
    id: "growth",
    title: "Audience Growth",
    type: "line",
    csv: "follower_growth.csv",
    width: "wide",
  },

  {
    id: "insights",
    title: "Insights",
    type: "analyst",
    csv: "insights.csv",
    width: "side",
  },

  {
    id: "audience",
    title: "Audience",
    type: "bar",
    csv: "audience_demographics.csv",
  },

  {
    id: "geography",
    title: "Geography",
    type: "map",
    csv: "audience_locations.csv",
  },

  {
    id: "timeline",
    title: "Timeline",
    type: "timeline",
    csv: "timeline_events.csv",
  },

  {
    id: "drivers",
    title: "Drivers",
    type: "drivers",
    csv: "drivers.csv",
  },
];