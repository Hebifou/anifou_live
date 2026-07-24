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

  const timelineY =
    height * 0.60;

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

  return {
    x,
    timelineY,
  };
}