import { number } from "../helpers/dashboardHelpers";

export function buildKPIs({
  growth = [],
  audience = [],
  locations = [],
}) {
  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  function calculateRelativeChange(
    current,
    previous
  ) {
    const currentValue =
      number(current);

    const previousValue =
      number(previous);

    if (previousValue === 0) {
      return 0;
    }

    return Number(
      (
        ((currentValue -
          previousValue) /
          previousValue) *
        100
      ).toFixed(1)
    );
  }

  function calculatePercentagePointChange(
    current,
    previous
  ) {
    return Number(
      (
        number(current) -
        number(previous)
      ).toFixed(1)
    );
  }

  // --------------------------------------------------
  // Growth
  // --------------------------------------------------

  const growthData = [...growth].sort(
    (a, b) =>
      new Date(a.date) -
      new Date(b.date)
  );

  const latest =
    growthData.length > 0
      ? growthData[
          growthData.length - 1
        ]
      : {};

  const previous =
    growthData.length > 1
      ? growthData[
          growthData.length - 2
        ]
      : latest;

  // --------------------------------------------------
  // Strongest Market
  // --------------------------------------------------

  const strongestMarket =
    [...locations]
      .filter(
        (item) =>
          item.group === "city"
      )
      .sort(
        (a, b) =>
          number(
            b.engagement
          ) -
          number(
            a.engagement
          )
      )[0] || {};

  // --------------------------------------------------
  // Primary Audience
  // --------------------------------------------------

  const primaryAudience =
    [...audience]
      .filter(
        (item) =>
          item.group === "age"
      )
      .sort(
        (a, b) =>
          number(
            b.percentage
          ) -
          number(
            a.percentage
          )
      )[0] || {};

  // --------------------------------------------------
  // KPI Cards
  // --------------------------------------------------

  return [
    {
      metric:
        "followers",

      label:
        "Community Size",

      value: number(
        latest.followers
      ),

      previous: number(
        previous.followers
      ),

      change:
        calculateRelativeChange(
          latest.followers,
          previous.followers
        ),

      changeUnit: "%",

      type: "number",
    },

    {
      metric:
        "reach",

      label:
        "Current Reach",

      value: number(
        latest.reach
      ),

      previous: number(
        previous.reach
      ),

      change:
        calculateRelativeChange(
          latest.reach,
          previous.reach
        ),

      changeUnit: "%",

      type: "number",
    },

    {
      metric:
        "engagement",

      label:
        "Engagement Rate",

      value: number(
        latest.engagement
      ),

      previous: number(
        previous.engagement
      ),

      change:
        calculatePercentagePointChange(
          latest.engagement,
          previous.engagement
        ),

      changeUnit: "pp",

      type: "percent",
    },

    {
      metric:
        "city",

      label:
        "Strongest Market",

      value:
        strongestMarket.segment ||
        strongestMarket.city ||
        "-",

      secondary:
        strongestMarket.engagement !=
        null
          ? `${number(
              strongestMarket.engagement
            ).toFixed(
              1
            )}% engagement`
          : "",

      type: "text",
    },

    {
      metric:
        "audience",

      label:
        "Primary Audience",

      value:
        primaryAudience.segment ||
        "-",

      secondary:
        primaryAudience.percentage !=
        null
          ? `${number(
              primaryAudience.percentage
            ).toFixed(
              1
            )}% share`
          : "",

      type: "text",
    },
  ];
}