import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../MainScreen/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../../redux/actions/userLoginAction";

const LoginScreen = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo) {
      navigation("/mynotes");
    }
  }, [userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(Login(email, password));
  };
  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here!</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
export default LoginScreen;
