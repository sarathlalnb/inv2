import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  InputGroup,
  Form,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";
import CardSkeleton from "../../CommonComponents/Card Skeleton/CardSkeleton";
import useApi from "../../hooks/useApi";
import { endpoints } from "../../services/defaults";
import { Link } from "react-router-dom";
import Header from "../../CommonComponents/Header/Header";

export const InvestorHome = () => {
  const [projects, setProject] = useState([]);
  const { request: getProjects } = useApi("get");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterList, setFilterList] = useState([]);
  const navObj = [
    { text: "Dashboard", link: "/investor/home" },
    { text: "My Projects", link: "/investor/projects" },
    { text: "Payments", link: "/investor/payments" },
    { text: "Messages", link: "/investor/messages" },
  ];

  //GET ALL PROJECTS
  const getAllProjects = async () => {
    try {
      let apiResponse;
      const url = `${endpoints.GET_PROJECTS}`;
      apiResponse = await getProjects(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setProject(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //SEARCH
  const handleSearch = () => {
    if (search === "") {
      setFilterList(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.project_name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterList(filtered);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getAllProjects();
    }, 2000);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, projects]);

  return (
    <div>
      <Header navObj={navObj} />

      {loading ? (
        <CardSkeleton />
      ) : (
        <div>
          <Container className="p-lg-5 p-2">
            <InputGroup size="lg" className="mb-3 w-75 mx-auto">
              <Form.Control
                className="border border-black"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroup.Text className="border border-black">
                {" "}
                <i className="fa-solid fa-search" onClick={handleSearch} />
              </InputGroup.Text>
            </InputGroup>
            <Row>
              {filterList && filterList.length > 0 ? (
                filterList.map((project, index) => (
                  <Col lg={4} sm={6} className="p-3" key={index}>
                    <Card className="rounded-0 border-0 text-black grey-card">
                      <Card.Img
                        src={`http://127.0.0.1:8000/${project.image}`}
                        className="project-image rounded-0 m-0"
                      />
                      <Card.Body className="m-0">
                        <h3 className="project-title bg-white py-3 text-center mx-auto">
                          {project.project_name}
                        </h3>
                        <Card.Text style={{ textAlign: "justify" }}>
                          {project.description.slice(0, 100) + "..."}
                        </Card.Text>
                        <small>Target: ₹{project.amount}</small>
                        
                        <div className="text-end">
                          <Link to={`/investor/project/${project.id}`}>
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
                  </Col>
                ))
              ) : (
                <div className="text-danger text-center">
                  <b>No Projects Available....!</b>
                </div>
              )}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};
