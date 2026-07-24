import { useMemo } from "react";

import { useDashboard } from "../../context/DashboardContext";

export default function ChartCard({
  cardId,
  title,
  subtitle,
  children,
}) {
  const {
    dashboardView,
    hasSelection,
  } = useDashboard();

  const isFocused = useMemo(() => {
    return (
      dashboardView === "overview" ||
      dashboardView === cardId
    );
  }, [dashboardView, cardId]);

  const isHero = useMemo(() => {
    if (dashboardView === "overview") {
      return cardId === "growth";
    }

    return dashboardView === cardId;
  }, [dashboardView, cardId]);

  return (
    <article
      className={[
        "dashboard-card",
        `card-${cardId}`,
        isFocused ? "focused" : "",
        isHero ? "hero" : "",
        hasSelection
          ? "selection-active"
          : "",
      ].join(" ")}
    >
      {cardId !== "insights" && (
        <header className="dashboard-card-header">
          <h2 className="dashboard-card-title">
            {title}

            {subtitle && (
              <span className="dashboard-card-subtitle-inline">
                {" "}
                • {subtitle}
              </span>
            )}
          </h2>
        </header>
      )}

      <div className="dashboard-card-content">
        {children}
      </div>
    </article>
  );
}