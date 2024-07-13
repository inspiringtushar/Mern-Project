import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
    //   style={{
    //     bottom: 0,
    //     position: "relative",
    //     justifyContent: "center",
    //     display: "flex",
    //     width: "100%",
    //   }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Copywright &copy; Note Zipper</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
