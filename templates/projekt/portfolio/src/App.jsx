import Portfolio from "./pages/Portfolio";
import AudienceDashboard from "./pages/AudienceDashboard";

export default function App() {
  const path = window.location.pathname;

  switch (path) {
    case "/portfolio-dashboard":
      return <AudienceDashboard />;

    case "/portfolio":
    case "/":
    default:
      return <Portfolio />;
  }
}