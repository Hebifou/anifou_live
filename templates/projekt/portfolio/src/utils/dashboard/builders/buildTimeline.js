export function buildTimeline(
  phases = []
) {
  return phases
    .filter(
      (phase) =>
        phase.event
    )
    .map((phase) => ({
      date:
        phase.startDate,

      endDate:
        phase.endDate,

      title:
        phase.event,

      type:
        phase.event,

      campaign:
        phase.campaign,

      driver:
        phase.driver,

      impact: Math.max(
        phase.followerUplift,
        1
      ),

      followerUplift:
        phase.followerUplift,

      reachUplift:
        phase.reachUplift,

      followersBefore:
        phase.followersBefore,

      followers:
        phase.followersAfter,

      reachBefore:
        phase.reachBefore,

      reach:
        phase.reachAfter,

      engagement:
        phase.engagement,

      interactions:
        phase.interactions,

      profile_visits:
        phase.profileVisits,

      website_clicks:
        phase.websiteClicks,

      description:
        phase.campaign ||
        phase.driver ||
        "",
    }))
    .sort(
      (a, b) =>
        new Date(a.date) -
        new Date(b.date)
    );
}