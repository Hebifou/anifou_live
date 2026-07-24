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

  const valueColumn =
    width -
    margin.right +
    42;

  svg
    .selectAll(".value")
    .data(data)
    .join("text")
    .attr(
      "class",
      "value"
    )
    .attr(
      "x",
      valueColumn
    )
    .attr(
      "y",
      (d) =>
        y(d.segment) +
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
    .attr(
      "font-size",
      16
    )
    .attr(
      "font-weight",
      700
    )
    .style(
      "font-variant-numeric",
      "tabular-nums"
    )
    .attr(
      "fill",
      (d) =>
        selected === d.segment
          ? "#151515"
          : "#8a8a84"
    )
    .attr(
      "opacity",
      (d) => {
        if (!selected) {
          return 1;
        }

        return selected === d.segment
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