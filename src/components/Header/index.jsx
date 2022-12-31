import React from 'react';

import './styles.scss'
import { dateOptions } from "../../services/date";

export function Header() {
    return(
        <header className='header'>
        <h3>Suas despesas</h3>
        <small>{new Date().toLocaleDateString('pt-BR', dateOptions)}</small>
        </header>
    );
}