import * as d3 from "d3";

export function drawBackground({
  svg,
  data,
  y,
  layout,
}) {
  const {
    width,
    margin,
  } = layout;

  svg
    .selectAll(".bar-background")
    .data(data)
    .join("rect")
    .attr("class", "bar-background")
    .attr("x", margin.left)
    .attr(
      "y",
      (d) => y(d.driver)
    )
    .attr(
      "width",
      width -
        margin.left -
        margin.right -
        24
    )
    .attr(
      "height",
      y.bandwidth()
    )
    .attr("rx", 8)
    .attr("fill", "#f2f2ef");
}