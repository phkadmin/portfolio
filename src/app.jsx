/* global React, ReactDOM, Nav, Home, About, Contact, CaseStudy, CursorImage */
const { useState: useStateA, useEffect: useEffectA } = React;

function App() {
  const [route, setRoute] = useStateA(() => {
    const h = window.location.hash.slice(1);
    return h || "home";
  });
  const [theme, setTheme] = useStateA(() => {
    return localStorage.getItem("pk-theme") || "dark";
  });

  useEffectA(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pk-theme", theme);
  }, [theme]);

  useEffectA(() => {
    window.location.hash = route;
  }, [route]);

  useEffectA(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const isCS = route.startsWith("cs:");
  const csId = isCS ? route.slice(3) : null;

  return (
    <React.Fragment>
      <Nav route={isCS ? "work" : route} go={go} theme={theme} setTheme={setTheme} />
      <main data-screen-label={`page / ${route}`}>
        {isCS ? (
          <CaseStudy id={csId} go={go} />
        ) : route === "about" ? (
          <About />
        ) : route === "contact" ? (
          <div style={{ minHeight: "30vh" }} />
        ) : route === "work" ? (
          <Home go={go} />
        ) : (
          <Home go={go} />
        )}
        <Contact />
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
