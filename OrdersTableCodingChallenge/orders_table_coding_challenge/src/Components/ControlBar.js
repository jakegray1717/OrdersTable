import React from 'react';
import { Navbar, Nav, Form, Dropdown, NavDropdown, Container, Button } from 'react-bootstrap';

const ControlBar = ({ setSearchBarId, handleFilterChange,
     handleSearch, handleDeleteSelected, handleShowCreateOrderModal }) => {

    return(
        <Navbar bg="light" expand="sm">
                <Container fluid>
                    <Navbar.Brand>Orders Catalog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            size="sm"
                        >
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    size="sm"
                                    onChange={(e) => setSearchBarId(e.target.value)}
                                />
                                <Button variant="outline-success" size="sm" onClick={handleSearch}>Search</Button>
                            </Form>
                            <Nav.Link onClick={handleShowCreateOrderModal}>Create Order</Nav.Link>
                            <Nav.Link onClick={handleDeleteSelected}>Delete Selected</Nav.Link>
                            <NavDropdown title="Order Type" id="navbarScrollingDropdown" size="sm">
                                <Dropdown.Item onClick={() => handleFilterChange("Standard")}>Standard</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Sale Order")}>Sale Order</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Purchase Order")}>Purchase Order</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Transfer Order")}>Transfer Order</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleFilterChange("Return Order")}>Return Order</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => handleFilterChange("All Orders")}>All Orders</Dropdown.Item>
                            </NavDropdown>
                        </Nav>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default ControlBar;
