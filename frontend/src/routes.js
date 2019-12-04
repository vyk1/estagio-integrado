
import AllActivatedMembers from "views/AllActivatedMembers.jsx";
import AllNotActivatedMembers from "views/AllNotActivatedMembers.jsx";
import NewInternship from "views/NewInternship.jsx";
import UpdateUserList from "views/UpdateUserList.jsx";
import Logout from "views/Logout.jsx";

const dashboardRoutes = [
  {
    path: "/membros",
    name: "Todos os Membros",
    icon: "pe-7s-look",
    component: AllActivatedMembers,
    layout: "/admin"
  },
  {
    path: "/nao-verificados",
    name: "Membros Não Verificados",
    icon: "pe-7s-box1",
    component: AllNotActivatedMembers,
    layout: "/admin"
  },
  {
    path: "/novo-estagio",
    name: "Novo Estágio",
    icon: "pe-7s-plus",
    component: NewInternship,
    layout: "/admin"
  },
  {
    path: "/editar-membro",
    name: "Editar Usuário",
    icon: "pe-7s-edit",
    component: UpdateUserList,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "pe-7s-power",
    component: Logout,
    layout: "/admin"
  },
];

export default dashboardRoutes;
