import { Route, Routes, useLocation } from "react-router-dom";
import WebPage from "./pages/LandingPage";
import ArtificialIntelligencePage from "./pages/ArtificialintelligencePage";
import ProgrammingPage from "./pages/ProgrammingPage";
import Env3DPage from "./pages/Env3DPage";
import DigitalArtPage from "./pages/DigitalArtPage";
import ProjectHotel1 from "./pages/ProjectHotel1";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Lalith Kumar — AI · 3D · Design · Code", description: "Portfolio of Lalith Kumar — computer scientist and digital artist specialising in AI, 3D environments, digital art, and software development." },
  "/ai": { title: "AI & Machine Learning — Lalith Kumar", description: "AI and machine learning projects by Lalith Kumar." },
  "/env3d": { title: "3D Environments — Lalith Kumar", description: "3D environment art and Blender projects by Lalith Kumar." },
  "/programs": { title: "Programming — Lalith Kumar", description: "Programming and software projects by Lalith Kumar." },
  "/digitalart": { title: "Digital Art — Lalith Kumar", description: "Digital art portfolio by Lalith Kumar." },
  "/ai/ProjectHotel1": { title: "Organization RAG — Lalith Kumar", description: "RAG AI demo project by Lalith Kumar." },
};

function App() {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const meta = pageMeta[pathname];
    if (!meta) return;
    document.title = meta.title;
    const tag = document.querySelector<HTMLMetaElement>('head > meta[name="description"]');
    if (tag) tag.content = meta.description;
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<WebPage />} />
        <Route path="/ai" element={<ArtificialIntelligencePage />} />
        <Route path="/env3d" element={<Env3DPage />} />
        <Route path="/programs" element={<ProgrammingPage />} />
        <Route path="/digitalart" element={<DigitalArtPage />} />
        <Route path="/ai/ProjectHotel1" element={<ProjectHotel1 />} />
      </Routes>
    </AnimatePresence>
  );
}
export default App;
