import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase-config"
import { useState } from "react"

function App() {
  const [currentUser, setCurrentUser] = useState({})
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={currentUser.uid ? <Dashboard /> : <Login />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
