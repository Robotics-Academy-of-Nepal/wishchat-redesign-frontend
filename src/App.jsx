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
const wishChatFAQs = [
  {
    question: "What is WishChat?",
    answer:
      "WishChat is a customizable chat widget that can be embedded into websites to enable real-time conversations between users and support agents or AI-powered bots.",
  },
  {
    question: "How do I integrate WishChat into my website?",
    answer:
      "Simply copy and paste the provided JavaScript snippet into your website’s <body> or <head> section. The chat widget will automatically appear on your site.",
  },
  {
    question: "Can I customize the chat widget's appearance?",
    answer:
      "Yes! You can customize the chat bubble color, background, text color, input fields, and more using simple configuration settings.",
  },
  {
    question: "Does WishChat support AI-based chat responses?",
    answer:
      "Yes, WishChat can integrate with AI-powered chatbots to provide automated responses, making it an excellent solution for handling common queries.",
  },
  {
    question: "Is there an option to store chat history?",
    answer:
      "Yes, chat history can be stored depending on your integration. You can configure it to save messages on your server or a cloud-based database.",
  },
  {
    question: "What happens if no agent is available?",
    answer:
      "If no live agent is online, the chatbot (if enabled) will handle queries. You can also set up an 'offline mode' where users can leave their messages to be answered later.",
  },
  {
    question: "Is WishChat mobile-friendly?",
    answer:
      "Yes! The chat widget is fully responsive and works smoothly on desktops, tablets, and mobile devices.",
  },
  {
    question: "How secure is WishChat?",
    answer:
      "WishChat uses end-to-end encryption for messages and follows strict security protocols to protect user data.",
  },
  {
    question: "Can I integrate WishChat with third-party CRM or support tools?",
    answer:
      "Yes, WishChat supports integrations with tools like Zendesk, HubSpot, Slack, and email notifications for better workflow automation.",
  },
  {
    question: "Is there a free version of WishChat?",
    answer:
      "Yes, we offer a free plan with basic features. For advanced customization, integrations, and analytics, you can upgrade to a premium plan.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via email, live chat on our website, or through the WishChat dashboard.",
  },
];

function App() {
  useEffect(() => {
    window.chatWidgetConfig = {
      bubbleBgColor: "#111827",
      bubbleColor: "#fafafa",

      chatBackgroundColor: "#fafafa",
      chatBorder: "#e5e7eb",
      headerBackgroundColor: "#111827",
      headerTextColor: "#fafafa",

      footerBackgroundColor: "#fafafa",

      sendButtonColor: "#111827",
      sendTextColor: "#fafafa",

      headerText: "Chat",
      inputBorderColor: "#d1d5dc",
      placeholderText: "Type your query...",
      inputTextColor: "#111827",
      inputBgColor: "#fafafa",
      Key: "4d006dcbd4b441769e9638aa0caf7381",

      FAQs: wishChatFAQs,
    };
    import("./chatWidget.js")
      .then((module) => {
        console.log("chatWidget loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading chatWidget.js", error);
      });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="pricing" element={<Pricing />} />
          <Route path="teammates" element={<Teammates />} />
        </Route>
        <Route path="/chatbot" element={<ChatbotSpecificFeatures />}></Route>
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
        <Route path="/build" element={<Build />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createOrganization" element={<CreateOrganization />} />
        <Route path="/login/:invitation_code" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
