import {
  average,
  round,
} from "../helpers/dashboardHelpers";

export function buildGrowth(
  normalizedData = []
) {
  const dateGroups = {};

  normalizedData.forEach((row) => {
    if (!dateGroups[row.date]) {
      dateGroups[row.date] = [];
    }

    dateGroups[row.date].push(row);
  });

  const growth = Object.entries(
    dateGroups
  )
    .map(([date, rows]) => {
      const referenceRow =
        [...rows].sort((a, b) => {
          const followerDifference =
            b.followers -
            a.followers;

          if (
            followerDifference !== 0
          ) {
            return followerDifference;
          }

          return (
            b.reach - a.reach
          );
        })[0];

      return {
        date,

        platform:
          referenceRow?.platform ||
          "",

        campaign:
          referenceRow?.campaign ||
          "",

        event:
          referenceRow?.event ||
          "",

        driver:
          referenceRow?.driver ||
          "",

        followers: Math.max(
          ...rows.map(
            (row) => row.followers
          )
        ),

        reach: Math.max(
          ...rows.map(
            (row) => row.reach
          )
        ),

        engagement: round(
          average(
            rows.map(
              (row) =>
                row.engagement
            )
          ),
          1
        ),

        likes: rows.reduce(
          (sum, row) =>
            sum + row.likes,
          0
        ),

        comments: rows.reduce(
          (sum, row) =>
            sum +
            row.comments,
          0
        ),

        shares: rows.reduce(
          (sum, row) =>
            sum + row.shares,
          0
        ),

        saves: rows.reduce(
          (sum, row) =>
            sum + row.saves,
          0
        ),

        profile_visits:
          rows.reduce(
            (sum, row) =>
              sum +
              row.profile_visits,
            0
          ),

        website_clicks:
          rows.reduce(
            (sum, row) =>
              sum +
              row.website_clicks,
            0
          ),

        interactions:
          rows.reduce(
            (sum, row) =>
              sum +
              row.interactions,
            0
          ),
      };
    })
    .sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );

  return growth;
}