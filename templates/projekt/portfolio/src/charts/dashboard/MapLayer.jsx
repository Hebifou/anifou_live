import { useEffect, useRef } from "react";

import * as d3 from "d3";

import europe from "../../assets/maps/europe.geo.json";
import { formatNumber } from "../../utils/dashboard/formatters";

export default function MapLayer({
  data = [],
  selectedCity = null,
  onSelectCity,
  setTooltip,
  containerRef,
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    // --------------------------------------------------
    // Layout
    // --------------------------------------------------

    const width = 1120;
    const height = 560;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg.attr(
      "viewBox",
      `0 0 ${width} ${height}`
    );

    // --------------------------------------------------
    // Projection (Central Europe)
    // --------------------------------------------------

    const projection = d3
      .geoMercator()
      .center([13, 51])
      .scale(1350)
      .translate([
        width / 2,
        height / 2 - 10,
      ]);

    const path = d3
      .geoPath()
      .projection(projection);

    const maxValue =
      d3.max(
        data,
        (d) => Number(d.value)
      ) || 1;

    const radius = d3
      .scaleSqrt()
      .domain([
        0,
        maxValue,
      ])
      .range([
        8,
        34,
      ]);

    // --------------------------------------------------
    // Background
    // --------------------------------------------------

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#fafaf8");

    // --------------------------------------------------
    // Countries
    // --------------------------------------------------

    svg
      .append("g")
      .attr("class", "map-countries")
      .selectAll("path")
      .data(europe.features)
      .join("path")
      .attr("d", path)
      .attr("fill", "#f5f5f2")
      .attr("stroke", "#d8d8d3")
      .attr("stroke-width", 0.8);

    // --------------------------------------------------
    // Bubble Layer
    // --------------------------------------------------

    const bubbles = svg
      .append("g")
      .attr("class", "map-bubbles");

    const bubbleData = data
      .filter(
        (d) =>
          d.latitude != null &&
          d.longitude != null
      )
      .map((location) => {
        const point = projection([
          Number(location.longitude),
          Number(location.latitude),
        ]);

        if (!point) {
          return null;
        }

        return {
          ...location,

          targetX: point[0],
          targetY: point[1],

          x: point[0],
          y: point[1],

          r: radius(
            Number(location.value)
          ),
        };
      })
      .filter(Boolean);

    // --------------------------------------------------
    // Collision Layout
    // --------------------------------------------------

    const simulation = d3
      .forceSimulation(bubbleData)
      .force(
        "x",
        d3
          .forceX((d) => d.targetX)
          .strength(0.9)
      )
      .force(
        "y",
        d3
          .forceY((d) => d.targetY)
          .strength(0.9)
      )
      .force(
        "collide",
        d3.forceCollide(
          (d) => d.r + 5
        )
      )
      .stop();

    for (let i = 0; i < 180; i++) {
      simulation.tick();
    }

    // --------------------------------------------------
    // Draw Bubbles
    // --------------------------------------------------

    bubbleData.forEach((location) => {
      const group = bubbles
        .append("g")
        .style("cursor", "pointer");

      const circle = group
        .append("circle")
        .attr("cx", location.x)
        .attr("cy", location.y)
        .attr("r", 0)
        .attr("fill", "#151515")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2)
        .attr(
          "opacity",
          !selectedCity
            ? 0.9
            : selectedCity ===
                location.city
              ? 1
              : 0.25
        );

      circle
        .transition()
        .duration(700)
        .ease(d3.easeCubicOut)
        .attr("r", location.r);

      // --------------------------------------------------
      // Selected Ring
      // --------------------------------------------------

      if (selectedCity === location.city) {
        group
          .append("circle")
          .attr("cx", location.x)
          .attr("cy", location.y)
          .attr(
            "r",
            location.r + 5
          )
          .attr("fill", "none")
          .attr("stroke", "#151515")
          .attr("stroke-width", 1.4)
          .attr("opacity", 0.28);
      }

      // --------------------------------------------------
      // Hover
      // --------------------------------------------------

      group
        .on(
          "mouseenter",
          function (mouseEvent) {
            d3.select(this).raise();

            circle
              .transition()
              .duration(180)
              .ease(d3.easeCubicOut)
              .attr(
                "r",
                location.r + 3
              )
              .attr(
                "stroke-width",
                3
              )
              .attr("opacity", 1);

            group
              .append("circle")
              .attr(
                "class",
                "map-hover-ring"
              )
              .attr("cx", location.x)
              .attr("cy", location.y)
              .attr(
                "r",
                location.r + 7
              )
              .attr("fill", "none")
              .attr("stroke", "#151515")
              .attr("stroke-width", 1.2)
              .attr("opacity", 0)
              .transition()
              .duration(180)
              .attr("opacity", 0.22);

            const {
              left,
              top,
              width,
              height,
            } =
              containerRef.current.getBoundingClientRect();

            const tooltipWidth = 180;
            const tooltipHeight = 110;

            let xPos =
              mouseEvent.clientX -
              left +
              18;

            let yPos =
              mouseEvent.clientY -
              top -
              18;

            // --------------------------------------------------
            // Prevent overflow (right)
            // --------------------------------------------------

            if (
              xPos + tooltipWidth >
              width - 8
            ) {
              xPos =
                mouseEvent.clientX -
                left -
                tooltipWidth -
                18;
            }

            // --------------------------------------------------
            // Prevent overflow (top)
            // --------------------------------------------------

            if (yPos < 8) {
              yPos =
                mouseEvent.clientY -
                top +
                18;
            }

            // --------------------------------------------------
            // Prevent overflow (bottom)
            // --------------------------------------------------

            if (
              yPos + tooltipHeight >
              height - 8
            ) {
              yPos =
                height -
                tooltipHeight -
                8;
            }

            setTooltip({
              x: xPos,
              y: yPos,

              city: location.city,

              followers: formatNumber(
                location.followers || 0
              ),

              reach: formatNumber(
                location.reach || 0
              ),

              engagement:
                location.engagement ??
                0,
            });
          }
        )
        .on(
          "mousemove",
          function (mouseEvent) {
            const {
              left,
              top,
              width,
              height,
            } =
              containerRef.current.getBoundingClientRect();

            const tooltipWidth = 180;
            const tooltipHeight = 110;

            let xPos =
              mouseEvent.clientX -
              left +
              18;

            let yPos =
              mouseEvent.clientY -
              top -
              18;

            if (
              xPos + tooltipWidth >
              width - 8
            ) {
              xPos =
                mouseEvent.clientX -
                left -
                tooltipWidth -
                18;
            }

            if (yPos < 8) {
              yPos =
                mouseEvent.clientY -
                top +
                18;
            }

            if (
              yPos + tooltipHeight >
              height - 8
            ) {
              yPos =
                height -
                tooltipHeight -
                8;
            }

            setTooltip((prev) => ({
              ...prev,
              x: xPos,
              y: yPos,
            }));
          }
        )
        .on(
          "mouseleave",
          function () {
            circle
              .transition()
              .duration(180)
              .ease(d3.easeCubicOut)
              .attr("r", location.r)
              .attr(
                "stroke-width",
                2
              )
              .attr(
                "opacity",
                !selectedCity
                  ? 0.9
                  : selectedCity ===
                      location.city
                    ? 1
                    : 0.25
              );

            group
              .selectAll(
                ".map-hover-ring"
              )
              .remove();

            setTooltip(null);
          }
        )
        .on(
          "click",
          () => {
            onSelectCity?.(
              location.city
            );
          }
        );
    });
  }, [
    data,
    selectedCity,
    onSelectCity,
    setTooltip,
    containerRef,
  ]);

  return (
    <svg
      ref={svgRef}
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
      }}
    />
  );
}