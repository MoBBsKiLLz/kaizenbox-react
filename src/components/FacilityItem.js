import React from 'react';
import { Card, Button } from 'react-bootstrap';

const FacilityItem = ({ facility, onEdit, onDelete }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <Card.Title>{facility.facility_name}</Card.Title>
        <Card.Text>
          <strong>Address</strong> <br />
          {facility.address_1} {facility.address_2} <br />
          {facility.city}, {facility.state} {facility.postal}
        </Card.Text>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="primary" onClick={() => onEdit(facility)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(facility.facilityId)}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FacilityItem;
