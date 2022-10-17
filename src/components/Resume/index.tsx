import React, { useState } from "react";

import { ResumeBox } from "../ResumeBox";
import { FaArrowCircleUp, FaArrowCircleDown, RiMoneyEuroCircleFill } from "react-icons/all";

import "./styles.scss";

export const Resume = ({ transactions }) => {

  const [deposit, setDeposit] = useState(0)
  const [out, setOut] = useState(0)

  const getDeposits = async () => {
    let valueDeposits = 0;
    await transactions.forEach((transaction) => {
      if(transaction.value > 0) {
        console.log(transaction.value)
        valueDeposits += Number(transaction.value)
      }
    })
    setDeposit(valueDeposits)
  }

  getDeposits()

  const getOut = async () => {
    let valueOut = 0;
    await transactions.forEach((transaction) => {
      if(transaction.value < 0) {
        console.log(transaction.value)
        valueOut += Number(transaction.value)
      }
    })
    setOut(valueOut)
  }

  getOut()

  return (
    <div className="resume">
      <ResumeBox name="Entradas" Icon={FaArrowCircleUp} value={deposit} color="#0743f5" />
      <ResumeBox name="Saidas" Icon={FaArrowCircleDown} value={out * -1} color="#f55e07" />
      <ResumeBox name="Resumo" Icon={RiMoneyEuroCircleFill} value={out + deposit} color="#07f213" />
    </div>
  );
};
