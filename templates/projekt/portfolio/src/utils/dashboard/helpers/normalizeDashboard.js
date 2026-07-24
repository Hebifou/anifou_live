import {
  number,
  sumInteractions,
} from "./dashboardHelpers";

export function normalizeDashboard(
  data = []
) {
  return data
    .map((row) => ({
      ...row,

      followers: number(
        row.followers
      ),

      reach: number(
        row.reach
      ),

      engagement: number(
        row.engagement
      ),

      likes: number(
        row.likes
      ),

      comments: number(
        row.comments
      ),

      shares: number(
        row.shares
      ),

      saves: number(
        row.saves
      ),

      profile_visits: number(
        row.profile_visits
      ),

      website_clicks: number(
        row.website_clicks
      ),

      interactions:
        sumInteractions(row),
    }))
    .filter(
      (row) => row.date
    )
    .sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );
}