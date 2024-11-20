import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import LeftAlignedNavbar from './LeftAlignedNavbar';
import { createFacility, editFacility } from '../services/facilityService';

const FacilityForm = () => {
    const [facilityId, setFacilityId] = useState('');
    const [facilityName, setFacilityName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postal, setPostal] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const isEditMode = !!location.state?.facility;

    useEffect(() => {
        if (isEditMode) {
            const { facility } = location.state;
            setFacilityId(facility.facilityId);
            setFacilityName(facility.facility_name);
            setAddress1(facility.address_1);
            setAddress2(facility.address_2);
            setCity(facility.city);
            setState(facility.state);
            setPostal(facility.postal);
            setContactNumber(facility.contact_number);
            setEmail(facility.email);
        }
    }, [isEditMode, location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const facilityData = {
            facilityId, facilityName, address1, address2, city, state, postal, contactNumber, email
        };

        try {
            if (isEditMode) {
            // For editing, include the facilityId and use PUT request
            await editFacility(facilityData);
            alert('Facility updated successfully');
            } else {
            // For creating new facility
            await createFacility(facilityData);
            alert('New facility created successfully');
            }
            navigate('/facilities'); // Navigate back to the facility list
        } catch (error) {
            console.error('Error saving facility:', error);
            alert('There was an error processing your request. Please try again.');
        }
    };

  return (
    <div className="d-flex">
        {/* Left-aligned navbar */}
        <LeftAlignedNavbar />
        <Container fluid className="mt-5" style={{ maxWidth: '600px' }}>
        <h2>{isEditMode ? 'Edit' : 'Create'} Facility</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="facilityName">
            <Form.Label>Facility Name</Form.Label>
            <Form.Control
                type="text"
                value={facilityName}
                onChange={(e) => setFacilityName(e.target.value)}
                required
            />
            </Form.Group>
            <Form.Group controlId="address1">
            <Form.Label>Address 1</Form.Label>
            <Form.Control
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
            />
            </Form.Group>
            <Form.Group controlId="address2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
            />
            </Form.Group>
            <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
            />
            </Form.Group>
            <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
            />
            </Form.Group>
            <Form.Group controlId="postal">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                type="text"
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                required
            />
            </Form.Group>
            <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
            />
            </Form.Group>
            <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                {isEditMode ? 'Update Facility' : 'Create Facility'}
            </Button>
        </Form>
        </Container>
    </div>
  );
};

export default FacilityForm;
