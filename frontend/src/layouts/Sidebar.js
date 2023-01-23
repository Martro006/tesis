import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";
import { ReactSession } from 'react-client-session';

const usuario = JSON.parse(ReactSession.get("user"));

const navigation = [
  {
    title: "Home",
    href: "/home",
    icon: "fa fa-home",
  },  
  {
    title: "Transacciones",
    href: "/trans",
    icon: "fa fa-home",
  },
  {
    title: "Informes Efectivo",
    href: "/infEfec",
    icon: "fa fa-home",
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: "bi bi-bell",
  },
  {
    title: "Informes Inventarios",
    href: "/infInv",
    icon: "bi bi-bell",
  },
  {
    title: "Usuarios",
    href: "/usu",
    icon: "bi bi-bell",
  }
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{backgroundImage: `url(${"https://firebasestorage.googleapis.com/v0/b/opticaab-34b8f.appspot.com/o/tesis%2FTOZ.jpg?alt=media&token=c29fbd0a-fbfe-4ea4-834b-9d27de403cb9"})`,        
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover", minHeight: '120px'}}
      >
        <div className="p-3 d-flex">         
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark mt-5 text-white p-2 opacity-75">{usuario[0].log_correo}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
