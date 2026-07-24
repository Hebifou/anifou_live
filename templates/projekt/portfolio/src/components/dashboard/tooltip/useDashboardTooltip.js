import { useContext } from "react";

import { DashboardTooltipContext } from "./DashboardTooltipContext";

export function useDashboardTooltip() {
  const context = useContext(
    DashboardTooltipContext
  );

  if (!context) {
    throw new Error(
      "useDashboardTooltip must be used inside DashboardTooltipProvider."
    );
  }

  return context;
}