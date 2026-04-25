/* global React, IMG, TAGS, WORK, PRINCIPLES, ABOUT_COPY, Reveal, Metric, CursorImage */
const { useState: useStateP, useEffect: useEffectP } = React;

// ---------- Home ----------
function Home({ go }) {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-meta">
            <div className="left">Payge H. Kerman — Portfolio</div>
            <div className="seal">P<span style={{ fontSize: 12 }}>*</span>K</div>
            <div className="right">Salt Lake City, UT</div>
          </div>

          <h1 className="hero-headline">
            <span className="line"><em>Own</em> The</span>
            <span className="line">Problem. <em>Ship</em></span>
            <span className="line">The Solution.</span>
          </h1>

          <div className="hero-sub-grid">
            <div className="hero-intro">
              Hey. I'm Payge — a <b>Product &amp; Design executive</b> building products, systems, and teams that scale <i>together</i>. I lead with the belief that utility is the shortest path to revenue.
            </div>
            <div className="hero-side">
              <div className="row"><b>Open to</b><span>VP, Product &amp; Design</span></div>
              <div className="row"><b>Now</b><span>Leading Design @ Flex</span></div>
              <div className="row"><b>Prev.</b><span>Weave · Fivetran · Wink</span></div>
              <div className="row"><b>Based</b><span>Salt Lake City, UT</span></div>
              <div className="row"><b>Writes</b><span>In plain language, on purpose</span></div>
            </div>
          </div>
        </div>

        {/* Tag masthead — six identities, set as a typographic table */}
        <div className="tags-masthead">
          <div className="wrap">
            <div className="tags-rule">
              <span className="mono">A Few Hats / Six Modes</span>
              <span className="mono">N°01 — 06</span>
            </div>
            <ol className="tags-stack">
              {TAGS.map((t, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <li key={i} className="tag-row">
                    <span className="tag-num mono">{num}</span>
                    <span className="tag-label serif">
                      <em>{t.split(" ")[0]}</em>{t.split(" ").slice(1).length ? " " + t.split(" ").slice(1).join(" ") : ""}
                    </span>
                    <span className="tag-rule" aria-hidden></span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Photo montage */}
        <div className="wrap">
          <div className="montage">
            <div className="cell c1"><img src={IMG.desk} alt="" /><div className="caption">Wedding flowers</div></div>
            <div className="cell c2"><img src={IMG.screen1} alt="" /><div className="caption">View from home</div></div>
            <div className="cell c3"><img src={IMG.field} alt="" /><div className="caption">My people</div></div>
            <div className="cell c4"><img src={IMG.light} alt="" /><div className="caption">Off the clock</div></div>
            <div className="cell c5"><img src={IMG.screen2} alt="" /><div className="caption">Onsite</div></div>
            <div className="cell c6"><img src={IMG.horse} alt="" /><div className="caption">Holiday flavors</div></div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="wrap">
          <div className="section-head">
            <h2>Notable <em>Work.</em></h2>
            <div className="meta">
              <span>Selected / 2022 — Present</span>
              <span>Four Case Studies</span>
            </div>
          </div>

          <div className="work-list">
            {WORK.map((w, i) => (
              <Reveal
                key={w.id}
                as="article"
                className={"work-item" + (w.flex ? " flex" : "") + (w.locked ? " locked" : "")}
                onClick={() => { if (!w.locked) go(`cs:${w.id}`); }}
              >
                <div className="num">{w.num}</div>
                <div className="body">
                  <div className="kicker">
                    {w.tags.map((t, j) => <span key={j} className="pill">{t}</span>)}
                  </div>
                  <h3>
                    {w.title} <em>{w.titleEm}</em>
                  </h3>
                  <div className="desc">{w.desc}</div>
                  <div className="metrics">
                    {w.metrics.map((m, j) => <Metric key={j} {...m} />)}
                  </div>
                </div>
                <div className="arrow serif italic" aria-hidden>
                  {w.locked ? <span className="soon mono">Coming Soon</span> : <span>→</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPETENCIES */}
      <Competencies />

      {/* PRINCIPLES */}
      <section className="principles" id="principles">
        <div className="wrap">
          <div className="label">Principles — Lessons That Stuck</div>
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="principle">
              <div className="n">{p.n}</div>
              <h3>{p.title} <em>{p.em}</em></h3>
              <div className="p">{p.body}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------- Competencies ----------
function Competencies() {
  const groups = [
    {
      k: "Practice",
      items: ["Product Strategy", "0→1 & Scale", "Design Systems", "UX Research", "Performance Mgmt"],
    },
    {
      k: "Tools",
      items: ["Figma", "Amplitude", "Snowflake", "SQL", "Linear", "Notion"],
    },
    {
      k: "AI in the loop",
      items: ["Claude Code", "Codex", "Early ideation", "Visual QA", "Spec drafting"],
    },
  ];
  return (
    <section className="competencies">
      <div className="wrap">
        <div className="section-head">
          <h2>The <em>Toolkit.</em></h2>
          <div className="meta">
            <span>Capabilities</span>
            <span>Practice + Tools + AI</span>
          </div>
        </div>
        <p className="comp-lede serif">
          My team and I run AI <em>through</em> our process — not next to it. Claude Code and Codex are part of the daily loop, especially for <em>early ideation and visual QA</em>. The point isn't speed for speed's sake. It's getting more shots on goal at the moments they matter.
        </p>
        <div className="comp-grid">
          {groups.map((g) => (
            <div className="comp-col" key={g.k}>
              <div className="comp-k">{g.k}</div>
              <ul className="comp-list">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- About ----------
function About() {
  return (
    <div>
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="hero-meta">
            <div className="left">About</div>
            <div className="seal">P<span style={{ fontSize: 12 }}>*</span>K</div>
            <div className="right">Payge Hooper Kerman</div>
          </div>
          <h1 className="hero-headline">
            <span className="line">Details are</span>
            <span className="line">where <em>values</em></span>
            <span className="line">become real.</span>
          </h1>
        </div>
      </section>

      <section className="wrap">
        <div className="about-grid">
          <div className="about-photos">
            <div className="cell tall"><img src={IMG.a1} alt="" /></div>
            <div className="cell"><img src={IMG.a2} alt="" /></div>
            <div className="cell"><img src={IMG.a3} alt="" /></div>
            <div className="cell"><img src={IMG.a4} alt="" /></div>
            <div className="cell tall"><img src={IMG.a5} alt="" /></div>
            <div className="cell"><img src={IMG.a6} alt="" /></div>
          </div>
          <div className="about-copy about-copy-body">
            {ABOUT_COPY.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="principles">
        <div className="wrap">
          <div className="label">Three Principles</div>
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="principle">
              <div className="n">{p.n}</div>
              <h3>{p.title} <em>{p.em}</em></h3>
              <div className="p">{p.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="montage" style={{ gridAutoRows: 260 }}>
          <div className="cell c1"><img src={IMG.a7} alt="" /></div>
          <div className="cell c2"><img src={IMG.a8} alt="" /></div>
          <div className="cell c3"><img src={IMG.a9} alt="" /></div>
          <div className="cell c4"><img src={IMG.a10} alt="" /></div>
          <div className="cell c5"><img src={IMG.a11} alt="" /></div>
          <div className="cell c6"><img src={IMG.a12} alt="" /></div>
        </div>
      </section>
    </div>
  );
}

// ---------- Contact (footer) ----------
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <h2>Say <em>Hey.</em></h2>
        <div className="contact-actions">
          <a className="btn" href="mailto:paygehooperkerman@gmail.com?subject=Hey%20Payge!">
            Email Me <span className="arr">→</span>
          </a>
          <a className="btn ghost" href="tel:3039061664">
            Call Me <span className="arr">→</span>
          </a>
        </div>
        <div className="contact-grid">
          <div className="col">
            <h4>Elsewhere</h4>
            <div className="line"><a href="https://linkedin.com/in/phkerman" target="_blank" rel="noopener">LinkedIn →</a></div>
          </div>
          <div className="col">
            <h4>Open To</h4>
            <div className="line">Executive design &amp; product roles</div>
            <div className="line">Advisory / fractional leadership</div>
            <div className="line">A really good coffee in SLC</div>
          </div>
        </div>
        <div className="footnote">
          <span>© {new Date().getFullYear()} · Payge Kerman</span>
          <span>Designed in Salt Lake City, by me — of course.</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Home, About, Contact });
