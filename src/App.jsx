import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";

import Pricing from "./Components/Pricing/Pricing";
import Login from "./Components/SignIn/SignIn";

import Dashboard from "./Components/Dashboard/Dashboard";
import Teammates from "./Components/Dashboard/Teammates";

import Playground from "./Components/Build/Playground";
import Build from "./Components/Build/Build";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="teammates" element={<Teammates />} />
        </Route>
        <Route path="/playground" element={<Playground />}>
          <Route path="build" element={<Build />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/login/:invitation_code" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
