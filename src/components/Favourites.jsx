import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  clearFavourites,
  getFavouritesFromSource,
} from "../store/favouritesSlice";
import CountryCard from "./CountryCard";

const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const [search, setSearch] = useState("");
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);

  // Filter the countries to include on the selected favourites
  countriesList = countriesList.filter((country) =>
    favouritesList.includes(country.name.common)
  );

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  // Handle loading state
  if (countriesLoading || favouritesLoading) {
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
      <Row className="mt-5">
        <Col className="d-flex justify-content-center" xs={12} md={6}>
          <Form>
            <Form.Control
              style={{ width: "18rem", borderRadius: "25px" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>

        <Col className="d-flex justify-content-end" xs={12} md={6}>
          <Button
            onClick={() => dispatch(clearFavourites())}
            style={{
              backgroundColor: "#343434",
              color: "#F8F8FF",
              border: "none",
              borderRadius: "25px",
              padding: "0.6rem 1.5rem",
            }}
          >
            Clear Favourites
          </Button>
        </Col>
      </Row>

      <Row xs={2} md={3} lg={4} className="g-3">
        {countriesList
          .filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((country) => (
            <Col
              className="mt-5 d-flex align-items-stretch"
              key={country.name.official}
            >
              <CountryCard
                key={country.name.common}
                country={country}
                isFavouriteView={true}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Favourites;
