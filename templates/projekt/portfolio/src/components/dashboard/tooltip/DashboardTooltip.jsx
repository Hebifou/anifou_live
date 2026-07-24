import { useDashboardTooltip } from "./useDashboardTooltip";

export default function DashboardTooltip() {
  const { tooltip } =
    useDashboardTooltip();

  if (!tooltip) {
    return null;
  }

  return (
    <div
      className="dashboard-tooltip"
      style={{
        position: "fixed",
        left: tooltip.x,
        top: tooltip.y,
      }}
    >
      <strong>
        {tooltip.title}
      </strong>

      {tooltip.subtitle && (
        <div>
          {tooltip.subtitle}
        </div>
      )}

      {tooltip.date && (
        <div>
          {tooltip.date}
        </div>
      )}

      {tooltip.values &&
        tooltip.values.map(
          (value, index) => (
            <div key={index}>
              {value}
            </div>
          )
        )}

      {tooltip.followers && (
        <div>
          Followers:{" "}
          {tooltip.followers}
        </div>
      )}

      {tooltip.reach && (
        <div>
          Reach: {tooltip.reach}
        </div>
      )}
    </div>
  );
}