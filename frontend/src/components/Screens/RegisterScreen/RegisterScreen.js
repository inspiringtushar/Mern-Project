import { useEffect, useState } from "react";
import MainScreen from "../../MainScreen/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../ErrorMessage";
import Loading from "../../Loading";
import { useDispatch, useSelector } from "react-redux";
import RegisterUser from "../../../redux/actions/userRegistrationAction";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userRegister, userLogin } = useSelector((state) => state);
  const { loading, error } = userRegister;
  const { userInfo: userLoginInfo } = userLogin;
  useEffect(() => {
    if (userLoginInfo) {
      navigate("/mynotes");
    }
  }, [userLoginInfo, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (password === "" || name === "" || email === "") {
      return setMessage("Please fill in the details!!");
    }
    if (password !== confirmPassword) {
      setMessage("Password does not match!!");
    } else {
      try {
        dispatch(RegisterUser(name, email, password, pic))
          .then((res) => {
            console.log({ res });
            if (res?.name) {
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const postPicOnCloud = (pic) => {
    if (pic === "") {
      return setPicMessage("Please select an image!!");
    }
    setPicMessage(null);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "inspiringtushar");
      fetch("https://api.cloudinary.com/v1_1/inspiringtushar/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return setPicMessage("Please select an image!!");
    }
  };
  return (
    <MainScreen title="SIGNUP">
      <div className="registerContainer">
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              size="md"
              onChange={(e) => postPicOnCloud(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login!</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};
export default RegisterScreen;
