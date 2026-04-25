/* global React, IMG */
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

// ---------- Nav ----------
function Nav({ route, go, theme, setTheme }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-logo" onClick={(e) => { e.preventDefault(); go("home"); }} href="#">
          <span className="mark">P</span>
          <span>Payge <em style={{ fontStyle: "italic", color: "var(--fg-soft)" }}>Kerman</em></span>
        </a>
        <div className="nav-links">
          {items.map((it) => (
            <button
              key={it.id}
              className={route === it.id ? "active" : ""}
              onClick={() => go(it.id)}
            >
              {it.label}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--fg-soft)", textTransform: "uppercase" }}>
            {theme === "dark" ? "Dark" : "Light"}
          </span>
          <button
            className="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span className="knob"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// ---------- Cursor-follow image reveal (work list) ----------
function CursorImage({ src, active }) {
  const ref = useRefC(null);
  useEffectC(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.left = x + "px";
      el.style.top = y + "px";
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className={"cursor-img" + (active && src ? " visible" : "")}>
      {src ? <img src={src} alt="" /> : null}
    </div>
  );
}

// ---------- Scroll reveal ----------
function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const ref = useRefC(null);
  const [v, setV] = useStateC(false);
  useEffectC(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={"reveal " + (v ? "in " : "") + className}
      style={{ transitionDelay: (delay || 0) + "ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ---------- Metric counter (animated on reveal) ----------
function Metric({ n, l }) {
  return (
    <div className="metric">
      <span className="n serif">{n}</span>
      <div className="l">{l}</div>
    </div>
  );
}

Object.assign(window, { Nav, CursorImage, Reveal, Metric });
