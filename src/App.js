import './App.css';
import Home from './HomeScreen/Home';
import Login from './LoginScreen/Login';
import SignUpScreen from './SignUpScreen/SignUpScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile/Profile';
import { useState } from 'react';
import NewsScreen from './news/NewsScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
    //       <Route path="/login" element={<Login onLogin={handleLogin} />} />
    //       <Route path="/signup" element={<SignUpScreen />} />
    //       <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
    //       <Route path="/news" element={<NewsScreen />} />
    //     </Routes>
    //   </div>
    // </Router>

<Router>
<div className="App">
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/news" element={<NewsScreen />} />
  </Routes>
</div>
</Router>
  );
}

export default App;
