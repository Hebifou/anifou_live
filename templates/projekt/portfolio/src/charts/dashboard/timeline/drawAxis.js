import * as d3 from "d3";

export function drawAxis({
  svg,
  x,
  timelineY,
}) {
  svg
    .append("g")
    .attr(
      "transform",
      `translate(0,${timelineY + 42})`
    )
    .call(
      d3
        .axisBottom(x)
        .ticks(6)
        .tickSize(0)
        .tickFormat(
          d3.timeFormat("%b")
        )
    )
    .call((g) =>
      g.select(".domain").remove()
    )
    .call((g) =>
      g
        .selectAll("text")
        .attr("font-size", 30)
        .attr("font-weight", 500)
        .attr("fill", "#8a8a84")
        .attr("font-family", "inherit")
        .attr("dy", "1.35em")
    );
}