import Background from "./three/Background";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
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
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
