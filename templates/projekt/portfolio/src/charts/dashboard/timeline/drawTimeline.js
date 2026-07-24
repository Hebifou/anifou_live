import * as d3 from "d3";

export function drawTimeline({
  svg,
  layout,
  timelineY,
}) {
  const {
    width,
    margin,
  } = layout;

  svg
    .append("line")
    .attr("x1", margin.left)
    .attr("x2", margin.left)
    .attr("y1", timelineY)
    .attr("y2", timelineY)
    .attr("stroke", "#d8d8d3")
    .attr("stroke-width", 2)
    .transition()
    .duration(700)
    .ease(d3.easeCubicOut)
    .attr(
      "x2",
      width - margin.right
    );
}