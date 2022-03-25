import _ from "lodash";
import React, { Component } from "react";
import Avatar from "react-avatar";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import TrelloBoard from "react-trello";
import { getBoard } from "../../Redux/Board/boardActions";
import { logout } from "../../Redux/user/userActions";
import AddBoard from "../AddBoard/AddBoard";
import AddCard from "../AddCard/AddCard";
import AddMember from "../AddMEmber/AddMember";
import Card from "./Card";


const components = {
  // GlobalStyle: MyGlobalStyle, // global style created with method `createGlobalStyle` of `styled-components`
  // LaneHeader: MyLaneHeader,
  Card: Card,
  // AddCardLink: MyAddCardLink
};
export class Board extends Component {
  state = {
    cards: { lanes: [] },
    show: false,
    member:false,
    selectedBoard: 0,
    card:false,
  };
  componentDidMount = () => {
    this.props.getBoard();
  };
  componentWillReceiveProps = () => {
    this.setBoard(this.state.selectedBoard);
  
   
  };
  setBoard = (index) => {
    let data = this.props?.board?.Data;
    if (data) {
      this.setState((prev)=>({
        ...prev,
        boardId: data[index]._id
      }))
     const _data = data[index].cards.map((c) => ({ ...c.board }));
      let lanes = _.groupBy(_data, "status");
      let cards = [];
      for (const key in lanes) {
        cards = [
          ...cards,
          {
            id: Math.random() * Date.now(),
            title: key,
            cards: lanes[key],
          },
        ];
      }
      this.setCards(cards);
    }
  };
  setCards = (cards) => {
    this.setState((prev) => ({
      ...prev,
      cards: { lanes: cards },
    }));
  };
  render() {
    return (
      <>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand href="#home">
              <span className="text-primary">LINED</span> UP
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() =>
                    this.setState((prev) => ({ ...prev, show: true }))
                  }
                >
                  Add Board
                </Nav.Link>
                <Nav.Link
                  onClick={() =>
                    this.setState((prev) => ({ ...prev, card: true }))
                  }
                >
                  Add Card
                </Nav.Link>
                <Nav.Link
                  onClick={() =>
                    this.setState((prev) => ({ ...prev, member: true }))
                  }
                >
                  Add Member
                </Nav.Link>
              </Nav>
                  {/* {
                    this.state.members?.map((el)=> <Avatar key={el._id} name={el.userId?.firstName} size="10"/>)
                  } */}
            </Navbar.Collapse>
            <NavDropdown title="All Boards" id="basic-nav-dropdown">
              {this.props.board.Data &&
                this.props.board.Data.map((el, i) => (
                  <NavDropdown.Item
                    onClick={() => this.setBoard(i)}
                    key={i}
                  >
                    {el.title}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
            <Navbar.Text>
                <Avatar
                  name={this.props.user.Data?.firstName}
                  style={{ marginRight: "4px", marginBottom: "4px" }}
                  size="30"
                  round={true}
                />
                {this.props.user.Data?.firstName +
                  " " +
                  this.props.user.Data?.lastName}
              </Navbar.Text>
             <Nav.Link onClick={this.props.logout}>
                Logout
              </Nav.Link>
          </Container>
        </Navbar>
        <TrelloBoard
          components={components}
          data={this.state.cards}
        ></TrelloBoard>
        <AddBoard
          show={this.state.show}
          handleClose={() =>
            this.setState((prev) => ({ ...prev, show: false }))
          }
        />
         <AddMember
          show={this.state.member}
          handleClose={() =>
            this.setState((prev) => ({ ...prev, member: false }))
          }
          boardId={this.state.boardId}
        />
           <AddCard
          show={this.state.card}
          handleClose={() =>
            this.setState((prev) => ({ ...prev, card: false }))
          }
          boardId={this.state.boardId}
        />
      </>
    );
  }
}
const mapState = (state) => ({
  board: state.board,
  user: state.user,
});
export default connect(mapState, { getBoard,logout })(Board);
