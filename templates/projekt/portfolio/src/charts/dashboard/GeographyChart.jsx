import { useMemo, useRef, useState } from "react";

import { useDashboard } from "../../context/DashboardContext";

import { formatNumber } from "../../utils/dashboard/formatters";

import MapLayer from "./MapLayer";

export default function GeographyChart() {
  const containerRef = useRef(null);

  const [tooltip, setTooltip] =
    useState(null);

  const {
    filteredLocations,
    selection,
    selectCity,
  } = useDashboard();

  const locations = useMemo(() => {
    return filteredLocations
      .map((item) => ({
        ...item,
        value: Number(item.value),
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      );
  }, [filteredLocations]);

  return (
    <div
      ref={containerRef}
      className="dashboard-map-chart"
    >
      <MapLayer
        data={locations}
        selectedCity={
          selection.city
        }
        onSelectCity={
          selectCity
        }
        setTooltip={
          setTooltip
        }
        containerRef={
          containerRef
        }
      />

      {tooltip && (
        <div
          className="dashboard-tooltip"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <strong>
            {tooltip.city}
          </strong>

          <div>
            Audience Share
          </div>

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
            {Number(
              tooltip.engagement
            ).toFixed(1)}
            %
          </div>
        </div>
      )}
    </div>
  );
}