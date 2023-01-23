import { Col, Navbar, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Row>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Col className="text-center text-white py-3">
            &copy; {new Date().getFullYear()} techBOMB, Inc. All rights
            reserved.
          </Col>
        </Navbar>
      </Row>
    </footer>
  );
};

export default Footer;
