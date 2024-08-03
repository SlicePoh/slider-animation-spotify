import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./pages/Hero";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Hero/>}/>
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
