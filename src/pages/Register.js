import { useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/layout/Layout"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebase-config"
import { toast } from "react-toastify"

const initialState = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const Register = () => {
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

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!")
    }

    setIsLoading(true)

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        const user = userCredential.user
        setIsLoading(false)
        updateProfile(user, {
          displayName: formData.fName,
        })

        await setDoc(doc(db, "users", user.uid), {
          fName: formData.fName,
          lName: formData.lName,
          email: user.email,
        })
        toast.success("Registration Successful")
        navigate("/")
      })
      .catch((error) => {
        setIsLoading(false)
        let message
        if (error.message.includes("auth/email-already-in-use")) {
          message = "User already exists!"
        }
        toast.error(message)
      })

    setFormData(initialState)
  }

  return (
    <Layout>
      <Form className="form-area" onSubmit={handleSubmit}>
        <h2 className="text-center">Register</h2>
        <hr />

        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="fName"
            placeholder="John"
            value={formData.fName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lName"
            placeholder="Doe"
            value={formData.lName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="xyz@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="******"
            value={formData.password}
            minLength="6"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="******"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Register{" "}
          {isLoading && <Spinner animation="border" variant="primary" />}
        </Button>

        <div className="text-center">
          Already have an account? <Link to="/login">Login Now</Link>
        </div>
      </Form>
    </Layout>
  )
}

export default Register
