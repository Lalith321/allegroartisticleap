import {
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  forwardRef,
  Dispatch,
  SetStateAction,
} from "react";
import "./LandingPage.css";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArtstation,
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faArrowUpRightFromSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import HeroSection from "./HeroSection";
import ParallaxBackground from "../components/ParallaxBackground";
import skillsData from "../data/skills.json";
import projects3d from "../data/projects-3d.json";
import projectsAI from "../data/projects-ai.json";
import projectsArt from "../data/projects-art.json";
import projectsCode from "../data/projects-code.json";

type ProjectCard = {
  title: string;
  description: string;
  image: string;
  link: string;
  linkLabel: string;
};

type SkillItem = { name: string; level: string; proficiency: number };

const TABS = [
  { id: "3d",   label: "3D Environments",         eyebrow: "Blender · Unreal · Sculpting", data: projects3d   },
  { id: "ai",   label: "Artificial Intelligence", eyebrow: "Deep Learning · CNNs · Gen AI", data: projectsAI   },
  { id: "art",  label: "Digital Art",             eyebrow: "Portraits · Concept · Logo",    data: projectsArt  },
  { id: "code", label: "Programming",             eyebrow: "Python · C++ · React · Java",   data: projectsCode },
] as const;

/* ── Fade Section Wrapper (forwards ref) ───────────────────── */
const FadeSection = forwardRef<HTMLElement, {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>(({ children, className = "", delay = 0 }, forwardedRef) => {
  const innerRef = useRef<HTMLElement>(null);
  const isInView = useInView(innerRef, {
    once: true,
    amount: "some",
    margin: "-5% 0px -5% 0px",
  });

  useEffect(() => {
    if (!forwardedRef) return;
    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = innerRef.current;
    }
  }, [forwardedRef]);

  return (
    <motion.section
      ref={innerRef}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
});
FadeSection.displayName = "FadeSection";

/* ── Skill Bar ─────────────────────────────────────────────── */
const SkillBar: FunctionComponent<{ item: SkillItem; alt?: boolean }> = ({ item, alt }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const width = useMotionValue(0);
  const widthPct = useTransform(width, (v) => `${v}%`);

  useEffect(() => {
    if (inView) animate(width, item.proficiency, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
  }, [inView, item.proficiency, width]);

  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-text">
        <span className="skill-name">{item.name}</span>
        <span className="skill-level">{item.level}</span>
      </div>
      <div className="skill-meter">
        <motion.div
          className={`skill-meter-fill${alt ? " skill-meter-fill--alt" : ""}`}
          style={{ width: widthPct }}
        />
      </div>
    </div>
  );
};

/* ── Social Panel ──────────────────────────────────────────── */
const SocialPanel: FunctionComponent<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const socials = [
    { href: "https://github.com/Lalith321",                          icon: faGithub,     label: "GitHub"     },
    { href: "https://www.instagram.com/allegroartisticleap/",        icon: faInstagram,  label: "Instagram"  },
    { href: "https://www.linkedin.com/in/a-lalith-kumar-66606517a/", icon: faLinkedin,   label: "LinkedIn"   },
    { href: "https://www.artstation.com/lalith321",                  icon: faArtstation, label: "ArtStation" },
    { href: "https://g.dev/lalith321",                               icon: faGoogle,     label: "Google Dev" },
    { href: "tel:+919840403254",                                     icon: faPhone,      label: "Phone"      },
    { href: "mailto:adhimulamlalith22@gmail.com",                    icon: faEnvelope,   label: "Email"      },
  ];

  return (
    <div
      className="social-zone"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.div
        className="social-panel"
        animate={{ x: open ? 0 : "calc(100% - 28px)" }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <div className="social-panel__tab">
          {"CONTACT".split("").map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>
        <div className="social-panel__icons">
          {socials.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              className="social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
            >
              <FontAwesomeIcon icon={icon} size="lg" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ── Main Page ───────────────────────────────────────────────── */
const WebPage: FunctionComponent = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("3d");
  const [contactOpen, setContactOpen] = useState(false);

  const aboutRef      = useRef<HTMLElement>(null);
  const skillsRef     = useRef<HTMLElement>(null);
  const aboutLeftRef  = useRef<HTMLDivElement>(null);
  const aboutRightRef = useRef<HTMLDivElement>(null);

  const skillsInView     = useInView(skillsRef,     { once: true, amount: "some", margin: "-5% 0px -5% 0px" });
  const aboutLeftInView  = useInView(aboutLeftRef,  { once: true, amount: "some", margin: "-5% 0px -5% 0px" });
  const aboutRightInView = useInView(aboutRightRef, { once: true, amount: "some", margin: "-5% 0px -5% 0px" });

  const activeProjects = TABS.find((t) => t.id === activeTab)!.data as ProjectCard[];
  const { scrollYProgress } = useScroll();

  return (
    <div className="landingpage-parent">
      <ParallaxBackground scrollProgress={scrollYProgress} />
      <SocialPanel open={contactOpen} setOpen={setContactOpen} />
      <HeroSection />

      <main className="page-main">
        {/* ── About ── */}
        <FadeSection className="aboutwhole" ref={aboutRef}>
          <motion.div
            ref={aboutLeftRef}
            className="about-left-panel"
            initial={{ opacity: 0, x: -40 }}
            animate={aboutLeftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="about-eyebrow">About me</span>
            <h2 className="about-heading">
              Where code meets<br />creative vision.
            </h2>
            <p className="aboutcontent">
              A versatile professional with a solid foundation in computer science —
              encompassing data science, machine learning, and Google Cloud certifications.
              Specialising in convolutional neural networks, generative AI, and deep learning.
              On the creative side, proficient in digital art, 3D modelling, and animations.
              The fusion of technical expertise and creative flair defines every project.
            </p>
            <a
              href="/allegroartisticleap/LalithResume.pdf"
              className="about-resume-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Résumé →
            </a>
          </motion.div>

          <motion.div
            ref={aboutRightRef}
            className="about-right-panel"
            initial={{ opacity: 0, x: 40 }}
            animate={aboutRightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <img
              className="profilepic"
              alt="Lalith Kumar"
              src="/allegroartisticleap/ProfilePic.png"
            />
          </motion.div>
        </FadeSection>

        {/* ── Projects ── */}
        <FadeSection className="work-section" delay={0.05}>
          <div className="work-header">
            <span className="work-eyebrow">Selected Work</span>
            <h2 className="work-heading">Projects across disciplines</h2>
          </div>

          <div className="work-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`work-tab${activeTab === tab.id ? " work-tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div className="work-tab__underline" layoutId="tab-underline" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="work-section__grid"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: "easeInOut" }}
            >
              {activeProjects.slice(0, 6).map((p, i) => (
                <motion.button
                  key={p.title}
                  type="button"
                  className="work-card"
                  onClick={() => setSelectedProject(p)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 340, damping: 22 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  aria-haspopup="dialog"
                  aria-label={`Open project details for ${p.title}`}
                  title={p.title}
                >
                  <div className="work-card__img-wrap">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="work-card__img"
                      loading="lazy"
                    />
                    <div className="work-card__overlay">
                      <span className="work-card__overlay-text">View details</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </FadeSection>

        {/* ── Project Modal ── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-modal-backdrop"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} project details`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
            >
              <motion.div
                className="project-modal-content"
                initial={{ opacity: 0, scale: 0.92, y: 32 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                <button
                  type="button"
                  className="project-modal-close"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className="project-modal-grid">
                  <div className="project-modal-image-wrap">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="project-modal-image"
                    />
                  </div>
                  <div className="project-modal-copy">
                    <span className="project-modal-eyebrow">Project spotlight</span>
                    <h3 className="project-modal-title">{selectedProject.title}</h3>
                    <p className="project-modal-description">{selectedProject.description}</p>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-cta"
                    >
                      {selectedProject.linkLabel}{" "}
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Skills ── */}
        <FadeSection className="myskills" ref={skillsRef} delay={0.05}>
          <img
            src="/allegroartisticleap/BackDropSkills.png"
            alt=""
            className="myskillsbg"
            aria-hidden="true"
          />
          <div className="skills-inner">
            <motion.div
              className="skills-header"
              initial={{ opacity: 0, y: 24 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="skills-eyebrow">Capabilities</span>
              <h2 className="skills-heading">What I bring to the table</h2>
            </motion.div>

            <div className="skills-columns">
              <motion.div
                className="skills-col"
                initial={{ opacity: 0, x: -32 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="skills-col-title">
                  <span className="skills-col-icon">⚙</span>Technical
                </div>
                <div className="skills-column-body">
                  {(skillsData.technical as SkillItem[]).map((s) => (
                    <SkillBar key={s.name} item={s} />
                  ))}
                </div>
              </motion.div>

              <div className="skills-col-divider" />

              <motion.div
                className="skills-col"
                initial={{ opacity: 0, x: 32 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
                transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="skills-col-title">
                  <span className="skills-col-icon">✦</span>Creative
                </div>
                <div className="skills-column-body">
                  {(skillsData.creative as SkillItem[]).map((s) => (
                    <SkillBar key={s.name} item={s} alt />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </FadeSection>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="footer-brand-name">Lalith Kumar</div>
          <div className="footer-tagline">AI · 3D Environments · Digital Art · Programming</div>
        </div>
        <div className="donate-box">
          <h3>Support my work</h3>
          <img
            className="qrimage"
            src="/allegroartisticleap/PaymentQR.jpg"
            alt="Payment QR code"
          />
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} Lalith Kumar. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default WebPage;