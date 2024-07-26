import React, { useEffect, useState } from "react";
import MainScreen from "../../MainScreen/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const {userInfo} = useSelector((state) => state.userLogin);
  useEffect(() => {
    console.log("inside!!");
    try {
      async function fetchData() {
        const { data } = await axios.get("/api/notes");
        console.log({ data });
        setNotes(data);
      }
      fetchData();
    } catch (error) {
      console.log({ error });
    }
  }, []);
  const handleDelete = () => {
    window.confirm("Are you sure to confirm?");
  };
  return (
    <MainScreen title={`Welcome back ${userInfo?.name}....`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => {
        return (
          <Accordion key={note._id}>
            <Accordion.Item eventKey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Header>{note.title}</Accordion.Header>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => handleDelete(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created On - date
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </MainScreen>
  );
};

export default MyNotes;
