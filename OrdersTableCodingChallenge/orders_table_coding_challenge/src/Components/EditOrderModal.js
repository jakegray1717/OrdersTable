import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditOrderModal = ({ showUpdateOrderModal, handleCloseUpdateOrderModal, editOrder, setNewEditOrderCreatedBy, 
    setNewEditOrderType, setNewEditOrderCustomerName, handleUpdateOrder }) => {

    return(
        <Modal show={showUpdateOrderModal} onHide={handleCloseUpdateOrderModal}>
        <Modal.Header closeButton>
        <Modal.Title>Update Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Order Id: {editOrder.id}</Form.Label>
                <Form.Group className="mb-3">
                    <Form.Label>Created By</Form.Label>
                    <Form.Control id="createdByTextInput" defaultValue={editOrder.createdBy} onChange={(e) => setNewEditOrderCreatedBy(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Order Type</Form.Label>
                    <Form.Select id="orderTypeSelect" defaultValue={"Standard"} onChange={(e) => setNewEditOrderType(e.target.value)}>
                        <option>Standard</option>
                        <option>Sale Order</option>
                        <option>Purchase Order</option>
                        <option>Transfer Order</option>
                        <option>Return Order</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Customer</Form.Label>
                    <Form.Control id="customerTextInput" defaultValue={editOrder.customerName} onChange={(e) => setNewEditOrderCustomerName(e.target.value)}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleUpdateOrder}>
            Update Order
        </Button>
        </Modal.Footer>
    </Modal>
    );
}

export default EditOrderModal;