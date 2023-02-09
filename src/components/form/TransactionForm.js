import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { collection, addDoc } from "firebase/firestore"
import { auth, db } from "../../firebase/firebase-config"
import { toast } from "react-toastify"

const initialState = {
  type: "",
  name: "",
  amount: "",
  userId: "",
}

const TransactionForm = ({ fetchTransactions }) => {
  const user = auth.currentUser
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const docRef = await addDoc(collection(db, "transactions"), {
      ...formData,
      userId: user.uid,
    })
    setFormData(initialState)
    docRef.id
      ? toast.success("Transaction added successfully!") && fetchTransactions()
      : toast.error("Unable to add transaction!")
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mt-3 gap-2">
          <Col md={2}>
            <Form.Select
              name="type"
              required
              value={formData.value}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Col>
          <Col md="5">
            <Form.Control
              onChange={handleChange}
              name="name"
              placeholder="Transaction Name"
              required
              value={formData.name}
            />
          </Col>
          <Col md="2">
            <Form.Control
              onChange={handleChange}
              name="amount"
              type="number"
              placeholder="amount i.e. 500"
              required
              value={formData.amount}
            />
          </Col>
          <Col md="2">
            <div className="d-grid">
              <Button type="submit"> Add </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default TransactionForm
