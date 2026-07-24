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
    .scaleLinear()
    .domain([
      0,
      d3.max(
        data,
        (d) => d.value
      ),
    ])
    .nice()
    .range([
      margin.left,
      width -
        margin.right -
        20,
    ]);

  const y = d3
    .scaleBand()
    .domain(
      data.map(
        (d) => d.segment
      )
    )
    .range([
      margin.top,
      height -
        margin.bottom,
    ])
    .padding(0.42);

  return {
    x,
    y,
  };
}