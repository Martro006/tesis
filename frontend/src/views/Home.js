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
              src="https://firebasestorage.googleapis.com/v0/b/opticaab-34b8f.appspot.com/o/tesis%2FOPTICA.png?alt=media&token=a4640a57-7bd3-48ea-895f-ca2d909b155d"
              width="100%"
            />
          </Col>
        </Row>
      </div>
    );
  };
  
  export default Home;
  