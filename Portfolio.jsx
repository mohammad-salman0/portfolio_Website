/**
 * Mohammad Salman — Portfolio
 * Single-file React component. Drop into any Vite/CRA project as App.jsx
 *
 * Dependencies needed in package.json:
 *   "react": "^18",
 *   "react-dom": "^18"
 *
 * Add to index.html <head>:
 *   <link rel="preconnect" href="https://fonts.googleapis.com" />
 *   <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
 *   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
 */

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES  (injected once into <head>)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0a; --bg2: #111111; --bg3: #1a1a1a;
    --border: rgba(255,255,255,0.08); --border2: rgba(255,255,255,0.14);
    --text: #f0ede8; --muted: #888880;
    --accent: #c8f060; --accent2: #60d4f0; --accent3: #f0a060;
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Mono', monospace;
    --font-serif: 'Instrument Serif', serif;
  }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg); color: var(--text);
    font-family: var(--font-body); font-size: 14px;
    line-height: 1.7; overflow-x: hidden; cursor: none;
  }
  a { text-decoration: none; }
  ul { list-style: none; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_LINKS = ["about", "skills", "experience", "projects", "education"];

const STATS = [
  { num: "8.56", label: "CGPA / 10" },
  { num: "2+", label: "Projects Shipped" },
  { num: "5+", label: "Technologies" },
  { num: "2", label: "Internships" },
];

const SKILLS = [
  {
    icon: "⚡",
    title: "Languages",
    tags: ["JavaScript ES6+", "Python", "Java", "C"],
  },
  {
    icon: "🎨",
    title: "Frontend",
    tags: ["React.js", "HTML5", "CSS3", "Responsive Design"],
  },
  {
    icon: "⚙️",
    title: "Backend",
    tags: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    icon: "🗄️",
    title: "Databases",
    tags: ["MongoDB", "Mongoose ODM", "MySQL"],
  },
  {
    icon: "🤖",
    title: "Machine Learning",
    tags: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Random Forest",
      "SVM",
    ],
  },
  {
    icon: "🛠️",
    title: "Tools & Concepts",
    tags: ["Git", "GitHub", "Postman", "VS Code", "MVC", "OOP", "DSA"],
  },
];

const EXPERIENCE = [
  {
    period: "Mar 2025 — Present",
    company: "Welocalize",
    role: "Ads Quality Rater — Freelance",
    bullets: [
      "Evaluated 100+ advertisements daily for relevance, accuracy, and policy compliance",
      "Analyzed user search intent to provide structured feedback improving ad targeting algorithms",
      "Maintained quality scores consistently above required thresholds across large-scale batches",
      "Developed strong understanding of how search engine ranking and ad relevance systems operate at scale",
    ],
  },
  {
    period: "Jan 2025 — Feb 2025",
    company: "IUST, J&K",
    role: "Machine Learning Intern",
    bullets: [
      "Designed and trained classification models (Logistic Regression, Random Forest, SVM) with measurable accuracy improvements",
      "Performed end-to-end preprocessing: handled missing values, encoded features, normalized datasets using Pandas & NumPy",
      "Conducted feature engineering and selection to reduce dimensionality and improve generalization",
      "Visualized model performance metrics (confusion matrix, ROC-AUC) using Matplotlib and Seaborn",
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    stack_label: "MERN Stack",
    title: "Halal-Aware Stock Exchange Platform",
    desc: "A full-stack stock tracking platform with integrated Shariah compliance screening that classifies stocks as halal or non-halal based on financial ratios. Features 15+ REST API endpoints, real-time data rendering, portfolio tracking dashboard, and JWT-based auth.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Auth",
      "REST API",
    ],
    github: "https://github.com/mohammad-salman0",
  },
  {
    num: "02",
    stack_label: "MERN Stack",
    title: "Inventory Management System",
    desc: "A role-based inventory platform supporting Admin, Manager, and Staff access levels with distinct permissions. Features full CRUD operations, real-time stock monitoring dashboard, low-stock alerts, and production-grade bcrypt authentication.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "RBAC", "bcrypt"],
    github: "https://github.com/mohammad-salman0",
  },
];

const EDUCATION = [
  {
    year: "Expected May 2026",
    degree: "B.Tech — Computer Science & Engineering",
    inst: "Islamic University of Science and Technology, J&K",
    score: "CGPA: 8.56 / 10",
  },
  {
    year: "2021",
    degree: "Class 12 — Science (PCM)",
    inst: "J&K Board of School Education",
    score: "Score: 90%",
  },
  {
    year: "2019",
    degree: "Class 10",
    inst: "J&K Board of School Education",
    score: "Score: 88%",
  },
];

