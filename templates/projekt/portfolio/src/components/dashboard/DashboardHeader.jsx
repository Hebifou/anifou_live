import { useMemo } from "react";

import { useDashboard } from "../../context/DashboardContext";
import { formatNumber } from "../../utils/dashboard/formatters";

import DashboardFilters from "./DashboardFilters";

export default function DashboardHeader() {
  const {
    kpis,
    timeline,
    loading,
    currentInsight,
  } = useDashboard();

  const followers = useMemo(() => {
    return (
      kpis.find(
        (item) =>
          item.metric === "followers"
      )?.value ?? 0
    );
  }, [kpis]);

  // --------------------------------------------------
  // Dynamic Insight Context
  // --------------------------------------------------

  const headerContext = useMemo(() => {
    if (!currentInsight) {
      return {
        title: "Overview",
        subtitle: "Interaction",
      };
    }

    return {
      title:
        currentInsight.selection ||
        "Overview",

      subtitle:
        currentInsight.context ||
        "Interaction",
    };
  }, [
    currentInsight,
  ]);

  return (
    <header className="dashboard-header">
      {/* ---------------------------------------------- */}
      {/* Left */}
      {/* ---------------------------------------------- */}

      <div className="dashboard-header-left">
        <h1>
          Audience Performance
        </h1>

        <p className="dashboard-subtitle">
          Instagram audience growth, engagement & campaign performance
        </p>
      </div>

      {/* ---------------------------------------------- */}
      {/* Center */}
      {/* ---------------------------------------------- */}

      <div className="dashboard-header-center">
        <DashboardFilters />

        <div className="dashboard-status-row">
          <span>
            {headerContext.title}
          </span>

          <span>•</span>

          <span>
            {headerContext.subtitle}
          </span>

          <span>•</span>

          <span>
            {loading
              ? "Loading..."
              : `${formatNumber(
                  followers
                )} Followers`}
          </span>

          <span>•</span>

          <span>
            {timeline.length} Events
          </span>
        </div>
      </div>

      {/* ---------------------------------------------- */}
      {/* Right */}
      {/* ---------------------------------------------- */}


    </header>
  );
}