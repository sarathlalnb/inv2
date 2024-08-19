import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { endpoints } from "../../services/defaults";
import useApi from "../../hooks/useApi";
import "./InvestorProfile.css";

function InvestorProfilePage({ investor }) {
  const emailAddress = investor.email;

  function handleEmail() {
    window.location.href = `mailto:${emailAddress}`;
  }

  return (
    <div>
      <div class="container mt-2 mb-2 d-flex">
        <div class="cardInvestor p-4">
          <div class=" image d-flex flex-column justify-content-center align-items-center">
            <button class="btn btn-secondary">
              <img
                src="https://st2.depositphotos.com/11742109/48212/v/450/depositphotos_482126922-stock-illustration-anonymous-profile-avatar-side-view.jpg"
                height="100"
                width="100"
                style={{ borderRadius: "5px" }}
              />
            </button>
            <span class="name mt-3">{investor.name}</span>
            <span>@{investor.username}</span>
            <div class="d-flex flex-row justify-content-center align-items-center gap-2"></div>
            <div class="text-center mt-3">
              <span>
                <b>{investor.full_name}</b>
                <br />
              </span>
              <span>
                {/* <b>Email: </b> */}
                {investor.email}
                <br />
              </span>
              <span>
                {/* Mobile:*/}
                {investor.mobile}
                <br />
              </span>
              <a
                href={`mailto:${emailAddress}`}
                className="btn btn-light"
                onClick={handleEmail}
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorProfilePage;
