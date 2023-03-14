import { Table } from "react-bootstrap"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase-config"
import { toast } from "react-toastify"

const TransactionTable = ({ transactions, fetchTransactions }) => {
  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this transaction?`)) {
      await deleteDoc(doc(db, "transactions", id))
      toast.success("Transaction deleted!")
      fetchTransactions()
    }
  }
  const total = transactions.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + +amount : acc - +amount,
    0
  )

  return (
    <>
      <Table striped hover bordered className="text-light">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Date / Time</th>
            <th>Transaction</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id} className="text-center">
              <td>
                <i
                  className="fa-solid fa-circle-xmark text-danger"
                  onClick={() => handleDelete(transaction.id)}
                  style={{ cursor: "pointer" }}
                ></i>
              </td>
              <td className="text-light">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </td>
              <td className="text-light">{transaction.name}</td>
              {transaction.type === "income" ? (
                <>
                  <td className="text-success">${transaction.amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className="text-danger">${transaction.amount}</td>
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bolder fs-5">
            <td colSpan={3} className="text-center text-light">
              Total Balance
            </td>
            <td
              colSpan={2}
              className={`${
                total > 0 ? "text-success" : "text-danger"
              } text-center`}
            >
              ${total}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default TransactionTable
