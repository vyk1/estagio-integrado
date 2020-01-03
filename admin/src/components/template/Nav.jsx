// import React from "react";
// import { Navbar, Nav, NavItem } from "react-bootstrap";

// const NavC = () => (
//     <div>
//         <div className="center-navbar">
//             <Navbar collapseOnSelect>
//                 <Navbar.Header>
//                     <Navbar.Brand>Logo</Navbar.Brand>
//                     <Navbar.Toggle />
//                 </Navbar.Header>
//                 <Navbar.Collapse>
//                     <Nav>
//                         <NavItem eventKey="a" href="#">
//                             Link1
//         </NavItem>

//                         <NavItem eventKey="b" href="#">
//                             Link2
//         </NavItem> 
//                     </Nav>
//                 </Navbar.Collapse>
//             </Navbar>
//         </div>
//         <h2 style={{ textAlign: "center" }}>This is some text</h2>
//     </div>
// )
// export default NavC;

import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
            <Link to="/admin/membros">
                <i className="fa fa-users"></i><br /> Todos os Membros
            </Link>
            <Link to="/admin/nao-verificados">
                <i className="fa fa-inbox"></i><br /> Membros Não Verificados
            </Link>
            <Link to="/admin/novo-estagio">
                <i className="fa fa-plus-circle"></i><br /> Novo Estágio
            </Link>
            <Link to="/admin/editar-membro">
                <i className="fa fa-edit"></i><br /> Editar Usuário
            </Link>
            <Link to="/admin/logout">
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