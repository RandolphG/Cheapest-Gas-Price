import React, { Component } from "react";
import "./App.css";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import {
  Badge,
  Button,
  ButtonGroup,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Image,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
  Row
} from "react-bootstrap";
// lodash for sorting data
const _ = require("lodash");
// imported JSON data
const loadData = require("./data/list.json");

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];
const trans = (x, y, s) =>
  `perspective(200px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: "",
      showModal: true,
      data: loadData,
      style: {
        padding: "10px 10px",
        boxShadow: "6px 6px 5px -4px rgba(0,0,0,0.86)"
      }
    };
  }

  /*
   * toggle modal view
   * */
  toggleModal(event) {
    console.log("clicked");
    this.setState({ showModal: !this.state.showModal });
    console.log(this.state.showModal);
  }

  /*
   * sort list object by station
   * */
  toggleSortAddress(event) {
    const { data } = this.state;
    let newList = data;
    this.setState({
      data: _.orderBy(newList, ["Station"], ["asc", "desc"])
    });
  }
  /*
   * sorting list object by price
   * */
  toggleSortPrice(event) {
    const { data } = this.state;
    let newList = data.sort(function(a, b) {
      return a.Price - b.Price;
    });
    this.setState({
      data: newList
    });
  }

  /*
   * set state to show price
   * */
  showPrice(event) {
    this.setState({ info: "price" });
  }

  /*
   * set state to show address
   * */
  showAddress(event) {
    this.setState({ info: "address" });
  }

  /*
   * sort list once component is mounted
   * */
  componentDidMount() {
    this.toggleSortPrice();
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: "black" }}>
        <Container
          style={{
            paddingBottom: 10
          }}
        >
          <Top
            sortPrice={this.toggleSortPrice.bind(this)}
            sortAddress={this.toggleSortAddress.bind(this)}
            showImg={this.toggleModal.bind(this)}
          />
          <ListGroup variant={"flush"}>
            {this.state.data.map(data => (
              <ListGroupItem action key={data.id} variant={"primary"}>
                <Row>
                  <Col md={2}>
                    <GetBadge
                      id={data.id}
                      price={data.Price}
                      style={this.state.style}
                    />
                  </Col>
                  <Col
                    style={{
                      textAlign: "left",
                      color: "black"
                    }}
                    md={6}
                  >
                    <strong>{data.Station}</strong>
                    <br />
                    <a
                      style={{ color: "black", textDecoration: "none" }}
                      href={`https://maps.google.com/?q= ${data.Station} ${data.Address}`}
                      target={"blank"}
                    >
                      {data.Address}
                    </a>
                  </Col>
                  <Col style={{ textAlign: "right", color: "black" }} md={4}>
                    {data.GasName}
                    <br />${data.Price}
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
          <ScrollUpButton />
          <VerticalModal
            boxShadow={this.state.style.boxShadow}
            showAddress={this.showAddress.bind(this)}
            showPrice={this.showPrice.bind(this)}
            showImg={this.toggleModal.bind(this)}
            info={this.state.info}
            myData={this.state.data}
            show={this.state.showModal}
            name={"randi"}
            address={"address"}
            phone={"phone"}
          />
        </Container>
      </div>
    );
  }
}

function Top(props) {
  return (
    <Navbar sticky={"top"} bg={"dark"} variant={"dark"}>
      <NavbarBrand>
        <em>Cheapest Gas Price </em>
      </NavbarBrand>
      <ButtonGroup size={"sm"}>
        <Button variant={"outline-primary"} onClick={props.sortAddress} block>
          Address
        </Button>
        <Button variant={"outline-primary"} onClick={props.sortPrice}>
          Price
        </Button>
        <Button variant={"outline-primary"} onClick={props.showImg}>
          Modal
        </Button>
      </ButtonGroup>
    </Navbar>
  );
}

/*
 * default green badge
 * */
function GreenBadge(props) {
  return (
    <Badge style={props.style} variant={"success"}>
      Station{" "}
      <Badge pill variant={"dark"}>
        {props.id}
      </Badge>
    </Badge>
  );
}

/*
 * default yellow badge
 * */
