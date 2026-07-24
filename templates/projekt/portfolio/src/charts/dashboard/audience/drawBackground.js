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
    .attr(
      "x",
      margin.left
    )
    .attr(
      "y",
      (d) =>
        y(d.segment)
    )
    .attr(
      "width",
      width -
        margin.left -
        margin.right -
        20
    )
    .attr(
      "height",
      y.bandwidth()
    )
    .attr("rx", 6)
    .attr("fill", "#f2f2ef");
}