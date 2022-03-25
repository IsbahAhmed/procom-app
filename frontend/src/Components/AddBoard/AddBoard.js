import React, { useState } from "react";
import { Form, FormGroup, Offcanvas } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBoard } from "../../Redux/Board/boardActions";
import StyledButton from "../StyledButton/StyledButton";

const AddBoard = ({ show, handleClose }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });
  const [loading,setLoading] = useState(false)
  const { title, description } = formValues;
  const handleFormValues = (e)=>{
      const {value,name} = e.target;
      setFormValues((prev)=>({
          ...prev,
          [name]:value
      }))
  }
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
        setLoading(true)
        await dispatch(addBoard({title,description}));
        setLoading(false)
    }
  };
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Board</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleFormValues}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required

                type="text"
                name="description"
                value={description}
                onChange={handleFormValues}
              />
            </Form.Group>
            <StyledButton loading={loading} varient="primary" value="SUBMIT" className="mt-4"/>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddBoard;
