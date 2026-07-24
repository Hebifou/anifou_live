// src/utils/dashboard/analytics/buildInsights.js

import {
  number,
  round,
} from "../helpers/dashboardHelpers";

import {
  formatNumber,
  formatPercentage,
} from "../formatters";


export function buildInsights({
  growth = [],
  audience = [],
  locations = [],
  drivers = [],
}) {
  const firstAccountPoint =
    growth[0] || {};

  const latestAccountPoint =
    growth[growth.length - 1] || {};


  const strongestDriver =
    drivers[0] || {};


  const primaryAudience =
    audience[0] || {};


  const strongestLocation =
    [...locations].sort(
      (a, b) =>
        number(b.engagement) -
        number(a.engagement)
    )[0] || {};


  const totalGrowth =
    number(
      latestAccountPoint.followers
    ) -
    number(
      firstAccountPoint.followers
    );


  const totalGrowthPercentage =
    number(
      firstAccountPoint.followers
    ) > 0
      ? round(
          (totalGrowth /
            number(
              firstAccountPoint.followers
            )) *
            100,
          1
        )
      : 0;


  return [
    {
      section: "summary",

      title: "Executive Summary",

      text:
        totalGrowth > 0
          ? `Community grew by ${formatNumber(
              totalGrowth
            )} followers (${formatPercentage(
              totalGrowthPercentage
            )}).`

          : "Community size remained stable during the analyzed period.",
    },


    {
      section: "finding",

      title: "Growth Driver",

      text:
        strongestDriver.driver

          ? `${strongestDriver.driver} generated the largest modeled contribution to follower growth at ${formatPercentage(
              strongestDriver.percentage
            )}.`

          : "No clear growth driver could be identified.",
    },


    {
      section: "finding",

      title: "Audience",

      text:
        primaryAudience.segment

          ? `${primaryAudience.segment} leads audience share with ${formatPercentage(
              primaryAudience.percentage
            )} and ${formatPercentage(
              primaryAudience.engagement
            )} engagement.`

          : "No primary audience segment could be identified.",
    },


    {
      section: "finding",

      title: "Geography",

      text:
        strongestLocation.city

          ? `${strongestLocation.city} recorded the highest average engagement rate at ${formatPercentage(
              strongestLocation.engagement
            )}.`

          : "No strongest geographic market could be identified.",
    },


    {
      section: "recommendation",

      title: "Recommendation",

      text:
        strongestDriver.driver &&
        primaryAudience.segment

          ? `Prioritize ${strongestDriver.driver.toLowerCase()} activity for ${primaryAudience.segment} audiences and measure campaign impact.`

          : "Align future campaign activity with the strongest observed content, audience and geographic signals.",
    },
  ];
}