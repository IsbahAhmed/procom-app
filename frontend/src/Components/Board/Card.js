import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Card.css";
const MyCard = (props) => {
  const { description, title, laneId, index, label, className ,...rest} = props;
    return (
    <Card className={className}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title className="grab">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
    <p>Priority: {props.priority}</p>       
      </Card.Body>
    </Card>
  );
};

export default MyCard;
