import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Transacciones = lazy(() => import("../views/Transacciones.js"));
const Clientes = lazy(() => import("../views/Clientes.js"));
const InfEfec = lazy(() => import("../views/InfEfec.js"));
const InfInv = lazy(() => import("../views/InfInv.js"));
const Usu  = lazy(() => import("../views/Usuarios.js"));

/***** Pages ****/
const Login = lazy(() => import("../views/Login.js"));
const Home = lazy(() => import("../views/Home.js"));
const Plantilla = lazy(() => import("../views/propia/Plantillas.js"));
const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const Ventas = lazy(() => import("../views/Ventas.js"));
const Compras = lazy(() => import("../views/Compras.js"));
const Productos = lazy(() => import("../views/Prod.js"));
const FactEntr = lazy(() => import("../views/FactEntrada.js"));
const VerFactEntr = lazy(() => import("../views/VerFactEntrada.js"));
const OrdenCli = lazy(() => import("../views/Orden.js"));
const VerOrden = lazy(() => import("../views/VerOrden.js"));
const TransAsesor = lazy(() => import("../views/TransAsesor.js"));


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/home", exact: true, element: <Home /> },
      { path: "/plantilla", exact: true, element: <Plantilla /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/clientes", exact: true, element: <Clientes /> },
      { path: "/trans", exact: true, element: <Transacciones /> },
      { path: "/infEfec", exact: true, element: <InfEfec /> },
      { path: "/infInv", exact: true, element: <InfInv /> },
      { path: "/usu", exact: true, element: <Usu /> },
      { path: "/ventas", exact: true, element: <Ventas /> },
      { path: "/compras", exact: true, element: <Compras /> },
      { path: "/prod", exact: true, element: <Productos /> },
      { path: "/factEntr", exact: true, element: <FactEntr /> },
      { path: "/verFactEntr", exact: true, element: <VerFactEntr /> },
      { path: "/ordenCli", exact: true, element: <OrdenCli /> },
      { path: "/verOrden", exact: true, element: <VerOrden /> },
      { path: "/transAsesor", exact: true, element: <TransAsesor /> },
    ],
  },
  {
    path: "login",
    element: <Login />
  },
];

export default ThemeRoutes;
