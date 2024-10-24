import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";

const Home = () => {
  const [mapImage, setMapImage] = useState("");
  const [loading, setLoading] = useState(true); // Initializing the loading state
  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
  const searchTerm = "globe";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}`
        );
        const url = response.data.hits[0]?.webformatURL || "";
        setMapImage(url);
      } catch (error) {
        console.error("Error fetching image from Pixabay API", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [apiKey]);

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-4">The Countries App</h1>
          <p className="lead mb-4">
            This is a simple React-Bootstrap project for countries from around
            the world. The app allows users to view information about each
            country, for example population, language, currency. It also allows
            users to add and remove favourites.
          </p>
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col md={8} lg={6}>
          {loading ? ( // spinner
            <Spinner animation="border" variant="primary" />
          ) : (
            mapImage && (
              <Card className="shadow-lg mb-4">
                <Image
                  src={mapImage}
                  alt="World Map"
                  fluid
                  rounded
                  style={{
                    display: mapImage ? "block" : "none",
                    transition: "opacity 0.5s ease-in",
                    opacity: 1,
                    padding: "1rem",
                  }}
                />
                <Card.Body>
                  <Card.Text className="mb-4">
                    Click the button below to start exploring different
                    countries of the world!
                  </Card.Text>
                  <Button
                    style={{
                      backgroundColor: "#343434",
                      color: "#F8F8FF",
                      border: "none",
                    }}
                    href="/countries"
                  >
                    Explore Countries
                  </Button>
                </Card.Body>
              </Card>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
