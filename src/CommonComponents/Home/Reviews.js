import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "react-bootstrap/Carousel";
import Rating from "@mui/material/Rating";

function Reviews() {
  const reviews = [
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam explicabo doloremque doloribus atque ullam dolor commodi, ex expedita optio iste quidem perspiciatis ratione, dignissimos molestiae ducimus, necessitatibus quisquam sed repellat.",
      image:
        "https://i.postimg.cc/Z517db28/professional-profile-pictures-1427-x-1920-txfewtw6mcg0y6hk.jpg",
      name: "Mery",
      rating:"5"
    },
    {
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur veritatis voluptate architecto necessitatibus, sapiente tenetur odit in qui ad iure voluptas illo voluptates labore dolor? Nostrum ex ea totam harum.",
      image:
        "https://i.postimg.cc/Z517db28/professional-profile-pictures-1427-x-1920-txfewtw6mcg0y6hk.jpg",
      name: "John",
      rating:"4"

    },
    {
      text: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, suscipit sed labore in accusamus fuga animi eius a voluptas, at illo quisquam tenetur ut sit consequuntur, perspiciatis corporis aut doloribus.",
      image:
        "https://i.postimg.cc/Z517db28/professional-profile-pictures-1427-x-1920-txfewtw6mcg0y6hk.jpg",
      name: "Alice",
      rating:"3"

    },
    {
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti eius maiores, asperiores, autem est at reprehenderit tempora quibusdam ipsum hic officia veniam nobis impedit sit omnis dolor explicabo? Quo, commodi?",
      image:
        "https://i.postimg.cc/Z517db28/professional-profile-pictures-1427-x-1920-txfewtw6mcg0y6hk.jpg",
      name: "Bob",
      rating:"5"

    },
  ];

  const groupedReviews = [];
  for (let i = 0; i < reviews.length; i += 2) {
    groupedReviews.push(reviews.slice(i, i + 2));
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 className="mb-4">. reviews</h5>
      <h3 className="review-head">
        <b>
          What People <br /> Says About Us..
        </b>
      </h3>
      <Carousel className="mt-4" interval={2000}>
        {groupedReviews.map((group, index) => (
          <Carousel.Item key={index}>
            <Container>
              <Row>
                {group.map((review, subIndex) => (
                  <Col key={subIndex} className="review shadow p-5">
                    <div className="review-text">
                      <i class="fa-solid fa-quote-left fw-1 fs-1"></i>
                      <p>{review.text}</p>
                    
                    </div>
                    <div className="text-center">
                      <Rating
                         name="read-only"
                          value={review.rating}
                         
                        />
                    </div>
                    <div className="review-details text-center ">
                      <img
                        src={review.image}
                        className="review-profile"
                        alt=""
                      />
                      <h4>
                        <b>{review.name}</b>
                      </h4>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Reviews;
