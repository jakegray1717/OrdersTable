import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const NewOrderModal = ({ showCreateOrderModal, handleCloseCreateOrderModal, newOrderId, setNewOrderCreatedBy,
    setNewOrderCustomerName, setNewOrderType, handleCreateOrder }) => {

    return(
        <Modal show={showCreateOrderModal} onHide={handleCloseCreateOrderModal}>
            <Modal.Header closeButton>
            <Modal.Title>New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Order Id: {newOrderId}</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label>Created By</Form.Label>
                        <Form.Control id="createdByTextInput" placeholder="John Smith" onChange={(e) => setNewOrderCreatedBy(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Order Type</Form.Label>
                        <Form.Select id="orderTypeSelect" onChange={(e) => setNewOrderType(e.target.value)}>
                            <option value="Standard">Standard</option>
                            <option value="Sale Order">Sale Order</option>
                            <option value="Purchase Order">Purchase Order</option>
                            <option value="Transfer Order">Transfer Order</option>
                            <option value="Return Order">Return Order</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control id="customerTextInput" placeholder="Jane Doe" onChange={(e) => setNewOrderCustomerName(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleCreateOrder}>
                Create Order
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewOrderModal;