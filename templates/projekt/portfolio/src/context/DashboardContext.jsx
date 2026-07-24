import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { loadCsv } from "../utils/dashboard/loadCsv";
import { buildDashboardData } from "../utils/dashboard/buildDashboardData";

const DashboardContext = createContext();

export function DashboardProvider({
  children,
}) {
  const [loading, setLoading] =
    useState(true);

  // --------------------------------------------------
  // Master Dataset
  // --------------------------------------------------

  const [
    masterDataset,
    setMasterDataset,
  ] = useState([]);

  // --------------------------------------------------
  // Dashboard View
  // --------------------------------------------------

  const [
    dashboardView,
    setDashboardView,
  ] = useState("overview");

  // --------------------------------------------------
  // Filters
  //
  // Kept for compatibility with existing
  // components. They do not currently
  // rebuild the dashboard.
  // --------------------------------------------------

  const [filters, setFilters] =
    useState({
      platform: "All",
      timeframe: "All",
      audience: "All",
      geography: "All",
    });

  // --------------------------------------------------
  // Selection
  //
  // Selection is used for highlighting
  // only. It does not filter the master
  // dataset.
  // --------------------------------------------------

  const [
    selection,
    setSelection,
  ] = useState({
    event: null,
    city: null,
    age: null,
    driver: null,
  });

  // --------------------------------------------------
  // Selection Helpers
  // --------------------------------------------------

  function updateSelection(
    key,
    value
  ) {
    setSelection((previous) => ({
      ...previous,
      [key]:
        previous[key] === value
          ? null
          : value,
    }));
  }

  function selectEvent(event) {
    setSelection((previous) => {
      const previousTitle =
        previous.event?.title ??
        null;

      const nextTitle =
        event?.title ?? null;

      return {
        ...previous,
        event:
          previousTitle ===
          nextTitle
            ? null
            : event,
      };
    });
  }

  function selectCity(city) {
    updateSelection(
      "city",
      city
    );
  }

  function selectAge(age) {
    updateSelection(
      "age",
      age
    );
  }

  function selectDriver(driver) {
    updateSelection(
      "driver",
      driver
    );
  }

  // --------------------------------------------------
  // Compatibility
  // --------------------------------------------------

  const selectedEvent =
    selection.event;

  const selectedAudience =
    selection.age;

  const selectedCity =
    selection.city;

  const selectedDriver =
    selection.driver;

  function setSelectedEvent(
    event
  ) {
    selectEvent(event);
  }

  function setSelectedAudience(
    age
  ) {
    selectAge(age);
  }

  function setSelectedCity(
    city
  ) {
    selectCity(city);
  }

  function setSelectedDriver(
    driver
  ) {
    selectDriver(driver);
  }

  // --------------------------------------------------
  // Reset
  // --------------------------------------------------

  function resetDashboard() {
    setDashboardView(
      "overview"
    );

    setFilters({
      platform: "All",
      timeframe: "All",
      audience: "All",
      geography: "All",
    });

    setSelection({
      event: null,
      city: null,
      age: null,
      driver: null,
    });
  }

  // --------------------------------------------------
  // CSV Loading
  // --------------------------------------------------

  useEffect(() => {
    async function loadDashboard() {
      try {
        const masterDatasetUrl =
          `${import.meta.env.BASE_URL}dashboard/master_dataset.csv`;

        const dataset =
          await loadCsv(
            masterDatasetUrl
          );

        setMasterDataset(
          dataset
        );
      } catch (error) {
        console.error(
          "Dashboard loading failed",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // --------------------------------------------------
  // Dashboard
  // --------------------------------------------------

  const dashboard = useMemo(() => {
    return buildDashboardData(
      masterDataset
    );
  }, [masterDataset]);

  // --------------------------------------------------
  // Dashboard State
  // --------------------------------------------------

  const hasSelection =
    Boolean(selection.event) ||
    Boolean(selection.driver) ||
    Boolean(selection.city) ||
    Boolean(selection.age);

  // --------------------------------------------------
  // Current Insight
  // --------------------------------------------------

  const currentInsight =
    useMemo(() => {
      const insightData =
        dashboard.insightData;

      if (!insightData) {
        return null;
      }

      if (selection.event) {
        return (
          insightData.events?.[
            selection.event.title
          ] ??
          insightData.overview
        );
      }

      if (selection.driver) {
        return (
          insightData.drivers?.[
            selection.driver
          ] ??
          insightData.overview
        );
      }

      if (selection.city) {
        return (
          insightData.locations?.[
            selection.city
          ] ??
          insightData.overview
        );
      }

      if (selection.age) {
        return (
          insightData.audience?.[
            selection.age
          ] ??
          insightData.overview
        );
      }

      return (
        insightData.overview
      );
    }, [
      dashboard,
      selection,
    ]);

  // --------------------------------------------------
  // Context
  // --------------------------------------------------

  const value = useMemo(
    () => ({
      loading,

      dashboardView,
      setDashboardView,

      masterDataset,

      dashboard,

      currentInsight,

      // --------------------------------------------------
      // Dashboard Data
      // --------------------------------------------------

      kpis:
        dashboard.kpis || [],

      growth:
        dashboard.growth || [],

      audience:
        dashboard.audience || [],

      locations:
        dashboard.locations || [],

      drivers:
        dashboard.drivers || [],

      timeline:
        dashboard.timeline || [],

      insights:
        dashboard.insights || [],

      insightData:
        dashboard.insightData ||
        {},

      // --------------------------------------------------
      // Compatibility
      // --------------------------------------------------

      baseDashboard:
        dashboard,

      filteredDashboard:
        dashboard,

      selectedDashboard:
        dashboard,

      selectedDataset:
        masterDataset,

      filteredGrowth:
        dashboard.growth || [],

      filteredAudience:
        dashboard.audience || [],

      filteredLocations:
        dashboard.locations || [],

      filteredDrivers:
        dashboard.drivers || [],

      filteredTimeline:
        dashboard.timeline || [],

      filteredInsights:
        dashboard.insights || [],

      // --------------------------------------------------
      // Filters
      // --------------------------------------------------

      filters,
      setFilters,

      // --------------------------------------------------
      // Selection
      // --------------------------------------------------

      selection,
      setSelection,

      hasSelection,

      selectEvent,
      selectCity,
      selectAge,
      selectDriver,

      selectedEvent,
      setSelectedEvent,

      selectedAudience,
      setSelectedAudience,

      selectedCity,
      setSelectedCity,

      selectedDriver,
      setSelectedDriver,

      // --------------------------------------------------
      // Actions
      // --------------------------------------------------

      resetDashboard,
    }),
    [
      loading,
      dashboardView,
      masterDataset,
      dashboard,
      currentInsight,
      filters,
      selection,
      hasSelection,
      selectedEvent,
      selectedAudience,
      selectedCity,
      selectedDriver,
    ]
  );

  return (
    <DashboardContext.Provider
      value={value}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(
    DashboardContext
  );
}