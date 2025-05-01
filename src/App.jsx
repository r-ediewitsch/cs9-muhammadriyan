import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import CardSection from "../src/components/CardSection";
import CounterSection from "../src/components/CounterSection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getItem } from "./actions/Item.action";

function Home() {
  const [response, setResponse] = useState({ results: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!userData);

    const fetchData = async () => {
      try {
        const data = await getItem();
        setResponse({ results: data.payload || [] });
      } catch (error) {
        console.error('Error fetching items:', error);
        setResponse({ results: [] });
      }
    };
    
    if (userData) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <CounterSection />
      {isLoggedIn && (
        <CardSection 
          id="card-section"
          title="Our Products"
          subtitle="A music collection by Hoshimachi Suisei"
          results={response.results}
        />
      )}
    </div>
  );
}

function Layout() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} isLoggedIn={isLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}