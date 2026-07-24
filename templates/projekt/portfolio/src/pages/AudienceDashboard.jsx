import {
  useCallback,
  useEffect,
  useState,
} from "react";

import "../styles/dashboard.css";

import {
  useDashboard,
} from "../context/DashboardContext";

import {
  DashboardTooltipProvider,
} from "../components/dashboard/tooltip/DashboardTooltipContext";

import DashboardTooltip from "../components/dashboard/tooltip/DashboardTooltip";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardMobileInfo from "../components/dashboard/DashboardMobileInfo";

import KpiRow from "../components/dashboard/KpiRow";
import ChartCard from "../components/dashboard/ChartCard";
import InsightPanel from "../components/dashboard/InsightPanel";

import FollowerLineChart from "../charts/dashboard/FollowerLineChart";
import AudienceChart from "../charts/dashboard/AudienceChart";
import GeographyChart from "../charts/dashboard/GeographyChart";
import TimelineChart from "../charts/dashboard/TimelineChart";
import DriversChart from "../charts/dashboard/DriversChart";

const ONBOARDING_CLOSE_DURATION =
  240;

const MOBILE_BREAKPOINT =
  1024;

export default function AudienceDashboard() {

  const {
    dashboardView,
  } = useDashboard();

  const [
    showOnboarding,
    setShowOnboarding,
  ] = useState(
    true,
  );

  const [
    onboardingClosing,
    setOnboardingClosing,
  ] = useState(
    false,
  );

  const [
    isMobile,
    setIsMobile,
  ] = useState(
    false,
  );

  useEffect(() => {

    const mediaQuery =
      window.matchMedia(
        `(max-width: ${MOBILE_BREAKPOINT}px)`,
      );

    const updateViewport = () => {

      setIsMobile(
        mediaQuery.matches,
      );

    };

    updateViewport();

    mediaQuery.addEventListener(
      "change",
      updateViewport,
    );

    return () => {

      mediaQuery.removeEventListener(
        "change",
        updateViewport,
      );

    };

  }, []);

  const closeOnboarding =
    useCallback(() => {

      if (
        onboardingClosing
      ) {
        return;
      }

      setOnboardingClosing(
        true,
      );

      window.setTimeout(() => {

        setShowOnboarding(
          false,
        );

        setOnboardingClosing(
          false,
        );

      }, ONBOARDING_CLOSE_DURATION);

    }, [
      onboardingClosing,
    ]);

  useEffect(() => {

    if (
      !showOnboarding
    ) {
      return undefined;
    }

    function handleKeyDown(
      event,
    ) {

      if (
        event.key ===
        "Escape"
      ) {
        closeOnboarding();
      }

    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

    };

  }, [
    showOnboarding,
    closeOnboarding,
  ]);

  if (
    isMobile
  ) {
    return (
      <DashboardMobileInfo />
    );
  }

  return (

    <DashboardTooltipProvider>

      <main className="dashboard-page">

        <section className="dashboard-shell">

          <a
            className="dashboard-back-link"
            href="/portfolio"
            aria-label="Back to portfolio"
          >
            ← Portfolio
          </a>

          <DashboardHeader />

          <KpiRow />

          <section
            className={
              `dashboard-main-grid dashboard-view-${dashboardView}`
            }
          >

            <ChartCard
              cardId="growth"
              title="Audience Growth"
              subtitle="Follower development over time."
              source="Instagram / CSV"
              updated="Q1–Q2 2026"
            >
              <FollowerLineChart />
            </ChartCard>

            <ChartCard
              cardId="timeline"
              title="Timeline"
              subtitle="Campaign milestones over time"
              source="Timeline CSV"
              updated="Q1–Q2 2026"
            >
              <TimelineChart />
            </ChartCard>

            <ChartCard
              cardId="drivers"
              title="Growth Drivers"
              subtitle="Key drivers for audience growth"
              source="Drivers CSV"
              updated="Q1–Q2 2026"
            >
              <DriversChart />
            </ChartCard>

            <ChartCard
              cardId="audience"
              title="Audience"
              subtitle="Age distribution"
              source="Audience CSV"
              updated="June 2026"
            >
              <AudienceChart />
            </ChartCard>

            <ChartCard
              cardId="geography"
              title="Geography"
              subtitle="Audience distribution across locations"
              source="Location CSV"
              updated="June 2026"
            >
              <GeographyChart />
            </ChartCard>

            <ChartCard
              cardId="insights"
              title="Insights"
              subtitle="Executive summary and recommendations"
              source="Analyst Layer"
              updated="Draft"
            >
              <InsightPanel />
            </ChartCard>

          </section>

        </section>

        {
          showOnboarding && (

            <div
              className={
                onboardingClosing
                  ? "dashboard-onboarding dashboard-onboarding-closing"
                  : "dashboard-onboarding"
              }
              role="dialog"
              aria-modal="true"
              aria-labelledby="dashboard-onboarding-title"
              aria-describedby="dashboard-onboarding-description"
            >

              <div
                className="dashboard-onboarding-backdrop"
                aria-hidden="true"
              />

              <section className="dashboard-onboarding-card">

                <div className="dashboard-onboarding-copy">

                  <p
                    id="dashboard-onboarding-title"
                    className="dashboard-onboarding-text"
                  >
                    Interactive dashboard
                  </p>

                  <p
                    id="dashboard-onboarding-description"
                    className="dashboard-onboarding-text"
                  >
                    Click any KPI, chart, map or timeline event.
                  </p>

                  <p className="dashboard-onboarding-text">
                    Insights update automatically.
                  </p>

                  <p className="dashboard-onboarding-text">
                    Overview returns to the full dashboard.
                  </p>

                </div>

                <button
                  className="dashboard-onboarding-button"
                  type="button"
                  onClick={closeOnboarding}
                >
                  Get started
                </button>

              </section>

            </div>

          )
        }

        <DashboardTooltip />

      </main>

    </DashboardTooltipProvider>

  );

}