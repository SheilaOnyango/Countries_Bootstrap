import { Button, Card, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CountryCard = ({ country, isFavouriteView = false }) => {
  const dispatch = useDispatch();

  return (
    <Col className="mt-4" key={country.name.official}>
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
          <Card.Title className="mb-1">{country.name.common}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {country.name.official}
          </Card.Subtitle>

          <ListGroup variant="flush" className="mb-2">
            <ListGroupItem className="py-1">
              <i className="bi bi-people me-2">
                {country.population.toLocaleString()}
              </i>
            </ListGroupItem>
            <ListGroupItem className="py-1">
              <i className="me-2">
                {Object.values(country.currencies || {})
                  .map((currency) => currency.name)
                  .join(", ") || "No currency"}
              </i>
            </ListGroupItem>
            <ListGroupItem className="py-1">
              <i className="me-2">
                {Object.values(country.languages || {})
                  .map((language) => language)
                  .join(", ") || "No languages"}
              </i>
            </ListGroupItem>
          </ListGroup>

          {!isFavouriteView && (
            <Button
              variant="primary"
              className="mt-2"
              onClick={() => dispatch(addFavourite(country.name.common))}
            >
              Add Favourite
            </Button>
          )}

          <Button
            variant="warning"
            className="mt-2"
            onClick={() => dispatch(removeFavourite(country.name.common))}
          >
            Remove Favourite
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CountryCard;
