import * as d3 from "d3";

export function drawLine({
  svg,
  data,
  x,
  y,
}) {
  const line = d3
    .line()
    .defined(
      (d) => d.followers != null
    )
    .x((d) => x(d.date))
    .y((d) => y(d.followers))
    .curve(d3.curveMonotoneX);

  const path = svg
    .append("path")
    .datum(data)
    .attr("class", "growth-line")
    .attr("fill", "none")
    .attr("stroke", "#151515")
    .attr("stroke-width", 2.4)
    .attr(
      "stroke-linecap",
      "round"
    )
    .attr(
      "stroke-linejoin",
      "round"
    )
    .attr("d", line);

  const totalLength =
    path.node().getTotalLength();

  path
    .attr(
      "stroke-dasharray",
      totalLength
    )
    .attr(
      "stroke-dashoffset",
      totalLength
    )
    .transition()
    .duration(1200)
    .ease(d3.easeCubicOut)
    .attr(
      "stroke-dashoffset",
      0
    );

  return path;
}