import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Card,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CountrySingle = (props) => {
  const location = useLocation();
  const country = props.country || location.state.country;
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
      })
      .then((response) => {
        setWeather(response.data);
        setIsWeatherLoading(false);
      });
  }, [country.capital]);

  console.log("Weather: ", weather);

  if (isWeatherLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-4">
          <Image
            src={country.flags.svg}
            className="img-fluid rounded shadow-sm"
          />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title className="display-4">
                {country.name.common}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {country.capital}
              </Card.Subtitle>

              <div className="weather-info mt-4">
                <p className="lead">
                  Right now, it's{" "}
                  <strong>{parseInt(weather.main.temp)}°C</strong> in{" "}
                  <strong>{country.capital}</strong> with{" "}
                  <strong>{weather.weather[0].description}</strong>.
                </p>
                <Image
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  className="weather-icon"
                />
              </div>
              <Button
                style={{ backgroundColor: "#343434", color: "F8F8FF" }}
                className="mt-3"
                onClick={() => navigate("/countries")}
              >
                Back to Countries
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
