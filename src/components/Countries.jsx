import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeCountries } from "../services/countriesServices";
import { search } from "../store/countriesSlice";
import { addFavourite } from "../store/favouritesSlice";

const Countries = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const favouritesList = useSelector((state) => state.favourites.favourites);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  // Handle loading state
  if (isLoading) {
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
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-center mt-5">
          <Form>
            <Form.Group className="d-flex justify-content-center">
              <Form.Control
                style={{ width: "18rem" }}
                type="search"
                className="rounded me-2"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => dispatch(search(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries
          .filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(searchInput.toLowerCase());
          })
          .map((country) => (
            <Col
              className="mt-5 d-flex align-items-stretch"
              key={country.name.official}
            >
              <Card className="h-100">
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-center"
                  >
                    <ListGroupItem>
                      <i className="bi bi-people me-2">
                        {country.population.toLocaleString()}
                      </i>
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="me-2">
                        {Object.values(country.currencies || {})
                          .map((currency) => currency.name)
                          .join(", ") || "No currency"}
                      </i>
                    </ListGroupItem>
                    <ListGroupItem>
                      <i className="me-2">
                        {Object.values(country.languages || {})
                          .map((language) => language)
                          .join(", ") || "No languages"}
                      </i>
                    </ListGroupItem>
                  </ListGroup>
                  {/* Conditional rendering for Add/Added to Favourites */}
                  {favouritesList.includes(country.name.common) ? (
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#006400",
                        borderColor: "#006400",
                      }}
                      disabled
                      className="mt-3 text-white"
                    >
                      Added to Favourite
                    </Button>
                  ) : (
                    <Button
                      style={{
                        backgroundColor: "#343434",
                        borderColor: "#343434",
                      }}
                      onClick={() =>
                        dispatch(addFavourite(country.name.common))
                      }
                      className="mt-3 text-white"
                    >
                      Add to Favourite
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
