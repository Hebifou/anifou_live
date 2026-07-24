import * as d3 from "d3";

export function drawLabels({
  svg,
  data,
  y,
  layout,
  selected,
  selectAge,
}) {
  const {
    margin,
  } = layout;

  svg
    .selectAll(".label")
    .data(data)
    .join("text")
    .attr(
      "class",
      "label"
    )
    .attr(
      "x",
      margin.left - 14
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
      (d) =>
        selected === d.segment
          ? 700
          : 550
    )
    .attr(
      "fill",
      (d) =>
        selected === d.segment
          ? "#151515"
          : "#666660"
    )
    .attr(
      "opacity",
      0
    )
    .style(
      "cursor",
      "pointer"
    )
    .text(
      (d) =>
        d.segment
    )
    .on(
      "click",
      (_, d) =>
        selectAge(
          d.segment
        )
    )
    .transition()
    .delay(
      (_, i) =>
        i * 40
    )
    .duration(
      450
    )
    .ease(
      d3.easeCubicOut
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
    );
}