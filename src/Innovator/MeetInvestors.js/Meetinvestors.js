import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Header from "../../CommonComponents/Header/Header";
import InvestorProfilePage from "./InvestorProfilePage";

function Meetinvestors() {
  const navObj = [
    { text: "Dashboard", link: "/innovator/home" },
    { text: "My Projects", link: "/innovator/projects" },
    { text: "Messages", link: "/innovator/messages" },
  ];

  const { request: getInvestors } = useApi("get");
  const [investorList, setInvestorList] = useState([]);
  const getAllInvestors = async () => {
    try {
      let url = `${endpoints.GET_ALL_INVESTORS}`;
      let apiResponse = await getInvestors(url);
      const { response, error } = apiResponse;
      if (!error && response) {
        setInvestorList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllInvestors();
  }, []);

  return (
    <div>
      <Header navObj={navObj} />
      <Container >
        <h3 className="pt-5 ps-2">Meet The Investors</h3>
        <div className="pb-5 d-flex">
          <div className="d-flex flex-wrap">
            {investorList?.length > 0 ? (
              investorList.map((item, index) => (
                <InvestorProfilePage key={index} investor={item} />
              ))
            ) : (
              <div className="text-danger text-center">
                <b>No Investors Available</b>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Meetinvestors;
