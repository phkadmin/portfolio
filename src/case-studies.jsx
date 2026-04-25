/* global React, WORK, CASE_DETAILS, IMG, Reveal, Metric */
const { useEffect: useEffectCS } = React;

function CaseStudy({ id, go }) {
  const d = CASE_DETAILS[id];
  useEffectCS(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [id]);
  if (!d) return null;
  const idx = WORK.findIndex((w) => w.id === id);
  const next = WORK[(idx + 1) % WORK.length];

  return (
    <div>
      <section className="cs-hero">
        <div className="wrap">
          <div className="cs-crumbs">
            <a onClick={(e)=>{e.preventDefault();go("home");}} href="#">Index</a>
            <span className="sep">/</span>
            <a onClick={(e)=>{e.preventDefault();go("home");}} href="#">Work</a>
            <span className="sep">/</span>
            <span>{d.kicker}</span>
          </div>
          <h1 className="cs-title">
            {d.title} <em>{d.titleEm}</em>
          </h1>
          <div className="cs-meta-grid">
            {d.meta.map((m, i) => (
              <div key={i}>
                <div className="k">{m.k}</div>
                <div className="v">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="cs-metrics">
          {d.metrics.map((m, i) => (
            <Reveal key={i} delay={i * 80} className="m">
              <span className="n">{m.n.includes("$") || m.n.includes("%") || m.n.includes("+") || m.n.includes("–")
                ? <><em>{m.n.charAt(0)}</em>{m.n.slice(1)}</>
                : m.n}</span>
              <div className="l">{m.l}</div>
            </Reveal>
          ))}
        </div>

        {d.sections.map((s, i) => (
          <div className="cs-body" key={i}>
            <div className="k">{s.k}</div>
            <div className="v">
              {s.v.map((p, j) => <p key={j}>{p}</p>)}
            </div>
          </div>
        ))}

        <div className="cs-next" onClick={() => go(`cs:${next.id}`)}>
          <div>
            <div className="small">Next Case Study →</div>
            <div className="big serif">{next.title} <em>{next.titleEm}</em></div>
          </div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 60 }}>→</div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CaseStudy });
