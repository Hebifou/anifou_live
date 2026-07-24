import dashboardPreview from "../../assets/images/social-dashboard/AudienceDashboard.png";

export default function DashboardMobileInfo() {
  return (
    <main className="dashboard-mobile-info">

      <a
        className="dashboard-back-link"
        href="/portfolio"
        aria-label="Back to portfolio"
      >
        ← Portfolio
      </a>

      <section className="dashboard-mobile-info__content">

        <figure className="dashboard-mobile-preview">

          <img
            className="dashboard-mobile-preview__image"
            src={dashboardPreview}
            alt="Audience Dashboard preview"
            loading="eager"
            draggable={false}
          />

          <div
            className="dashboard-mobile-preview__glass"
            aria-hidden="true"
          />

          <div
            className="dashboard-mobile-preview__fog"
            aria-hidden="true"
          />

        </figure>

        <section
          className="dashboard-mobile-description"
          aria-label="Dashboard information"
        >

          <p className="dashboard-mobile-info__title">
            Audience Dashboard
          </p>

          <p className="dashboard-mobile-info__subtitle">
            Built for larger screens.
          </p>

        </section>

      </section>

    </main>
  );
}