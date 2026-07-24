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
  const {
    margin,
  } = layout;


  const bars = svg
    .selectAll(".bar")
    .data(data)
    .join("rect")
    .attr(
      "class",
      "bar"
    )
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
      "height",
      y.bandwidth()
    )
    .attr(
      "rx",
      8
    )
    .attr(
      "ry",
      8
    )
    .attr(
      "fill",
      "#151515"
    )
    .attr(
      "width",
      0
    )
    .attr(
      "opacity",
      (d) => {
        if (!selected) {
          return 0.9;
        }

        return selected === d.segment
          ? 1
          : 0.22;
      }
    )
    .style(
      "cursor",
      "pointer"
    );


  bars
    .transition()
    .delay(
      (_, i) =>
        i * 40
    )
    .duration(
      700
    )
    .ease(
      d3.easeCubicOut
    )
    .attr(
      "width",
      (d) =>
        x(d.value) -
        margin.left
    );


  // --------------------------------------------------
  // Hover interaction
  // --------------------------------------------------

  bars
    .on(
      "mouseenter",
      function () {
        d3.select(this)
          .raise()
          .transition()
          .duration(180)
          .attr(
            "fill",
            "#000000"
          );
      }
    )
    .on(
      "mouseleave",
      function (_, d) {
        d3.select(this)
          .transition()
          .duration(180)
          .attr(
            "fill",
            "#151515"
          )
          .attr(
            "opacity",
            !selected
              ? 0.9
              : selected === d.segment
                ? 1
                : 0.22
          );
      }
    );


  bars.on(
    "click",
    onClick
  );


  return bars;
}