import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function NoItem({ itemName }) {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>No {itemName} Found</Card.Title>
        <Card.Text>
          It seems you haven't added any {itemName} to your order yet. Click the
          button below to go search flights and add!
        </Card.Text>
        <Link to="/flightSearch/searchForm">
          <Button variant="warning" className="rounded-0 text-secondary">
            Go to Search
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default NoItem;
