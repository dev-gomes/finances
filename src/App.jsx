import { useEffect, useState } from "react";

import { getDocs } from "firebase/firestore";

import { Resume } from "./components/Resume";
import { Header } from "./components/Header";
import { Orders } from "./components/Orders";

import { transactionColletionRef } from "./services/firebase";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await getDocs(transactionColletionRef);
      setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setTimeout(() => getTransactions(), 1500);
    };
    getTransactions();
  }, []);

  return (
    <>
      <Header />
      <Resume transactions={transactions} />
      <Orders transactions={transactions} />
    </>
  );
}

export default App;
