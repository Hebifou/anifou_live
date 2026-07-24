export function drawValues({
  svg,
  data,
  y,
  layout,
  selected,
}) {
  const {
    width,
    margin,
  } = layout;

  svg
    .selectAll(".value")
    .data(data)
    .join("text")
    .attr("class", "value")
    .attr(
      "x",
      width -
        margin.right +
        20
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
    .attr("font-weight", 600)
    .style(
      "font-variant-numeric",
      "tabular-nums"
    )
    .attr(
      "fill",
      (d) =>
        selected === d.driver
          ? "#151515"
          : "#8a8a84"
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
    .style(
      "pointer-events",
      "none"
    )
    .text(
      (d) =>
        `${d.percentage}%`
    );
}