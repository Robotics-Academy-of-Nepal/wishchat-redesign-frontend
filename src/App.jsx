import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";

import Pricing from "./Components/Dashboard/Pricing";
import Login from "./Components/SignIn/SignIn";

import Dashboard from "./Components/Dashboard/Dashboard";
import Teammates from "./Components/Dashboard/Teammates";

import Playground from "./Components/Playground/Playground";
import Build from "./Components/Build/Build";
import Chat from "./Components/Playground/Chat";
import CreateOrganization from "./Components/SignIn/CreateOrganization";

import Deploy from "./Components/Deploy/Deploy";
import WhatsappDeployForm from "./Components/Deploy/WhatsappDeployForm";
import MessengerDeployForm from "./Components/Deploy/MessengerDeployForm";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="pricing" element={<Pricing />} />
          <Route path="teammates" element={<Teammates />} />
        </Route>
        <Route path="/playground" element={<Playground />}>
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="/deploy" element={<Deploy />}>
          <Route path="whatsappForm" element={<WhatsappDeployForm />} />
          <Route path="messengerForm" element={<MessengerDeployForm />} />
        </Route>
        <Route path="/build" element={<Build />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createOrganization" element={<CreateOrganization />} />
        <Route path="/login/:invitation_code" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
