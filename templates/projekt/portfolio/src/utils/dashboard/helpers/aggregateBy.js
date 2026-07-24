import {
  average,
  round,
} from "./dashboardHelpers";

export function aggregateBy(
  data = [],
  key,
  currentFollowers,
  currentReach
) {
  const groups = {};

  data.forEach((row) => {
    const label = row[key];

    if (!label) {
      return;
    }

    if (!groups[label]) {
      groups[label] = {
        label,

        count: 0,

        engagement: 0,

        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,

        profileVisits: 0,
        websiteClicks: 0,

        interactions: 0,
      };
    }

    const group =
      groups[label];

    group.count += 1;

    group.engagement +=
      row.engagement;

    group.likes +=
      row.likes;

    group.comments +=
      row.comments;

    group.shares +=
      row.shares;

    group.saves +=
      row.saves;

    group.profileVisits +=
      row.profile_visits;

    group.websiteClicks +=
      row.website_clicks;

    group.interactions +=
      row.interactions;
  });

  const groupedValues =
    Object.values(groups);

  const totalCount =
    groupedValues.reduce(
      (sum, group) =>
        sum + group.count,
      0
    );

  return groupedValues.map(
    (group) => {
      const percentage =
        totalCount > 0
          ? (group.count /
              totalCount) *
            100
          : 0;

      return {
        label:
          group.label,

        count:
          group.count,

        percentage: round(
          percentage,
          1
        ),

        estimatedFollowers:
          Math.round(
            currentFollowers *
              (percentage / 100)
          ),

        estimatedReach:
          Math.round(
            currentReach *
              (percentage / 100)
          ),

        engagement:
          average([
            group.engagement /
              group.count,
          ]),

        likes:
          group.likes,

        comments:
          group.comments,

        shares:
          group.shares,

        saves:
          group.saves,

        profileVisits:
          group.profileVisits,

        websiteClicks:
          group.websiteClicks,

        interactions:
          group.interactions,
      };
    }
  );
}