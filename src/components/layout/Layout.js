import React from "react"
import { Container } from "react-bootstrap"
import Header from "../Header"
import "./layout.css"
const Layout = ({ children, user }) => {
  return (
    <div className="layout">
      <Header />
      <Container className="mt-5 main-content">{children}</Container>
      <footer className="text-center bg-dark text-light p-5 mt-5">
        &copy; All Rights Reserved 2023 | Made by Pariwesh
      </footer>
    </div>
  )
}

export default Layout
