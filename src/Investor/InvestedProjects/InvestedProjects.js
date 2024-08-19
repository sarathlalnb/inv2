import React, { useEffect, useState } from "react";
import Header from "../../CommonComponents/Header/Header";
import {
  Button,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import { Link, useParams } from "react-router-dom";

function InvestedProjects() {
  //NAV OBJECTS
  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/investor/messages" },
  ];

  //GET INVESTED PROJECTS
  const { request: investedProjects } = useApi("get");
  const [investedProject, setInvestedProject] = useState({});
  const { id } = useParams();
  const getInvestedProjects = async () => {
    try {
      const getInvestedProjectsUrl = `${endpoints.GET_INVESTMENTS}`;
      let InvestedProjectsDetails = await investedProjects(
        getInvestedProjectsUrl
      );
      const { response, error } = InvestedProjectsDetails;
      setInvestedProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //USEEFFECT TO FETCH INVESTED PROJECTS
  useEffect(() => {
    getInvestedProjects();
  }, []);

  return (
    <>
      <div className="sticky-top">
        <Header navObj={navObj} />
      </div>
      <Container className="mb-5">
        <h3 className="mt-3">Invested Projects</h3>
        <div className="d-flex flex-wrap">
          {investedProject?.length > 0 ? (
            investedProject.map((item, index) => (
              <Card className="rounded-0 border-1 m-2 text-black bg-grey">
                <Card.Img
                  src={`http://127.0.0.1:8000/${item.image}`}
                  className="project-image rounded-0 m-0"
                />
                <Card.Body className="m-0">
                  <h3 className="project-title bg-white py-3 text-center mx-auto">
                    {item.project_name}
                  </h3>
                  <Card.Text style={{ textAlign: "center" }}>
                    {item.description.slice(0, 100)}
                  </Card.Text>
                  <small className="text-center">
                    <b>Target:</b> ₹{item.amount}
                    
                  </small>

                  <div className="text-end">
                    <Link to={`/investor/project/${item.id}`}>
                      <Button
                        variant="outline-dark rounded-0"
                        className="ms-auto "
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </Button>
                    </Link> 
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-danger text-center">
              <b>No Projects Available....!</b>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default InvestedProjects;
