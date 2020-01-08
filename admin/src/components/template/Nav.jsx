import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
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

/*import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
<aside className="menu-area">
    <nav className="menu">
        <ul>
            <Link to="/admin/membros">
                <i className="fa fa-users"></i><br /> Todos os Membros
        </Link>
        </ul>
        <ul>
            <Link to="/admin/nao-verificados">
                <i className="fa fa-inbox"></i><br /> Membros Não Verificados
        </Link>
        </ul>
        <ul>
            <Link to="/admin/novo-estagio">
                <i className="fa fa-plus-circle"></i><br /> Novo Estágio
        </Link>
        </ul>
        <Link to="/admin/editar-membro">
            <i className="fa fa-edit"></i><br /> Editar Usuário
        </Link>
        <ul>
            <Link to="/admin/logout">
                <i className="fa fa-sign-out"></i><br /> Logout
        </Link>
        </ul>
    </nav>
</aside >
*/