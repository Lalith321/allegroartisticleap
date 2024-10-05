import {
  HashRouter as
  Router,
  Route,
  Routes,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import WebPage from "./pages/LandingPage";
import ArtificialIntelligencePage from "./pages/ArtificialintelligencePage";
import ProgrammingPage from "./pages/ProgrammingPage";
import Env3DPage from "./pages/Env3DPage";
import DigitalArtPage from "./pages/DigitalArtPage";
import ProjectHotel1 from "./pages/ProjectHotel1";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "AAL";
        metaDescription = "";
        break;

      case "/ai":
        title = "AAL";
        metaDescription = "";
        break;

      case "/env3d":
        title = "AAL";
        metaDescription = "";
        break;

      case "/programs":
        title = "AAL";
        metaDescription = "";
        break;

      case "/digitalart":
        title = "AAL";
        metaDescription = "";
        break;

      case "/ai/ProjectHotel1":
        title = "AAL";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
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
