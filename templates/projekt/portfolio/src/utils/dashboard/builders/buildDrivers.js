import {
  average,
  round,
} from "../helpers/dashboardHelpers";

export function buildDrivers(
  phases = []
) {
  const driverGroups = {};

  phases.forEach((phase) => {
    const driver =
      phase.driver;

    if (!driver) {
      return;
    }

    if (!driverGroups[driver]) {
      driverGroups[driver] = {
        driver,

        followerUplift: 0,
        reachUplift: 0,

        engagement: [],

        interactions: 0,

        profileVisits: 0,

        websiteClicks: 0,

        observations: 0,

        phaseCount: 0,

        latestFollowers: 0,

        latestReach: 0,
      };
    }

    const group =
      driverGroups[driver];

    group.followerUplift +=
      phase.followerUplift;

    group.reachUplift +=
      phase.reachUplift;

    group.engagement.push(
      phase.engagement
    );

    group.interactions +=
      phase.interactions;

    group.profileVisits +=
      phase.profileVisits;

    group.websiteClicks +=
      phase.websiteClicks;

    group.observations +=
      phase.observations;

    group.phaseCount += 1;

    group.latestFollowers =
      Math.max(
        group.latestFollowers,
        phase.followersAfter
      );

    group.latestReach =
      Math.max(
        group.latestReach,
        phase.reachAfter
      );
  });

  const totalFollowerUplift =
    Object.values(
      driverGroups
    ).reduce(
      (sum, group) =>
        sum +
        group.followerUplift,
      0
    );

  return Object.values(
    driverGroups
  )
    .map((group) => {
      const contribution =
        totalFollowerUplift > 0
          ? (group.followerUplift /
              totalFollowerUplift) *
            100
          : 0;

      return {
        driver:
          group.driver,

        value: round(
          contribution,
          1
        ),

        percentage: round(
          contribution,
          1
        ),

        followerUplift:
          group.followerUplift,

        reachUplift:
          group.reachUplift,

        followers:
          group.latestFollowers,

        reach:
          group.latestReach,

        engagement: round(
          average(
            group.engagement
          ),
          1
        ),

        interactions:
          group.interactions,

        profile_visits:
          group.profileVisits,

        website_clicks:
          group.websiteClicks,

        observations:
          group.observations,

        phaseCount:
          group.phaseCount,
      };
    })
    .sort(
      (a, b) =>
        b.percentage -
        a.percentage
    );
}