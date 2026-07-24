import { useMemo } from "react";

import { useDashboard } from "../../context/DashboardContext";
import { formatNumber } from "../../utils/dashboard/formatters";

export default function KpiRow() {
  const {
    kpis,
    selection,
  } = useDashboard();

  const activeSelection = useMemo(() => {
    return (
      selection.city ||
      selection.age ||
      selection.driver ||
      selection.event?.title ||
      null
    );
  }, [selection]);

  return (
    <section className="dashboard-kpi-row">
      {kpis.map((item) => {
        let value = item.value;

        if (
          item.type === "number" ||
          item.type === "percent"
        ) {
          value = formatNumber(item.value);
        }

        const label = item.label;

        const prefix =
          item.change > 0
            ? "▲"
            : item.change < 0
            ? "▼"
            : "•";

        const trend =
          item.secondary ||
          (item.change !== null &&
          item.change !== undefined
            ? `${prefix} ${Math.abs(
                item.change
              )}${item.changeUnit || ""}`
            : "Current");

        return (
          <article
            key={item.metric}
            className={`dashboard-kpi-card ${
              activeSelection
                ? "active"
                : ""
            }`}
          >
            <p className="dashboard-kpi-label">
              {label}
            </p>

            <div className="dashboard-kpi-value-row">
              <strong>{value}</strong>

              <span className="dashboard-kpi-change">
                {trend}
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}