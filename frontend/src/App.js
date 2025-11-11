// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';


// 簡易な認証状態（ローカルストレージの有無で判定）
const isAuthed = () => !!localStorage.getItem('auth_ok');


// 認証ガード
function ProtectedRoute({ children }) {
  if (!isAuthed()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


// ページルーティング
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* それ以外は / に寄せる */}
        <Route path="*" element={<Navigate to={isAuthed() ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;