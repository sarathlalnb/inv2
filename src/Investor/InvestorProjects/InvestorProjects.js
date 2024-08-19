import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  InputGroup,
  Row
} from "react-bootstrap";
import "./InvestorProject.css";
import { Link } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import Header from "../../CommonComponents/Header/Header";

function InvestorProjects() {
  const { request: getProjects } = useApi("get");
  const [allProject, setAllProject] = useState([]);
  const [search, setSearch] = useState("");
  const [filterList, setFilterList] = useState([]);

  // GET ALL PROJECTS
  const getAllProjects = async () => {
    try {
      const url = `${endpoints.GET_PROJECTS}`;
      const apiResponse = await getProjects(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setAllProject(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  // SEARCH
  const handleSearch = () => {
    if (search === "") {
      setFilterList(allProject);
    } else {
      const filtered = allProject.filter((project) =>
        project.project_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterList(filtered);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, allProject]);

  return (
    <>
      <div className="sticky-top">
        <Header />
      </div>
      <div className="main-div">
        <Container className="p-lg-5 p-2 text-center">
          <InputGroup size="lg" className="mb-3 w-75 mx-auto">
            <Form.Control
              className="border border-black"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroup.Text className="border border-black">
              <i className="fa-solid fa-search" />
            </InputGroup.Text>
          </InputGroup>
          <Row>
            {filterList.length > 0
              ? filterList.map((project, index) => (
                <Col lg={4} sm={6} className="p-3" key={index}>
                  <Card className="rounded-0 border-0 text-black grey-card">
                    <Card.Img
                      src={`http://127.0.0.1:8000/${project.image}`} // Consider using a config or env variable
                      className="project-image rounded-0 m-0"
                      alt={project.project_name}
                    />
                    <Card.Body className="m-0">
                      <h3 className="project-title bg-white py-3 text-center mx-auto">
                        {project.project_name}
                      </h3>
                      <Card.Text>{project.description}</Card.Text>
                     
                      <small>Target: ₹{project.amount}</small>
                      
                      <div className="text-end">
                        <Link to={`/projectview/${project.id}`}>
                          <Button
                            variant="outline-dark rounded-0"
                            className="ms-auto"
                          >
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
              : "No projects"}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default InvestorProjects;
