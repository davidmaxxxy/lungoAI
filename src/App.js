import logo from "./logo.svg";
import "./App.css";
import "./styles/main.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import MacroTrendInputPage from "./pages/MacroTrendInputPage/MaroTrendInputPage";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <MacroTrendInputPage />
    </>
  );
}

export default App;
