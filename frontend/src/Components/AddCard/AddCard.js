import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  addCard } from "../../Redux/Board/boardActions";
import StyledButton from "../StyledButton/StyledButton";

const AddCard = ({ show, handleClose ,boardId}) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status:"todo",
    priority:"high"
  });
  const [members,setMembers] = useState([])
  const board = useSelector((state) => state.board.Data);
  useEffect(() => {
    if (board) {
      const members = _.flatMap(board, "members");
      setMembers(members);
    }
  }, [board]);
  const [userId,setUserId] = useState()
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
    if (title && description && formValues.userId) {
        console.log(formValues)
        setLoading(true);
        formValues.board = boardId;
        formValues.userId = userId;
        await dispatch(addCard({formValues}));
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Member Assign</Form.Label>
              <select onChange={(e)=> setFormValues((prev)=> ({...prev,userId:e.target.value}))}>
                  {
                      members?.map((el)=> <option key={el._id} value={el._id}>{el.userId?.firstName}</option>)
                  }
              </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Set priority</Form.Label>
              <select onChange={(e)=> setFormValues((prev)=> ({...prev,priority:e.target.value}))}>
                  <option value="low">Low</option>
                  <option value="medium">medium</option>
                  <option value="large">high</option>
              </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Set priority</Form.Label>
              <select onChange={(e)=> setFormValues((prev)=> ({...prev,status:e.target.value}))}>
                  <option value="todo">Todo</option>
                  <option value="progress">Progress</option>
                  <option value="done">Done</option>
              </select>
              </Form.Group>
            <StyledButton loading={loading} varient="primary" value="SUBMIT" className="mt-4"/>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddCard;
