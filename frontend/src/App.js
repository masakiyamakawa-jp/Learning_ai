// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';  // Home.jsを読み込む

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* "/" にアクセスしたら Home コンポーネントを表示 */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;