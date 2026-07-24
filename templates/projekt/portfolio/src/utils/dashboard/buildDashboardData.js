// src/utils/dashboard/buildDashboardData.js

import { buildKPIs } from "./analytics/buildKPIs";
import { buildInsightData } from "./analytics/buildInsightData";
import { buildInsights } from "./analytics/buildInsights";

import { buildAudience } from "./builders/buildAudience";
import { buildCampaignPhases } from "./builders/buildCampaignPhases";
import { buildDrivers } from "./builders/buildDrivers";
import { buildGrowth } from "./builders/buildGrowth";
import { buildLocations } from "./builders/buildLocations";
import { buildTimeline } from "./builders/buildTimeline";

import { aggregateBy } from "./helpers/aggregateBy";
import { normalizeDashboard } from "./helpers/normalizeDashboard";
import { number } from "./helpers/dashboardHelpers";

export function buildDashboardData(
  data = []
) {
  if (!data.length) {
    return {
      growth: [],
      audience: [],
      locations: [],
      timeline: [],
      drivers: [],
      insights: [],
      insightData: {},
      kpis: [],
    };
  }

  // --------------------------------------------------
  // Normalize Dataset
  // --------------------------------------------------

  const normalizedData =
    normalizeDashboard(data);

  // --------------------------------------------------
  // Growth
  // --------------------------------------------------

  const growth =
    buildGrowth(normalizedData);

  const firstAccountPoint =
    growth[0] || {};

  const latestAccountPoint =
    growth[growth.length - 1] || {};

  const currentFollowers =
    number(
      latestAccountPoint.followers
    );

  const currentReach =
    number(
      latestAccountPoint.reach
    );

  // --------------------------------------------------
  // Aggregation Helper
  // --------------------------------------------------

  const aggregate = (key) =>
    aggregateBy(
      normalizedData,
      key,
      currentFollowers,
      currentReach
    );

  // --------------------------------------------------
  // Audience
  // --------------------------------------------------

  const audience =
    buildAudience(
      aggregate
    );

  // --------------------------------------------------
  // Locations
  // --------------------------------------------------

  const locations =
    buildLocations(
      aggregate
    );

  // --------------------------------------------------
  // Campaign Phases
  // --------------------------------------------------

  const phases =
    buildCampaignPhases(
      normalizedData,
      growth
    );

  // --------------------------------------------------
  // Drivers
  // --------------------------------------------------

  const drivers =
    buildDrivers(
      phases
    );

  // --------------------------------------------------
  // Timeline
  // --------------------------------------------------

  const timeline =
    buildTimeline(
      phases
    );

  // --------------------------------------------------
  // Insights
  // --------------------------------------------------

  const insights =
    buildInsights({
      growth,
      audience,
      locations,
      drivers,
    });

  // --------------------------------------------------
  // Insight Data
  // --------------------------------------------------

  const insightData =
    buildInsightData({
      audience,
      locations,
      drivers,
      timeline,
      insights,
    });

  // --------------------------------------------------
  // KPIs
  // --------------------------------------------------

  const kpis =
    buildKPIs({
      growth,
      audience,
      locations,
    });

  // --------------------------------------------------
  // Return
  // --------------------------------------------------

  return {
    growth,
    audience,
    locations,
    timeline,
    drivers,

    insights,
    insightData,

    kpis,
  };
}