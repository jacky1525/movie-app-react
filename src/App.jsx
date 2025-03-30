  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import Favorites from './pages/Favorites';
  import MovieDetail from './pages/MovieDetail';
  import Profile from './pages/Profile';
  import Navbar from './components/Navbar';
  import Home from './pages/Home';

  const App = () => {
    return (
      <>
        <Navbar /> {/* her sayfada görünsün */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movie/:id" element={<MovieDetail />} />

        </Routes>
      </>
    );
  };

  export default App;
