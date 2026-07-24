import * as d3 from "d3";

export function createScales(
  data,
  layout
) {
  const {
    width,
    height,
    margin,
  } = layout;

  const x = d3
    .scaleTime()
    .domain(
      d3.extent(
        data,
        (d) => d.date
      )
    )
    .range([
      margin.left,
      width - margin.right,
    ]);

  const y = d3
    .scaleLinear()
    .domain([
      d3.min(
        data,
        (d) => d.followers
      ) * 0.985,

      d3.max(
        data,
        (d) => d.followers
      ) * 1.015,
    ])
    .nice()
    .range([
      height - margin.bottom,
      margin.top,
    ]);

  return {
    x,
    y,
  };
}