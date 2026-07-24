import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

import { useDashboard } from "../../context/DashboardContext";
import { formatNumber } from "../../utils/dashboard/formatters";

export default function HorizontalBarChart({
  dataset,
  filterGroup,
  labelKey = "segment",
  valueKey = "value",
}) {
  const svgRef = useRef(null);

  const {
    filteredAudience,
    filteredLocations,
    filteredDrivers,

    selection,

    selectAge,
    selectCity,
    selectDriver,
  } = useDashboard();

  const source = useMemo(() => {
    switch (dataset) {
      case "audience":
        return filteredAudience;

      case "locations":
        return filteredLocations;

      case "drivers":
        return filteredDrivers;

      default:
        return [];
    }
  }, [
    dataset,
    filteredAudience,
    filteredLocations,
    filteredDrivers,
  ]);

  useEffect(() => {
    if (!source.length) return;

    const data = source
      .filter(
        (item) =>
          !filterGroup ||
          item.group === filterGroup
      )
      .map((item) => ({
        ...item,
        value: Number(item[valueKey]),
      }));

    const width = 360;
    const height = 155;

    const margin = {
      top: 10,
      right: 48,
      bottom: 10,
      left: 100,
    };

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg.attr(
      "viewBox",
      `0 0 ${width} ${height}`
    );

    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => d.value),
      ])
      .nice()
      .range([
        margin.left,
        width - margin.right,
      ]);

    const y = d3
      .scaleBand()
      .domain(
        data.map((d) => d[labelKey])
      )
      .range([
        margin.top,
        height - margin.bottom,
      ])
      .padding(0.45);

    function getSelectedValue() {
      switch (dataset) {
        case "audience":
          return selection.age;

        case "locations":
          return selection.city;

        case "drivers":
          return selection.driver;

        default:
          return null;
      }
    }

    function handleSelection(value) {
      switch (dataset) {
        case "audience":
          selectAge(value);
          break;

        case "locations":
          selectCity(value);
          break;

        case "drivers":
          selectDriver(value);
          break;

        default:
          break;
      }
    }

    const selected = getSelectedValue();

    // --------------------------------------------------
    // Background Bars
    // --------------------------------------------------

    svg
      .selectAll(".bar-background")
      .data(data)
      .join("rect")
      .attr("class", "bar-background")
      .attr("x", margin.left)
      .attr(
        "y",
        (d) => y(d[labelKey])
      )
      .attr(
        "width",
        width -
          margin.right -
          margin.left
      )
      .attr(
        "height",
        y.bandwidth()
      )
      .attr("rx", 6)
      .attr("fill", "#f1f1ee");

    // --------------------------------------------------
    // Bars
    // --------------------------------------------------

    const bars = svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", margin.left)
      .attr(
        "y",
        (d) => y(d[labelKey])
      )
      .attr(
        "height",
        y.bandwidth()
      )
      .attr("rx", 6)
      .attr("fill", "#151515")
      .attr("width", 0)
      .attr("opacity", (d) => {
        if (!selected) {
          return 0.95;
        }

        return selected === d[labelKey]
          ? 1
          : 0.18;
      })
      .style("cursor", "pointer")
      .on(
        "mouseenter",
        function (_, d) {
          d3.select(this)
            .raise()
            .transition()
            .duration(150)
            .attr("opacity", 1)
            .attr("fill", "#000000");
        }
      )
      .on(
        "mouseleave",
        function (_, d) {
          d3.select(this)
            .transition()
            .duration(150)
            .attr("fill", "#151515")
            .attr(
              "opacity",
              !selected
                ? 0.95
                : selected ===
                    d[labelKey]
                  ? 1
                  : 0.18
            );
        }
      )
      .on(
        "click",
        function (_, d) {
          d3.select(this).raise();

          handleSelection(
            d[labelKey]
          );
        }
      );

    bars
      .transition()
      .duration(700)
      .ease(d3.easeCubicOut)
      .attr(
        "width",
        (d) =>
          x(d.value) -
          margin.left
      );

    // --------------------------------------------------
    // Labels
    // --------------------------------------------------

    svg
      .selectAll(".label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr(
        "x",
        margin.left - 10
      )
      .attr(
        "y",
        (d) =>
          y(d[labelKey]) +
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
          selected === d[labelKey]
            ? 700
            : 500
      )
      .attr(
        "fill",
        (d) =>
          selected === d[labelKey]
            ? "#151515"
            : "#666660"
      )
      .attr("opacity", (d) => {
        if (!selected) {
          return 1;
        }

        return selected === d[labelKey]
          ? 1
          : 0.35;
      })
      .style("cursor", "pointer")
      .text((d) => d[labelKey])
      .on(
        "click",
        (_, d) =>
          handleSelection(
            d[labelKey]
          )
      );

    // --------------------------------------------------
    // Values
    // --------------------------------------------------

    svg
      .selectAll(".value")
      .data(data)
      .join("text")
      .attr("class", "value")
      .attr(
        "x",
        (d) =>
          x(d.value) + 8
      )
      .attr(
        "y",
        (d) =>
          y(d[labelKey]) +
          y.bandwidth() / 2
      )
      .attr(
        "dominant-baseline",
        "middle"
      )
      .attr("font-size", 12)
      .attr("font-weight", 500)
      .attr(
        "fill",
        (d) =>
          selected === d[labelKey]
            ? "#151515"
            : "#8a8a84"
      )
      .attr("opacity", (d) => {
        if (!selected) {
          return 1;
        }

        return selected === d[labelKey]
          ? 1
          : 0.35;
      })
      .text((d) =>
        d.percentage
          ? `${d.percentage}%`
          : formatNumber(d.value)
      );
  }, [
    source,
    dataset,
    filterGroup,
    labelKey,
    valueKey,
    selection,
    selectAge,
    selectCity,
    selectDriver,
  ]);

  return (
    <div className="dashboard-mini-chart">
      <svg ref={svgRef} />
    </div>
  );
}