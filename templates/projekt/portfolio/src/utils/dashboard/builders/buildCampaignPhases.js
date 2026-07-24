import {
  average,
  number,
  round,
  sortByDate,
} from "../helpers/dashboardHelpers";

export function buildCampaignPhases(
  normalizedData = [],
  growth = []
) {
  const phaseGroups = {};

  normalizedData.forEach((row) => {
    if (
      !row.event &&
      !row.driver
    ) {
      return;
    }

    const key = [
      row.campaign ||
        "No campaign",
      row.event ||
        "No event",
      row.driver ||
        "No driver",
    ].join("::");

    if (!phaseGroups[key]) {
      phaseGroups[key] = {
        key,

        campaign:
          row.campaign || "",

        event:
          row.event || "",

        driver:
          row.driver || "",

        rows: [],
      };
    }

    phaseGroups[key].rows.push(
      row
    );
  });

  return Object.values(
    phaseGroups
  )
    .map((phase) => {
      const phaseRows =
        sortByDate(phase.rows);

      const startDate =
        phaseRows[0]?.date || "";

      const endDate =
        phaseRows[
          phaseRows.length - 1
        ]?.date || startDate;

      const previousPoint =
        [...growth]
          .reverse()
          .find(
            (row) =>
              new Date(
                row.date
              ) <
              new Date(
                startDate
              )
          ) || null;

      const followersBefore =
        previousPoint
          ? number(
              previousPoint.followers
            )
          : number(
              phaseRows[0]
                ?.followers
            );

      const reachBefore =
        previousPoint
          ? number(
              previousPoint.reach
            )
          : number(
              phaseRows[0]
                ?.reach
            );

      const followersAfter =
        Math.max(
          ...phaseRows.map(
            (row) =>
              number(
                row.followers
              )
          )
        );

      const reachAfter =
        Math.max(
          ...phaseRows.map(
            (row) =>
              number(
                row.reach
              )
          )
        );

      return {
        key:
          phase.key,

        campaign:
          phase.campaign,

        event:
          phase.event,

        driver:
          phase.driver,

        startDate,
        endDate,

        followersBefore,
        followersAfter,

        reachBefore,
        reachAfter,

        followerUplift:
          Math.max(
            followersAfter -
              followersBefore,
            0
          ),

        reachUplift:
          Math.max(
            reachAfter -
              reachBefore,
            0
          ),

        engagement:
          round(
            average(
              phaseRows.map(
                (row) =>
                  row.engagement
              )
            ),
            1
          ),

        interactions:
          phaseRows.reduce(
            (
              sum,
              row
            ) =>
              sum +
              row.interactions,
            0
          ),

        profileVisits:
          phaseRows.reduce(
            (
              sum,
              row
            ) =>
              sum +
              row.profile_visits,
            0
          ),

        websiteClicks:
          phaseRows.reduce(
            (
              sum,
              row
            ) =>
              sum +
              row.website_clicks,
            0
          ),

        observations:
          phaseRows.length,
      };
    })
    .sort(
      (a, b) =>
        new Date(
          a.startDate
        ) -
        new Date(
          b.startDate
        )
    );
}