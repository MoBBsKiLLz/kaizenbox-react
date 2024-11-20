import React, { useEffect, useState } from 'react';
import { getFacilityList } from '../services/facilityService';
import LeftAlignedNavbar from './LeftAlignedNavbar'; // Import the navbar component
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteFacility } from '../services/facilityService';

const FacilityList = () => {
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacilities = async () => {
      const data = await getFacilityList();
      setFacilities(data);
    };
    fetchFacilities();
  }, []);

  const handleDelete = async (facilityId) => {
    try {
      await deleteFacility(facilityId); // Call delete function from the service
      setFacilities(facilities.filter(facility => facility.facilityId !== facilityId)); // Remove deleted facility from local state
      alert('Facility deleted successfully');
    } catch (error) {
      console.error('Error deleting facility:', error);
      alert('Failed to delete facility. Please try again.');
    }
  };

  return (
    <div className="d-flex">
      {/* Left-aligned navbar */}
      <LeftAlignedNavbar />

      {/* Main content container with margin to avoid overlap */}
      <Container fluid className="mt-5" style={{ marginLeft: '220px', padding: '20px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2> Facilities</h2>
          <Button variant="primary" onClick={() => navigate('/facility-form')}>
            Add Facility
          </Button>
        </div>
        <Row>
          {facilities.length > 0 ? (
            facilities.map((facility) => (
              <Col key={facility.facilityId} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{facility.facility_name}</Card.Title>
                    <Card.Text>
                      {/* Add more facility details if needed */}
                      <strong>Address</strong> <br /> 
                      {facility.address_1} {facility.address_2} <br />
                      {facility.city}, {facility.state} {facility.postal}
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                    <Button
                      variant="primary"
                      onClick={() => navigate('/facility-form', { state: { facility: facility } })} // Send facility data via state
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDelete(facility.facilityId)}
                    >
                        Delete
                    </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No facilities available.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default FacilityList;
