import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/membros">
                <i className="fa fa-users"></i><br /> Todos os Membros
            </Link>
            <Link to="/nao-verificados">
                <i className="fa fa-inbox"></i><br /> Membros Não Verificados
            </Link>
            <Link to="/novo-estagio">
                <i className="fa fa-plus-circle"></i><br /> Novo Estágio
            </Link>
            <Link to="/editar-membro">
                <i className="fa fa-edit"></i><br /> Editar Usuário
            </Link>
            <Link to="/logout">
                <i className="fa fa-sign-out"></i><br /> Logout
            </Link>
        </nav>
    </aside>