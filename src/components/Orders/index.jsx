import { useState } from "react";

import Modal from "react-modal";
import ReactLoading from "react-loading";
import { MdOutlineRemoveCircle, FaEdit } from "react-icons/all";

import { addDoc, doc, deleteDoc } from "firebase/firestore";
import { transactionColletionRef, database } from "../../services/firebase";

import "./styles.scss";
import { dateOptions } from "../../services/date";

Modal.setAppElement("#root");

export const Orders = ({ transactions }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");

  function toggleModal() {
    setIsOpen(!modalIsOpen);
    setError("")
  }

  async function createTransaction() {
    if (description && value) {
      const date = new Date();
      const user = await addDoc(transactionColletionRef, {
        description,
        value,
        date
      });
      toggleModal()
      console.log(user.data)
    } else {
      setError("Você precisa preencher todos os dados, com informações válidas")
    }
  }

  async function deleteTransaction(transaction_id) {
    const transactionDoc = doc(database, "transactions", transaction_id);

    await deleteDoc(transactionDoc);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <h3>Nova transação</h3>
        <div className="modal-error">
          <small className="error-message">{error}</small>
        </div>
        <div className="modal-inputs">
          <input
            type="text"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            onChange={(e) => setValue(e.target.value)}
          />
          <small className="modal-alert">
            Use o sinal - (negativo) para despesas e, (vírgula) para casas
            decimais
          </small>
        </div>
        <div className="modal-buttons">
          <button onClick={toggleModal}>Cancelar</button>
          <button onClick={createTransaction}>Salvar</button>
        </div>
      </Modal>

      <div className="orders">
        <header>
          <h3>Despesas</h3>
          <small>Todas as despesas atuais</small>
        </header>

        <button onClick={toggleModal}>+ Nova transação</button>

        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th></th>
              <th></th>
            </tr>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{transaction.value}</td>
                  <td>{new Date(transaction.date.seconds * 1000 + transaction.date.nanoseconds / 1000000).toLocaleDateString('pt-BR', dateOptions)}</td>
                  <td>
                    <div onClick={() => { deleteTransaction(transaction.id) }}>
                      <MdOutlineRemoveCircle size={24} />
                      <small>Remover</small>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {transactions.length <= 0 && (
          <>
            <ReactLoading
              className="loading-bar"
              type="bars"
              color="#fff"
              height={40}
              width={40}
            />
          </>
        )}
      </div>
    </>
  );
};
