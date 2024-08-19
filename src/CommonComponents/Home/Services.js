import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Services() {
  const services = [
    {
      title: "Business Investment",
      image: "https://i.postimg.cc/kgBBbfTq/loan-1.png",
      description:
        "Empower your business with strategic investments that propel growth and maximize returns. Our tailored investment services are designed to unlock opportunities and drive success for your ventures.",
    },
    {
      title: "Project Monitoring",
      image: "https://i.postimg.cc/PxqJzy4t/portfolio-1.png",
      description:
        "Implement a comprehensive tracking and reporting system that allows idea creators and investors to monitor the ongoing progress, milestones, and financial performance of funded projects in real-time",
    },
    {
      title: "Secure Transactions",
      image: "https://i.postimg.cc/13hpc8j8/transaction.png",
      description:
        "Utilize state-of-the-art encryption protocols, implement stringent security measures, and integrate reliable payment gateways to ensure secure and seamless financial transactions within the platform.",
    },
  ];

  return (
    <div className="mb-4 mt-4">
      <Container>
        {" "}
        <h5 className="mb-4">. services</h5>
        <Row>
          {services && services.length > 0 ? (
            services.map((i, index) => (
              <Col lg={4}>
                <div className="services text-center">
                  <h2>{i.title}</h2>
                  <img
                    src={i.image}
                    className="services-Img"
                    style={{ height: "150px", Width: "150px" }}
                    alt=""
                  />
                  <p style={{ textAlign: "justify" }} className="mt-4">
                    {i.description}
                  </p>{" "}
                </div>
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Services;
