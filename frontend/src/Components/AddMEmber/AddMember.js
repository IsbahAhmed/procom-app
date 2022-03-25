import _, { isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { Card, Form, FormControl, FormGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  addMember } from "../../Redux/Board/boardActions";
import StyledButton from "../StyledButton/StyledButton";

const AddMember = ({ show, handleClose,boardId }) => {
  const [searchValue, setSearchValue] = useState();
  const [loading, setLoading] = useState(false);
  const [memberList, setMembers] = useState([]);
  const board = useSelector((state) => state.board.Data);
  useEffect(() => {
    if (board) {
      const members = _.flatten(board, "members");
      setMembers(members);
    }
  }, [board]);
  const searchMember = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  const dispatch = useDispatch();
  const handleSubmit = async (userId) => {
    dispatch(addMember({boardId,userId}));
    handleClose()
  };
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Board</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormControl
            type="text"
            value={searchValue}
            onChange={searchMember}
          />
          {memberList.length && searchValue
            ? memberList
                .filter((el) => el.title.includes(searchValue))
                .map((el) => (
                  <Card onClick={()=>handleSubmit(el._id)} key={el._id} style={{cursor:"pointer"}}>
                    <Card.Header>{el.title}</Card.Header>
                  </Card>
                ))
            : null}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddMember;
