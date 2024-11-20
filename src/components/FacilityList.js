import React, { useEffect, useState } from 'react';
import { getFacilityList, deleteFacility } from '../services/facilityService';
import LeftAlignedNavbar from './LeftAlignedNavbar';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FacilityItem from './FacilityItem';

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
      setFacilities(facilities.filter((facility) => facility.facilityId !== facilityId)); // Remove deleted facility from local state
      alert('Facility deleted successfully');
    } catch (error) {
      console.error('Error deleting facility:', error);
      alert('Failed to delete facility. Please try again.');
    }
  };

  const handleEdit = (facility) => {
    navigate('/facility-form', { state: { facility } }); // Navigate to FacilityForm with facility data
  };

  return (
    <div className="d-flex">
      {/* Left-aligned navbar */}
      <LeftAlignedNavbar />

      {/* Main content container with margin to avoid overlap */}
      <Container fluid className="mt-5" style={{ marginLeft: '220px', padding: '20px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Facilities</h2>
          <Button variant="primary" onClick={() => navigate('/facility-form')}>
            Add Facility
          </Button>
        </div>
        <Row>
          {facilities.length > 0 ? (
            facilities.map((facility) => (
              <Col key={facility.facilityId} md={4} className="mb-4">
                <FacilityItem
                  facility={facility}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
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
