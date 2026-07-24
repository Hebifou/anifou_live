export function buildAudience(
  aggregateBy
) {
  return aggregateBy("age_group")
    .map((row) => ({
      group: "age",

      segment:
        row.label,

      value:
        row.count,

      count:
        row.count,

      percentage:
        row.percentage,

      followers:
        row.estimatedFollowers,

      reach:
        row.estimatedReach,

      engagement:
        row.engagement,

      likes:
        row.likes,

      comments:
        row.comments,

      shares:
        row.shares,

      saves:
        row.saves,

      profile_visits:
        row.profileVisits,

      website_clicks:
        row.websiteClicks,

      interactions:
        row.interactions,
    }))
    .sort(
      (a, b) =>
        b.percentage -
        a.percentage
    );
}