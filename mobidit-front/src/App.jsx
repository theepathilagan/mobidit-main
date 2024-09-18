import Feed from './components/Feed'
import Register from './components/Register'
import Login from './components/Login'
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContext';
import Profil from './components/Profil';
import Post from './components/Post';

function App() {

  window.addEventListener('load', async () => {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register('../dev-dist/sw.js')
      console.log('service worker registered successfully')
    }
  })

  return (
    <AuthContextProvider>
      <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/profil" element={<Profil />}/>
          <Route path="/post" element={<Post />}/>
      </Routes>
    </AuthContextProvider>
  )
}

export default App;