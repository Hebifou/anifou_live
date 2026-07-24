import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const DashboardTooltipContext =
  createContext(null);

export function DashboardTooltipProvider({
  children,
}) {
  const [tooltip, setTooltip] =
    useState(null);

  const showTooltip =
    useCallback((tooltipData) => {
      setTooltip(tooltipData);
    }, []);

  const moveTooltip =
    useCallback((position) => {
      setTooltip((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          ...position,
        };
      });
    }, []);

  const hideTooltip =
    useCallback(() => {
      setTooltip(null);
    }, []);

  const value = useMemo(
    () => ({
      tooltip,
      showTooltip,
      moveTooltip,
      hideTooltip,
    }),
    [
      tooltip,
      showTooltip,
      moveTooltip,
      hideTooltip,
    ]
  );

  return (
    <DashboardTooltipContext.Provider
      value={value}
    >
      {children}
    </DashboardTooltipContext.Provider>
  );
}