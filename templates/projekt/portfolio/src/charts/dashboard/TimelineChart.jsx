import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useDashboard } from "../../context/DashboardContext";

import { layout } from "./timeline/constants";
import { createScales } from "./timeline/scales";
import { drawTimeline } from "./timeline/drawTimeline";
import { drawAxis } from "./timeline/drawAxis";
import { drawEvents } from "./timeline/drawEvents";

export default function TimelineChart() {
  const svgRef = useRef(null);

  const [tooltip, setTooltip] =
    useState(null);

  const {
    filteredTimeline,
    selectedEvent,
    selectEvent,
  } = useDashboard();

  useEffect(() => {
    if (!filteredTimeline.length) {
      return;
    }

    const data = filteredTimeline
      .map((item) => ({
        ...item,
        date: new Date(item.date),
      }))
      .sort(
        (a, b) => a.date - b.date
      );

    const {
      width,
      height,
    } = layout;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg.attr(
      "viewBox",
      `0 0 ${width} ${height}`
    );

    // --------------------------------------------------
    // Scales
    // --------------------------------------------------

    const {
      x,
      timelineY,
    } = createScales(
      data,
      layout
    );

    // --------------------------------------------------
    // Timeline
    // --------------------------------------------------

    drawTimeline({
      svg,
      layout,
      timelineY,
    });

    // --------------------------------------------------
    // Axis
    // --------------------------------------------------

    drawAxis({
      svg,
      x,
      timelineY,
    });

    // --------------------------------------------------
    // Events
    // --------------------------------------------------

    drawEvents({
      svg,
      svgRef,
      data,
      x,
      timelineY,
      layout,
      selectedEvent,
      selectEvent,
      setTooltip,
    });

  }, [
    filteredTimeline,
    selectedEvent,
    selectEvent,
  ]);

  return (
    <div className="dashboard-chart">
      <svg ref={svgRef} />

      {tooltip && (
        <div
          className="dashboard-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <strong>
            {tooltip.title}
          </strong>

          <div>
            {tooltip.date}
          </div>

          <div>
            Followers:{" "}
            {tooltip.followers}
          </div>

          <div>
            Reach:{" "}
            {tooltip.reach}
          </div>
        </div>
      )}
    </div>
  );
}