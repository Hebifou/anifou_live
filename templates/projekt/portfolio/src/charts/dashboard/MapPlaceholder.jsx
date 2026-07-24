import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function MapPlaceholder() {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 720;
    const height = 420;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg.attr(
      "viewBox",
      `0 0 ${width} ${height}`
    );

    // --------------------------------------------------
    // Background
    // --------------------------------------------------

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 18)
      .attr("fill", "#fafaf8");

    // --------------------------------------------------
    // Map Area
    // --------------------------------------------------

    svg
      .append("rect")
      .attr("x", 40)
      .attr("y", 30)
      .attr("width", width - 80)
      .attr("height", height - 60)
      .attr("rx", 18)
      .attr("fill", "#f5f5f2")
      .attr("stroke", "#e7e7e2");

    // --------------------------------------------------
    // Title
    // --------------------------------------------------

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 95)
      .attr("text-anchor", "middle")
      .attr("font-size", 18)
      .attr("font-weight", 600)
      .attr("fill", "#151515")
      .text("Interactive Geography");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 120)
      .attr("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("fill", "#8a8a84")
      .text("Map loading...");

    // --------------------------------------------------
    // Example Bubbles
    // --------------------------------------------------

    const bubbles = [
      { x: 290, y: 165, r: 18 },
      { x: 370, y: 135, r: 10 },
      { x: 425, y: 205, r: 13 },
      { x: 510, y: 185, r: 8 },
      { x: 245, y: 235, r: 11 },
    ];

    svg
      .selectAll(".bubble")
      .data(bubbles)
      .join("circle")
      .attr("class", "bubble")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 0)
      .attr("fill", "#151515")
      .attr("opacity", 0.18)
      .transition()
      .duration(700)
      .delay((_, i) => i * 120)
      .attr("r", (d) => d.r);

    // --------------------------------------------------
    // Hint
    // --------------------------------------------------

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 42)
      .attr("text-anchor", "middle")
      .attr("font-size", 11)
      .attr("fill", "#9a9a95")
      .text("Europe map • Bubble layer • Crossfilter");
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}