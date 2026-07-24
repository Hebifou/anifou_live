import { cityCoordinates } from "../cityCoordinates";

export function buildLocations(
  aggregateBy
) {
  return aggregateBy("city")
    .map((row) => ({
      group: "city",

      city:
        row.label,

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

      latitude:
        cityCoordinates[
          row.label
        ]?.latitude,

      longitude:
        cityCoordinates[
          row.label
        ]?.longitude,
    }))
    .filter(
      (row) =>
        row.latitude != null &&
        row.longitude != null
    )
    .sort(
      (a, b) =>
        b.percentage -
        a.percentage
    );
}