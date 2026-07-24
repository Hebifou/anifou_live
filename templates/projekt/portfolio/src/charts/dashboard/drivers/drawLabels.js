export function drawLabels({
  svg,
  data,
  y,
  layout,
  selected,
  selectDriver,
}) {
  const { margin } = layout;

  svg
    .selectAll(".label")
    .data(data)
    .join("text")
    .attr("class", "label")
    .attr(
      "x",
      margin.left - 12
    )
    .attr(
      "y",
      (d) =>
        y(d.driver) +
        y.bandwidth() / 2
    )
    .attr(
      "text-anchor",
      "end"
    )
    .attr(
      "dominant-baseline",
      "middle"
    )
    .attr("font-size", 12)
    .attr(
      "font-weight",
      (d) =>
        selected === d.driver
          ? 700
          : 500
    )
    .attr(
      "fill",
      (d) =>
        selected === d.driver
          ? "#151515"
          : "#666660"
    )
    .attr(
      "opacity",
      (d) => {
        if (!selected) {
          return 1;
        }

        return selected === d.driver
          ? 1
          : 0.35;
      }
    )
    .style("cursor", "pointer")
    .text((d) => d.driver)
    .on(
      "click",
      (_, d) =>
        selectDriver(d.driver)
    );
}