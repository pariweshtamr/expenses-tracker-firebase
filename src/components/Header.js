import { signOut } from "firebase/auth"
import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { auth } from "../firebase/firebase-config"

const Header = () => {
  const navigate = useNavigate()
  const user = auth?.currentUser

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("accessToken")
        toast.success("Sign out successful!") && navigate("/login")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }
  return (
    <Navbar bg="light" expand="md" varirant="dark">
      <Container>
        <Link to="/">Expenses Tracker</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?.uid ? (
              <>
                <div className="nav-link fw-bolder">
                  Welcome Back {user?.displayName}!
                </div>
                <div
                  className="nav-link"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
