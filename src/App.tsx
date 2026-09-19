import Background from "./three/Background";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import LogoMarquee from "./components/LogoMarquee";
import About from "./sections/About";
import ScrollManifesto from "./components/ScrollManifesto";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Background />
      <Nav />
      <main className="app-content">
        <Hero />
        <LogoMarquee />
        <About />
        <ScrollManifesto />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
