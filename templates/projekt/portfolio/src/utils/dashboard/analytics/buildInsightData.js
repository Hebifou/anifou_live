// src/utils/dashboard/analytics/buildInsightData.js

import {
  formatNumber,
  formatPercentage,
} from "../formatters";


export function buildInsightData({
  audience = [],
  locations = [],
  drivers = [],
  timeline = [],
  insights = [],
}) {
  return {
    // --------------------------------------------------
    // Dashboard Overview
    // --------------------------------------------------

    overview: {
      context: "Interaction",

      selection: "Overview",

      summary: insights
        .filter(
          (item) =>
            item.section === "summary"
        )
        .map((item) => ({
          text: item.text,
        })),

      metrics: insights
        .filter(
          (item) =>
            item.section === "finding"
        )
        .map((item) => ({
          text: item.text,
        })),

      relationships: insights
        .filter(
          (item) =>
            item.section === "recommendation"
        )
        .map((item) => ({
          text: item.text,
        })),
    },


    // --------------------------------------------------
    // Audience
    // --------------------------------------------------

    audience: Object.fromEntries(
      audience.map((row) => [
        row.segment,

        {
          context: "Interaction",

          selection:
            row.segment,

          summary: [
            {
              text:
                `${row.segment} represents ${formatPercentage(
                  row.percentage
                )} of the audience.`,
            },
          ],

          metrics: [
            {
              text:
                `Followers • ${formatNumber(
                  row.followers
                )}`,
            },

            {
              text:
                `Reach • ${formatNumber(
                  row.reach
                )}`,
            },

            {
              text:
                `Engagement • ${formatPercentage(
                  row.engagement
                )}`,
            },
          ],

          relationships: [
            {
              text:
                "Compare audience behavior across segments.",
            },
          ],
        },
      ])
    ),


    // --------------------------------------------------
    // Locations
    // --------------------------------------------------

    locations: Object.fromEntries(
      locations.map((row) => [
        row.city,

        {
          context: "Interaction",

          selection:
            row.city,

          summary: [
            {
              text:
                `${row.city} represents ${formatPercentage(
                  row.percentage
                )} of the audience.`,
            },
          ],

          metrics: [
            {
              text:
                `Followers • ${formatNumber(
                  row.followers
                )}`,
            },

            {
              text:
                `Reach • ${formatNumber(
                  row.reach
                )}`,
            },

            {
              text:
                `Engagement • ${formatPercentage(
                  row.engagement
                )}`,
            },
          ],

          relationships: [
            {
              text:
                "Compare performance across geographic markets.",
            },
          ],
        },
      ])
    ),


    // --------------------------------------------------
    // Drivers
    // --------------------------------------------------

    drivers: Object.fromEntries(
      drivers.map((row) => [
        row.driver,

        {
          context: "Interaction",

          selection:
            row.driver,

          summary: [
            {
              text:
                `${row.driver} contributed ${formatPercentage(
                  row.percentage
                )} of follower growth.`,
            },
          ],

          metrics: [
            {
              text:
                `Follower Uplift • ${formatNumber(
                  row.followerUplift
                )}`,
            },

            {
              text:
                `Reach • ${formatNumber(
                  row.reach
                )}`,
            },

            {
              text:
                `Engagement • ${formatPercentage(
                  row.engagement
                )}`,
            },
          ],

          relationships: [
            {
              text:
                "Measure driver impact through campaign performance.",
            },
          ],
        },
      ])
    ),


    // --------------------------------------------------
    // Timeline
    // --------------------------------------------------

    events: Object.fromEntries(
      timeline.map((row) => [
        row.title,

        {
          context: "Interaction",

          selection:
            row.title,

          summary: [
            {
              text:
                `${row.title} generated measurable audience growth.`,
            },
          ],

          metrics: [
            {
              text:
                `Follower Uplift • ${formatNumber(
                  row.followerUplift
                )}`,
            },

            {
              text:
                `Reach Uplift • ${formatNumber(
                  row.reachUplift
                )}`,
            },

            {
              text:
                `Engagement • ${formatPercentage(
                  row.engagement
                )}`,
            },
          ],

          relationships: [
            {
              text:
                row.description ||
                "Compare campaign milestones and audience response.",
            },
          ],
        },
      ])
    ),
  };
}