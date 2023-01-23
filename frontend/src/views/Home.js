import { Col, Row } from "reactstrap";
import Image from "../components/dashboard/Image";
import { ReactSession } from 'react-client-session';

const Home = () => {
    console.log(ReactSession.get("user"));
    return (
      <div>
        <Row>
          <Col sm="12" lg="12" xl="12" xxl="12">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/opticaab-34b8f.appspot.com/o/tesis%2Fimagen_2023-01-22_165105641.png?alt=media&token=aa6b54da-f0d7-4dfc-856e-d5f33c0c2863"
              height = "500px"
            />
          </Col>
        </Row>
      </div>
    );
  };
  
  export default Home;
  