import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
  );
};

export default App;