const CONTACT_LINKS = [
  {
    label: "Email Me",
    href: "mailto:salmanmohammad339@gmail.com",
    icon: "email",
  },
  {
    label: "GitHub",
    href: "https://github.com/mohammad-salman0",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-salman-1479b4301/",
    icon: "linkedin",
  },
  { label: "+91 9622744436", href: "tel:+919622744436", icon: "phone" },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    el.classList.add("reveal");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      const { x, y } = pos.current;
      pos.current.rx += (x - pos.current.rx) * 0.12;
      pos.current.ry += (y - pos.current.ry) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = x + "px";
        cursorRef.current.style.top = y + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + "px";
        ringRef.current.style.top = pos.current.ry + "px";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return { cursorRef, ringRef };
}

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const ICON_MAP = {
  email: EmailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  phone: PhoneIcon,
};

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "11px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--accent)",
      marginBottom: "0.75rem",
    }}
  >
    <span style={{ fontFamily: "var(--font-body)", opacity: 0.7 }}>//</span>{" "}
    {children}
  </p>
);

const Tag = ({ label }) => {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${hov ? "var(--accent)" : "var(--border)"}`,
        color: hov ? "var(--accent)" : "var(--muted)",
        padding: "0.2rem 0.6rem",
        borderRadius: "2px",
        fontSize: "11px",
        transition: "all 0.2s",
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
};

/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
const Cursor = () => {
  const { cursorRef, ringRef } = useCursor();
  const style = {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translate(-50%,-50%)",
    mixBlendMode: "difference",
  };
  return (
    <>
      <div
        ref={cursorRef}
        style={{
          ...style,
          width: 10,
          height: 10,
          background: "var(--accent)",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...style,
          width: 36,
          height: 36,
          border: "1px solid var(--accent)",
          zIndex: 9998,
          opacity: 0.5,
          transition: "none",
        }}
      />
    </>
  );
};

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
const Nav = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((id) =>
        document.getElementById(id),
      ).filter(Boolean);
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 130) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 3rem",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s",
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: "var(--font-head)",
          fontSize: "1.1rem",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--text)",
        }}
      >
        MS<span style={{ color: "var(--accent)" }}>.</span>
      </a>
      <ul style={{ display: "flex", gap: "2rem" }}>
        {NAV_LINKS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={{
                color: active === id ? "var(--text)" : "var(--muted)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
            >
              {id}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="mailto:salmanmohammad339@gmail.com"
        style={{
          background: "var(--accent)",
          color: "#0a0a0a",
          padding: "0.5rem 1.2rem",
          borderRadius: "2px",
          fontFamily: "var(--font-head)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          transition: "transform 0.15s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.background = "#d4f570";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.background = "var(--accent)";
        }}
      >
        Hire Me →
      </a>
    </nav>
  );
};

/* ─────────────────────────────────────────────
   HERO — Terminal Card
───────────────────────────────────────────── */
const TerminalCard = () => (
  <div
    style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        background: "var(--bg3)",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {[
        ["#ff5f57", "r"],
        ["#febc2e", "y"],
        ["#28c840", "g"],
      ].map(([c, k]) => (
        <div
          key={k}
          style={{ width: 10, height: 10, borderRadius: "50%", background: c }}
        />
      ))}
      <span
        style={{ fontSize: "11px", color: "var(--muted)", margin: "0 auto" }}
      >
        ~/mohammad-salman
      </span>
    </div>
    <div style={{ padding: "1.5rem", fontSize: 12, lineHeight: 2 }}>
      {[
        { prompt: true, text: "cat developer.json" },
        { out: true, text: "{" },
        {
          out: true,
          text: (
            <>
              <span style={{ color: "var(--accent2)" }}> "name"</span>:{" "}
              <span style={{ color: "var(--accent3)" }}>
                {" "}
                "Mohammad Salman"
              </span>
              ,
            </>
          ),
        },
        {
          out: true,
          text: (
            <>
              <span style={{ color: "var(--accent2)" }}> "role"</span>:{" "}
              <span style={{ color: "var(--accent3)" }}>
                {" "}
                "Full Stack Developer"
              </span>
              ,
            </>
          ),
        },
        {
          out: true,
          text: (
            <>
              <span style={{ color: "var(--accent2)" }}> "stack"</span>:{" "}
              <span style={{ color: "var(--accent3)" }}>
                {" "}
                ["MERN", "REST APIs"]
              </span>
              ,
            </>
          ),
        },
        {
          out: true,
          text: (
            <>
              <span style={{ color: "var(--accent2)" }}> "cgpa"</span>:{" "}
              <span style={{ color: "var(--accent3)" }}> 8.56</span>,
            </>
          ),
        },
        {
          out: true,
          text: (
            <>
              <span style={{ color: "var(--accent2)" }}> "status"</span>:{" "}
              <span style={{ color: "var(--accent3)" }}> "open_to_work"</span>
            </>
          ),
        },
        { out: true, text: "}" },
        { prompt: true, cursor: true, text: "" },
      ].map((line, i) => (
        <div key={i} style={{ display: "flex", gap: "0.75rem" }}>
          {line.prompt && (
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>$</span>
          )}
          {!line.prompt && !line.out && null}
          <span
            style={{
              color: line.prompt ? "var(--text)" : "var(--muted)",
              paddingLeft: line.out ? "1rem" : 0,
            }}
          >
            {line.text}
            {line.cursor && (
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 14,
                  background: "var(--accent)",
                  animation: "blink 1s infinite",
                  verticalAlign: "text-bottom",
                }}
              />
            )}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const Hero = () => (
  <section
    id="hero"
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      paddingTop: "5rem",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* BG grid */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(200,240,96,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,240,96,0.03) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle,rgba(200,240,96,0.06) 0%,transparent 70%)",
        top: -100,
        right: -100,
        zIndex: 0,
      }}
    />

    <div
      className="container"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 3rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
      }}
    >
      <div style={{ animation: "fadeUp 0.8s ease both" }}>
        {/* Available badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(200,240,96,0.08)",
            border: "1px solid rgba(200,240,96,0.2)",
            padding: "0.35rem 0.9rem",
            borderRadius: 2,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: "var(--accent)",
              borderRadius: "50%",
              animation: "blink 1.5s infinite",
            }}
          />
          Available for work
        </div>

        <h1
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "clamp(2.8rem,5vw,4.2rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}
        >
          Full Stack
          <br />
          <em
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--accent)",
            }}
          >
            Developer
          </em>
          <br />
          &amp; Engineer
        </h1>

        <p
          style={{
            color: "var(--muted)",
            fontSize: 13,
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            maxWidth: 460,
          }}
        >
          Final-year CS student building scalable MERN stack applications and
          REST APIs. Passionate about clean architecture, production-ready code,
          and systems that just work.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Btn href="#projects" primary>
            View Projects →
          </Btn>
          <Btn href="#contact">Get in Touch</Btn>
        </div>
      </div>

      <div style={{ animation: "fadeUp 0.8s 0.2s ease both" }}>
        <TerminalCard />
      </div>
    </div>
  </section>
);

/* Small reusable button */
const Btn = ({ href, children, primary }) => {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.8rem",
    borderRadius: 2,
    fontFamily: "var(--font-head)",
    fontWeight: primary ? 700 : 600,
    fontSize: 13,
    letterSpacing: "0.04em",
    transition: "all 0.15s",
  };
  const styles = primary
    ? {
        ...base,
        background: hov ? "#d4f570" : "var(--accent)",
        color: "#0a0a0a",
        transform: hov ? "translateY(-2px)" : "none",
      }
    : {
        ...base,
        border: "1px solid var(--border2)",
        color: "var(--text)",
        background: hov ? "var(--bg3)" : "transparent",
      };
  return (
    <a
      href={href}
      style={styles}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
};

/* ─────────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────────── */
const StatsStrip = () => (
  <div
    style={{
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg2)",
    }}
  >
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 3rem",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "1.5rem 2rem",
            borderRight: i < 3 ? "1px solid var(--border)" : "none",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "2.4rem",
              fontWeight: 800,
              color: "var(--accent)",
              display: "block",
              lineHeight: 1,
            }}
          >
            {s.num}
          </span>
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: "0.4rem",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
const InfoCard = ({ label, value, accent }) => (
  <div
    style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: 6,
      padding: "1.25rem 1.5rem",
      marginBottom: "0.75rem",
    }}
  >
    <div
      style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "var(--muted)",
        marginBottom: "0.4rem",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: "var(--font-head)",
        fontSize: "0.95rem",
        fontWeight: 600,
        color: accent ? "var(--accent)" : "var(--text)",
      }}
    >
      {value}
    </div>
  </div>
);

const About = () => {
  const ref = useReveal();
  return (
    <section id="about" style={{ padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div ref={ref}>
          <SectionLabel>About Me</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            Who I{" "}
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--muted)",
              }}
            >
              am
            </em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 2fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            <div>
              {[
                <>
                  I'm a final-year{" "}
                  <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                    Computer Science &amp; Engineering
                  </strong>{" "}
                  student at the Islamic University of Science and Technology,
                  Srinagar — maintaining a CGPA of 8.56 while building
                  real-world software.
                </>,
                <>
                  My focus is{" "}
                  <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                    full-stack web development
                  </strong>{" "}
                  with the MERN stack. I care deeply about clean API design,
                  secure authentication flows, and applications that are
                  deployable — not just demo-ready.
                </>,
                <>
                  Beyond web dev, I've explored{" "}
                  <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                    machine learning
                  </strong>{" "}
                  through a hands-on internship at IUST — training
                  classification models end-to-end from raw data to evaluation
                  and visualization.
                </>,
                <>
                  Currently freelancing as an Ads Quality Rater at{" "}
                  <strong style={{ color: "var(--text)", fontWeight: 400 }}>
                    Welocalize
                  </strong>
                  , giving me a unique perspective on large-scale search and ad
                  ranking systems.
                </>,
              ].map((text, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.9,
                    marginBottom: "1rem",
                    fontSize: 13.5,
                  }}
                >
                  {text}
                </p>
              ))}
              <ul style={{ marginTop: "2rem" }}>
                {[
                  "MERN Stack — MongoDB, Express.js, React.js, Node.js",
                  "REST API Design & JWT Authentication",
                  "Machine Learning with Scikit-learn, Pandas, NumPy",
                  "Data Structures & Algorithms",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: 12,
                      color: "var(--muted)",
                    }}
                  >
                    <span style={{ color: "var(--accent)" }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <InfoCard label="Location" value="Srinagar, J&K, India" />
              <div
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "1.25rem 1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Email
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  <a
                    href="mailto:salmanmohammad339@gmail.com"
                    style={{ color: "var(--accent2)" }}
                  >
                    salmanmohammad339@gmail.com
                  </a>
                </div>
              </div>
              <div
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "1.25rem 1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  GitHub
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  <a
                    href="https://github.com/mohammad-salman0"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent2)" }}
                  >
                    github.com/mohammad-salman0
                  </a>
                </div>
              </div>
              <div
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "1.25rem 1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  LinkedIn
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  <a
                    href="https://www.linkedin.com/in/mohammad-salman-1479b4301/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent2)" }}
                  >
                    linkedin.com/in/mohammad-salman
                  </a>
                </div>
              </div>
              <InfoCard label="Status" value="● Open to Work" accent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
const SkillCard = ({ icon, title, tags }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--bg)",
        border: `1px solid ${hov ? "var(--border2)" : "var(--border)"}`,
        borderRadius: 6,
        padding: "1.5rem",
        transform: hov ? "translateY(-3px)" : "none",
        transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{icon}</div>
      <div
        style={{
          fontFamily: "var(--font-head)",
          fontSize: "0.85rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--text)",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useReveal();
  return (
    <section
      id="skills"
      style={{ padding: "6rem 0", background: "var(--bg2)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div ref={ref}>
          <SectionLabel>Technical Skills</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            What I{" "}
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--muted)",
              }}
            >
              build with
            </em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1.5rem",
            }}
          >
            {SKILLS.map((s) => (
              <SkillCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────── */
const ExpItem = ({ period, company, role, bullets }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        border: `1px solid ${hov ? "var(--border2)" : "var(--border)"}`,
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: "1rem",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          background: "var(--bg2)",
          padding: "1.5rem",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: "0.06em",
          }}
        >
          {period}
        </div>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {company}
        </div>
      </div>
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}
        >
          {role}
        </div>
        <ul>
          {bullets.map((b, i) => (
            <li
              key={i}
              style={{
                padding: "0.3rem 0",
                fontSize: 12.5,
                color: "var(--muted)",
                display: "flex",
                gap: "0.75rem",
              }}
            >
              <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  const ref = useReveal();
  return (
    <section id="experience" style={{ padding: "6rem 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div ref={ref}>
          <SectionLabel>Work Experience</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            Where I've{" "}
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--muted)",
              }}
            >
              worked
            </em>
          </h2>
          {EXPERIENCE.map((e) => (
            <ExpItem key={e.company} {...e} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
const ProjectCard = ({ num, stack_label, title, desc, tags, github }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--bg2)",
        border: `1px solid ${hov ? "var(--border2)" : "var(--border)"}`,
        borderRadius: 8,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all 0.25s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "var(--accent)",
          transform: hov ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.35s",
        }}
      />

      <div
        style={{
          fontSize: 11,
          color: "var(--muted)",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
        }}
      >
        {num} — {stack_label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-head)",
          fontSize: "1.2rem",
          fontWeight: 800,
          color: "var(--text)",
          marginBottom: "0.75rem",
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontSize: 12.5,
          color: "var(--muted)",
          lineHeight: 1.8,
          flex: 1,
          marginBottom: "1.5rem",
        }}
      >
        {desc}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4rem",
          marginBottom: "1.5rem",
        }}
      >
        {tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <GithubIcon /> GitHub
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const ref = useReveal();
  return (
    <section
      id="projects"
      style={{ padding: "6rem 0", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div ref={ref}>
          <SectionLabel>Projects</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            Things I've{" "}
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--muted)",
              }}
            >
              built
            </em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            {PROJECTS.map((p) => (
              <ProjectCard key={p.num} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   EDUCATION
───────────────────────────────────────────── */
const EduCard = ({ year, degree, inst, score }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--bg)",
        border: `1px solid ${hov ? "var(--border2)" : "var(--border)"}`,
        borderRadius: 6,
        padding: "1.75rem",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "var(--accent)",
          letterSpacing: "0.08em",
          marginBottom: "0.5rem",
        }}
      >
        {year}
      </div>
      <div
        style={{
          fontFamily: "var(--font-head)",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--text)",
          lineHeight: 1.3,
          marginBottom: "0.5rem",
        }}
      >
        {degree}
      </div>
      <div
        style={{ fontSize: 12, color: "var(--muted)", marginBottom: "1rem" }}
      >
        {inst}
      </div>
      <span
        style={{
          display: "inline-block",
          background: "rgba(200,240,96,0.1)",
          border: "1px solid rgba(200,240,96,0.25)",
          color: "var(--accent)",
          padding: "0.25rem 0.75rem",
          borderRadius: 2,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {score}
      </span>
    </div>
  );
};

const Education = () => {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <section
      id="education"
      style={{ padding: "6rem 0", background: "var(--bg2)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 3rem" }}>
        <div ref={ref}>
          <SectionLabel>Education</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "3rem",
            }}
          >
            Where I{" "}
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--muted)",
              }}
            >
              learned
            </em>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1.5rem",
            }}
          >
            {EDUCATION.map((e) => (
              <EduCard key={e.year} {...e} />
            ))}
          </div>
        </div>

        {/* Certification */}
        <div ref={ref2} style={{ marginTop: "3rem" }}>
          <SectionLabel>Certifications</SectionLabel>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "1.5rem 2rem",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: "rgba(200,240,96,0.1)",
                border: "1px solid rgba(200,240,96,0.2)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              🏆
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "0.25rem",
                }}
              >
                Full Stack Web Development
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                Apna College · 6-month MERN stack curriculum with real-world
                projects
              </div>
            </div>
            <div
              style={{ fontSize: 11, color: "var(--accent)", flexShrink: 0 }}
            >
              2024
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
const Contact = () => {
  const ref = useReveal();
  return (
    <section
      id="contact"
      style={{
        padding: "8rem 0",
        background: "var(--bg)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "0 3rem" }}>
        <div ref={ref}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ opacity: 0.7 }}>//</span> Get In Touch
          </div>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Let's{" "}
            <em
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--muted)",
              }}
            >
              work together
            </em>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              fontSize: 13.5,
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}
          >
            I'm actively looking for full-time software engineering roles and
            open to freelance projects. Whether you have a position, a project,
            or just want to connect — my inbox is always open.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {CONTACT_LINKS.map(({ label, href, icon }) => {
              const Icon = ICON_MAP[icon];
              return (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "0.75rem 1.5rem",
                    color: "var(--text)",
                    fontSize: 12.5,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "rgba(200,240,96,0.05)";
                    e.currentTarget.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--bg2)";
                    e.currentTarget.style.color = "var(--text)";
                  }}
                >
                  <Icon /> {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const Footer = () => (
  <footer
    style={{
      borderTop: "1px solid var(--border)",
      padding: "1.5rem 3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 11,
      color: "var(--muted)",
    }}
  >
    <span>© 2025 Mohammad Salman. Built with React.</span>
    <span>Srinagar, J&K, India</span>
  </footer>
);

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  // Inject global styles once
  useEffect(() => {
    const existing = document.getElementById("portfolio-global-css");
    if (existing) return;
    const style = document.createElement("style");
    style.id = "portfolio-global-css";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
