export default function ProjectSection({
  project,
  onImageClick,
}) {
  const heroImage =
    project.heroImage === true;

  const dashboardHero =
    project.title ===
    "SOCIAL MEDIA DASHBOARD";

  const anifouHero =
    project.title ===
    "ANIFOU";

  return (
    <article className="project-card">
      <div className="project-title">
        {project.title}
      </div>

      <div className="project-description">
        {project.description}
      </div>

      <div className="project-list">
        {project.responsibilities.map((item) => (
          <div key={item}>
            {item}
          </div>
        ))}
      </div>

      <div className="project-tags">
        {project.tags.join(" · ")}
      </div>

      <div className="project-link">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            View project ↗
            {project.language &&
              ` • ${project.language}`}
          </a>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>

      {project.images.length > 0 && (
        <div
          className={
            heroImage
              ? "project-single-image"
              : dashboardHero
              ? "project-dashboard-image"
              : anifouHero
              ? "project-single-image"
              : "project-strip"
          }
        >
          {project.images.map(
            (image, index) => (
              <button
                key={image}
                type="button"
                className="strip-button"
                onClick={() =>
                  onImageClick(image)
                }
              >
                <img
                  src={image}
                  alt=""
                  className={
                    heroImage
                      ? "single-image"
                      : dashboardHero
                      ? "dashboard-image"
                      : anifouHero
                      ? "single-image"
                      : project.title ===
                        "GIA PANTA"
                      ? `strip-image gia-image-${index}`
                      : "strip-image"
                  }
                />
              </button>
            )
          )}
        </div>
      )}
    </article>
  );
}