function YellowBadge(props) {
  return (
    <Badge style={props.style} variant={"warning"}>
      Station{" "}
      <Badge pill variant={"dark"}>
        {props.id}
      </Badge>
    </Badge>
  );
}

/*
 * default yellow badge
 * */
function BlueBadge(props) {
  return (
    <Badge style={props.style} variant={"primary"}>
      Station{" "}
      <Badge pill variant={"dark"}>
        {props.id}
      </Badge>
    </Badge>
  );
}
/*
 * default red badge
 * */
function RedBadge(props) {
  return (
    <Badge style={props.style} variant={"danger"}>
      Station{" "}
      <Badge pill variant={"dark"}>
        {props.id}
      </Badge>
    </Badge>
  );
}
/*
 * returns badge color determined by price
 * */
function GetBadge(props) {
  const price = props.price;
  const id = props.id;
  if (price > 10) {
    return <RedBadge id={id} style={props.style} />;
  } else if (price < 9.9 && price > 9.8) {
    return <YellowBadge id={id} style={props.style} />;
  } else if (price < 10 && price > 9.9) {
    return <BlueBadge id={id} style={props.style} />;
  }
  return <GreenBadge id={id} style={props.style} />;
}

/*
 * simple implementation of a carousel
 * */
function CarouselObjects(props) {
  const myState = props.myData;
  return (
    <Col>
      <Carousel
        controls={false}
        indicators={true}
        touch={true}
        keyboard={true}
        fade={false}
      >
        {props.info === "price"
          ? myState.map(data => (
              <CarouselItem key={data.id}>
                <Button style={{ height: 40 }} variant={"outline-dark"}>
                  {data.Price}
                </Button>
              </CarouselItem>
            ))
          : myState.map(data => (
              <CarouselItem key={data.id}>
                <Button style={{ height: 40 }} variant={"outline-dark"}>
                  {data.Station}
                </Button>
              </CarouselItem>
            ))}
      </Carousel>
    </Col>
  );
}

/*
 * simple implementation of a modal
 * */
function VerticalModal(props) {
  return (
    <Modal {...props} size={"large"} variant={"dark"} bg={"dark"} centered>
      <ModalBody>
        <Container>
          <Row style={{ backgroundColor: "#ffffff", padding: 5 }}>
            <Col style={{ color: "black" }}>
              <Row>
                <Col
                  xs={6}
                  variant={"danger"}
                  style={{
                    padding: 10,
                    textAlign: "center"
                  }}
                >
                  <Image
                    style={{
                      height: 200,
                      borderRadius: 10,
                      boxShadow: props.boxShadow
                    }}
                    src={
                      "https://scontent.fzag2-1.fna.fbcdn.net/v/t1.0-9/67437668_10100690449043333_6570859161796476928_n.jpg?_nc_cat=104&_nc_oc=AQmql7YMEbOIXHMvHM2pAiNjIAnjUwvr8HytcHa40PGVtlOt0_gR13a8RmxaugLvneg&_nc_ht=scontent.fzag2-1.fna&oh=101adcefa7171226e7edff1625a8e381&oe=5E5B109A"
                    }
                    fluid
                  />
                </Col>
                <Col
                  xs={6}
                  style={{
                    marginTop: 10
                  }}
                >
                  {/*
                  <Victory />
*/}
                  <Jumbotron as={"div"}>
                    <Row>
                      <Col xs={"auto"}>
                        <Button
                          xs={"sm"}
                          variant={"outline-dark"}
                          onClick={props.showPrice}
                        >
                          price
                        </Button>
                      </Col>
                      <Col xs={6}>
                        <Button
                          style={{ backgroundColor: "#83afff" }}
                          xs={"sm"}
                          variant={"outline-dark"}
                          onClick={props.showAddress}
                        >
                          address
                        </Button>
                      </Col>
                    </Row>
                  </Jumbotron>
                </Col>
              </Row>
              <Jumbotron>
                <Row style={{ padding: 5 }}>
                  <Col md={{ span: 9 }}>
                    <CarouselObjects info={props.info} myData={props.myData} />
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.showImg} variant={"outline-dark"}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default App;
