import * as d3 from "d3";

export function drawBars({
  svg,
  data,
  x,
  y,
  layout,
  selected,
  onClick,
}) {
  const { margin } = layout;

  const bars = svg
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", margin.left)
    .attr(
      "y",
      (d) => y(d.driver)
    )
    .attr(
      "height",
      y.bandwidth()
    )
    .attr("rx", 8)
    .attr("fill", "#151515")
    .attr("width", 0)
    .attr(
      "opacity",
      (d) => {
        if (!selected) {
          return 0.92;
        }

        return selected === d.driver
          ? 1
          : 0.22;
      }
    )
    .style("cursor", "pointer");

  bars
    .transition()
    .delay((_, i) => i * 40)
    .duration(700)
    .ease(d3.easeCubicOut)
    .attr(
      "width",
      (d) =>
        x(d.value) -
        margin.left
    );

  bars.on(
    "click",
    onClick
  );

  return bars;
}