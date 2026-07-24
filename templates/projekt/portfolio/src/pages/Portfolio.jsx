import { useState } from "react";

import { projects } from "../data/projects";
import ProjectSection from "../components/ProjectSection";
import ImageOverlay from "../components/ImageOverlay";

export default function Portfolio() {
  const [
    selectedImage,
    setSelectedImage,
  ] = useState(null);

  return (
    <main className="portfolio">
      <header className="portfolio-header">
        <div className="portfolio-header-top">
          <div className="portfolio-title">
            Hiba Fouani
          </div>

          <a
            className="portfolio-back-link"
            href="/"
            aria-label="Zurück zu anifou.com"
          >
            ← anifou.com
          </a>
        </div>

        <div className="portfolio-services">
          Automation · Analytics · AI · Digital Products
        </div>

        <div className="portfolio-intro">
          Selected work across strategy, design, data and digital products.
        </div>
      </header>

      <section className="portfolio-grid">
        {projects.map((project) => (
          <ProjectSection
            key={project.title}
            project={project}
            onImageClick={
              setSelectedImage
            }
          />
        ))}
      </section>

      <ImageOverlay
        image={selectedImage}
        onClose={() =>
          setSelectedImage(null)
        }
      />
    </main>
  );
}