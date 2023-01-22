import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { ReactSession } from 'react-client-session';

const FullLayout = () => {
  if(ReactSession.get("user") === "null"){
    return (
      <Navigate to="/login" />
    );
  }else{
    return (
      <main>
        {/********header**********/}
        <Header />
        <div className="pageWrapper d-lg-flex">
          {/********Sidebar**********/}
          <aside className="sidebarArea shadow" id="sidebarArea">
            <Sidebar />
          </aside>
          {/********Content Area**********/}
          <div className="contentArea">
            {/********Middle Content**********/}
            <Container className="p-4" fluid>
              <Outlet />
            </Container>
          </div>
        </div>
      </main>
    );
  }
};

export default FullLayout;
