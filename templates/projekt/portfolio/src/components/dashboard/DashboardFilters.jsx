import { useDashboard } from "../../context/DashboardContext";

export default function DashboardFilters() {
  const {
    dashboardView,
    resetDashboard,
  } = useDashboard();

  return (
    <nav
      className="dashboard-filters"
      aria-label="Dashboard Navigation"
    >
      <div className="dashboard-filter-tabs">

        <button
          type="button"
          className={`dashboard-filter-button ${
            dashboardView === "overview"
              ? "active"
              : ""
          }`}
          onClick={() =>
            resetDashboard()
          }
        >
          Overview
        </button>

      </div>
    </nav>
  );
}