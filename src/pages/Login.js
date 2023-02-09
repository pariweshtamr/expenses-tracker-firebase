import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Layout from "../components/layout/Layout"
import { auth } from "../firebase/firebase-config"
const initialState = {
  email: "",
  password: "",
}
const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.email && !formData.password) return

    setIsLoading(true)

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        setIsLoading(false)
        // Signed in
        const user = userCredential.user
        sessionStorage.setItem("accessToken", user.accessToken)
        user.uid && navigate("/")
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      })
  }

  return (
    <Layout>
      <Form className="form-area text-dark" onSubmit={handleSubmit}>
        <h2 className="text-center text-dark">Welcome Back! Login</h2>
        <hr />

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Passowrd</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login {isLoading && <Spinner variant="primary" animation="border" />}
        </Button>

        <div className="text-center">
          Don't have an account? <Link to="/register"> Register Now </Link>
        </div>
      </Form>
    </Layout>
  )
}

export default Login
