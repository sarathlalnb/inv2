import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import "./Home.css";
import investment from "../../Assets/Investment.jpg";
import About from "./About";
import Services from "./Services";
import Reviews from "./Reviews";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const fetchNavObj = () => {
    const navObj = [
      { text: "Home", link: "/" },
      { text: "About Us", link: "/aboutUs" },
      { text: "Services", link: "/services" },
    ];
    return <Header navObj={navObj} />;
  };

  return (
    <>
      <div className="sticky-top">{fetchNavObj()}</div>
      <Container fluid>
        <Row className="">
          <Col lg={6} className="p-5">
            <h1 className="head1 mt-5">
              <b>
                Capital<span className="head2">Clue</span> is a well Known
                Investing Company
              </b>
            </h1>
            <p className="description mt-4 mb-4">
              Unlock the potential of your investments with our intuitive
              discovery platform, empowering you to make informed decisions and
              maximize returns.
            </p>
            {isLogin ? (
              <Link to={"/auth"}>
                <button className="button p-2">
                  Get Started <i class="fa-solid fa-angles-right"></i>
                </button>
              </Link>
            ) : (
              <Link to={"/auth"}>
                <button className="button p-2">
                  Get Started <i class="fa-solid fa-angles-right"></i>
                </button>
              </Link>
            )}
          </Col>
          <Col lg={6} className="p-5">
            <img className="investment-img" src={investment} alt="" />
          </Col>
        </Row>
      </Container>
      <About id="aboutUs" />
      <Services />
      <Reviews />
      <Footer />
    </>
  );
}

export default Home;
