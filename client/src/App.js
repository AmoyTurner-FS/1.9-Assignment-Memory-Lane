import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Manage from "./pages/Manage";

export default function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/manage">Manage</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/:id" element={<Manage />} />
      </Routes>
    </div>
  );
}
