import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { useDashboard } from "../../context/DashboardContext";
import { formatNumber } from "../../utils/dashboard/formatters";

import { layout } from "./follower/constants";
import { createScales } from "./follower/scales";
import { drawAxes } from "./follower/drawAxes";
import { drawLine } from "./follower/drawLine";
import { drawPoints } from "./follower/drawPoints";

export default function FollowerLineChart() {
  const svgRef = useRef(null);

  const [tooltip, setTooltip] =
    useState(null);

  const {
    filteredGrowth,
    selectedEvent,
    setSelectedEvent,
  } = useDashboard();

  useEffect(() => {
    if (!filteredGrowth.length) {
      return;
    }

    const data = filteredGrowth.map((item) => ({
      ...item,
      date: new Date(item.date),
      followers: Number(item.followers),
      reach: Number(item.reach),
      engagement: Number(item.engagement),
    }));

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

    const { x, y } =
      createScales(
        data,
        layout
      );

    // --------------------------------------------------
    // Axes
    // --------------------------------------------------

    drawAxes({
      svg,
      x,
      y,
      layout,
    });

    // --------------------------------------------------
    // Line
    // --------------------------------------------------

    drawLine({
      svg,
      data,
      x,
      y,
    });

    // --------------------------------------------------
    // Points
    // --------------------------------------------------

    drawPoints({
      svg,
      svgRef,
      data,
      x,
      y,
      layout,
      selectedEvent,
      setSelectedEvent,
      setTooltip,
    });

  }, [
    filteredGrowth,
    selectedEvent,
    setSelectedEvent,
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
            {d3.timeFormat(
              "%d %b %Y"
            )(tooltip.date)}
          </strong>

          {tooltip.event && (
            <div>
              {tooltip.event}
            </div>
          )}

          <div>
            Followers:{" "}
            {formatNumber(
              tooltip.followers
            )}
          </div>

          <div>
            Reach:{" "}
            {formatNumber(
              tooltip.reach
            )}
          </div>

          <div>
            Engagement:{" "}
            {tooltip.engagement}%
          </div>
        </div>
      )}
    </div>
  );
}