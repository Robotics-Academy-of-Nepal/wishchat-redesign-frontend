import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Pricing from "./Components/Pricing/Pricing";
import Dashboard from "./Components/Chatbot/Dashboard";
import Playground from "./Components/Chatbot/Playground";
import Login from "./Components/SignIn/SignIn";
import Teammates from "./Components/Chatbot/Teammates";
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
        <Route path="/playground" element={<Playground />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:invitation_code" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
