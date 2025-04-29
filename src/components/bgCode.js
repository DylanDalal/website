const bgCode = `
const introTiles = [
  {
    id: 1,
    size: "wide",
    content: (
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        textAlign: "left",
        width: "100%",
        height: "100%",
      }}>
        <h2>Hello, I’m Dylan Dalal</h2>
        <p>Welcome to my web development portfolio!</p>
      </div>
    ),
  },
  {
    id: 2,
    size: "tall",
    content: (
      <blockquote>
        I build websites with clear, coherent messaging and a strong focus on brand identity.
      </blockquote>
    ),
  },
  {
    id: 3,
    size: "square",
    content: <img src={reactLogo} alt="React" />,
  },
  {
    id: 4,
    size: "square",
    content: <img src={framer} alt="Framer" />,
  },

function WebCard({ project }) {
  const revealRef = useReveal();

  return (
    <article ref={revealRef} className="web-card">
      <div className="web-card__preview">
        {project.embed ? (
          <SitePreview
            src={project.embed}
            title={project.name}
            width={400}
            height={225}
          />
        ) : (
          <div className="scroll-preview">
            <img src={kofskyShot} alt={\`\${project.name} preview\`} />
          </div>
        )}
      </div>

      <div className="web-card__body">
        <div className="tech-logos" style={{ justifyContent: "left" }}>
          {project.tech.map(
            (t) =>
              logos[t] && (
                <img
                  key={t}
                  src={logos[t]}
                  alt={t}
                  className="tech-logo"
                  style={{ opacity: ".8", maxWidth: "70px" }}
                />
              )
          )}
        </div>

        <h2 className="web-card__title" style={{ margin: "0", padding: "0" }}>
          {project.name}
        </h2>
        <p className="web-card__desc">{project.description}</p>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="web-card__link"
        >
          Visit live site →
        </a>
      </div>
    </article>
  );
}
`;

export default bgCode;
