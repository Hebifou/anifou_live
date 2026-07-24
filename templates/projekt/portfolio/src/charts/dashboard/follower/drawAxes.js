import * as d3 from "d3";

export function drawAxes({
  svg,
  x,
  y,
  layout,
}) {
  const {
    width,
    height,
    margin,
  } = layout;

  // --------------------------------------------------
  // Grid
  // --------------------------------------------------

  svg
    .append("g")
    .attr("class", "chart-grid")
    .attr(
      "transform",
      `translate(${margin.left},0)`
    )
    .call(
      d3
        .axisLeft(y)
        .ticks(3)
        .tickSize(
          -(
            width -
            margin.left -
            margin.right
          )
        )
        .tickFormat("")
    );

  svg
    .selectAll(".chart-grid line")
    .attr("stroke", "#ecece8")
    .attr("stroke-width", 1)
    .attr(
      "stroke-dasharray",
      "2 6"
    );

  svg
    .select(".chart-grid .domain")
    .remove();

  // --------------------------------------------------
  // X Axis
  // --------------------------------------------------

  svg
    .append("g")
    .attr(
      "transform",
      `translate(0,${
        height - margin.bottom
      })`
    )
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
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
        .attr("font-size", 12)
        .attr("font-weight", 400)
        .attr("fill", "#8a8a84")
    );

  // --------------------------------------------------
  // Y Axis
  // --------------------------------------------------

  svg
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left},0)`
    )
    .call(
      d3
        .axisLeft(y)
        .ticks(3)
        .tickSize(0)
        .tickFormat(
          (d) =>
            `${Math.round(
              d / 1000
            )}K`
        )
    )
    .call((g) =>
      g.select(".domain").remove()
    )
    .call((g) =>
      g
        .selectAll("text")
        .attr("font-size", 12)
        .attr("font-weight", 400)
        .attr("fill", "#8a8a84")
    );
}