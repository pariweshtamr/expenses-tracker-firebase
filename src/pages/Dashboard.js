import TransactionForm from "../components/form/TransactionForm"
import Layout from "../components/layout/Layout"
import TransactionTable from "../components/table/TransactionTable"
import { collection, query, getDocs, where } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { auth, db } from "../firebase/firebase-config"

const Dashboard = () => {
  const user = auth.currentUser
  const [transactions, setTransactions] = useState([])
  const fetchTransactions = useCallback(async () => {
    let trans = []

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    )
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const { id } = doc
        const data = { ...doc.data(), id }
        trans.push(data)
        if (!trans.length) return setTransactions([])
        setTransactions(trans)
      })
    } catch (error) {
      console.log(error.message)
    }
  }, [user.uid])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <Layout>
      <div className="form">
        <TransactionForm fetchTransactions={fetchTransactions} />
      </div>
      <div className="my-4 text-light">
        {transactions.length} transaction(s) Found!
      </div>

      {!!transactions.length && (
        <TransactionTable
          transactions={transactions}
          fetchTransactions={fetchTransactions}
        />
      )}
    </Layout>
  )
}

export default Dashboard
