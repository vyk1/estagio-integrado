import React from 'react'
import Main from '../template/Main'
import Footer from '../template/Footer'
import Logo from '../template/Logo'
import Nav from '../template/Nav'

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Main icon="home" title="Início"
            subtitle="Página Administrativa para o App Estágio Integrado.">
            <div className='display-4'>Bem Vindo!</div>
            <hr />
            <p className="mb-0">Selecione a operação desejada no menu ao lado.</p>
        </Main>
        <Footer />
    </div>