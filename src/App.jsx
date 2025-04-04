import { useEffect } from "react";
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
import WebsiteForm from "./Components/Deploy/WebsiteForm.jsx";
import "./App.css";
import WidgetColorForm from "./Components/Deploy/CustomColorForm.jsx";
import ChatbotSpecificFeatures from "./Components/ChatbotSpecificFeatures.jsx";
import WebsiteDomainForm from "./Components/Deploy/WebsiteDomainForm.jsx";
import ChatbotSettings from "./Components/ChatbotSettings/ChatbotSettings.jsx";
import { ChatbotProvider } from "./context/ChatbotContext";
import ChatbotDetail from "./Components/ChatbotSettings/ChatbotDetail.jsx";
import Payment from "./Components/ChatbotSettings/Payment.jsx";
import ChatbotAnalytics from "./Components/ChatbotSettings/ChatbotAnalytics.jsx";
function App() {
  // useEffect(() => {
  //   import("./chatWidget.js")
  //     .then((module) => {
  //       console.log("chatWidget loaded successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error loading chatWidget.js", error);
  //     });
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/dashboard"
          element={
            <ChatbotProvider>
              <Dashboard />
            </ChatbotProvider>
          }
        >
          <Route path="pricing" element={<Pricing />} />
          <Route path="teammates" element={<Teammates />} />
        </Route>

        {/* Wrap the entire ChatbotSpecificFeatures and its child routes with ChatbotProvider */}
        <Route
          // path="/chatbot"
          element={
            <ChatbotProvider>
              <ChatbotSpecificFeatures />
            </ChatbotProvider>
          }
        >
          {/* These routes will now have access to the ChatbotContext */}
          <Route path="/playground" element={<Playground />}>
            <Route path="chat" element={<Chat />} />
          </Route>

          <Route path="/deploy" element={<Deploy />}>
            <Route path="whatsappForm" element={<WhatsappDeployForm />} />
            <Route path="messengerForm" element={<MessengerDeployForm />} />
            <Route path="widgetColorForm" element={<WidgetColorForm />} />
            <Route path="websiteDomainForm" element={<WebsiteDomainForm />} />
            <Route path="websiteForm" element={<WebsiteForm />} />
          </Route>

          <Route path="/chatbotSettings" element={<ChatbotSettings />}>
            <Route path="chatbot-details" element={<ChatbotDetail />}></Route>
            <Route path="analytics" element={<ChatbotAnalytics />}></Route>
            <Route path="payment" element={<Payment />}></Route>
          </Route>
          <Route path="/build" element={<Build />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/createOrganization" element={<CreateOrganization />} />
        <Route path="/login/:invitation_code" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
