import { useDashboard } from "../../context/DashboardContext";

export default function InsightPanel() {
  const {
    currentInsight,
  } = useDashboard();

  if (!currentInsight) {
    return null;
  }

  const {
    context,
    summary = [],
    metrics = [],
    relationships = [],
  } = currentInsight;

  return (
    <div className="insight-panel">

      {/* ---------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------- */}

      <header className="insight-header">

        <h3>
          <span>
            {context}
          </span>

          <span className="insight-divider">
            •
          </span>

          <span className="insight-description">
            Key insights
          </span>
        </h3>

      </header>

      {/* ---------------------------------------------- */}
      {/* Overview */}
      {/* ---------------------------------------------- */}

      {summary.length > 0 && (
        <section className="insight-block">

          <h4>
            Overview
          </h4>

          <div className="insight-summary">
            {summary[0]?.text}
          </div>

        </section>
      )}

      {/* ---------------------------------------------- */}
      {/* Highlights */}
      {/* ---------------------------------------------- */}

      {metrics.length > 0 && (
        <section className="insight-block">

          <h4>
            Highlights
          </h4>

          <ul className="insight-list">

            {metrics.map(
              (item, index) => (
                <li key={index}>
                  {item.text}
                </li>
              )
            )}

          </ul>

        </section>
      )}

      {/* ---------------------------------------------- */}
      {/* Recommendations */}
      {/* ---------------------------------------------- */}

      {relationships.length > 0 && (
        <section className="insight-block">

          <h4>
            Recommendations
          </h4>

          <ul className="insight-list">

            {relationships.map(
              (item, index) => (
                <li key={index}>
                  {item.text}
                </li>
              )
            )}

          </ul>

        </section>
      )}

    </div>
  );
}