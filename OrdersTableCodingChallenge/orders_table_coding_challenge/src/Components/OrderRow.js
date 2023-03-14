import React from 'react'
import { Form } from 'react-bootstrap'

const OrderRow = ({ item, handleCheckboxClick, handleShowUpdateOrderModal}) => {

    return (
        <tr key={item.id}>
            <td>
            <Form>
                <div key={`${item.id}-box`} className="mb-3">
                <Form.Check 
                    id={`${item.id}-checkbox`} onClick={() => handleCheckboxClick(item.id)}
                />
                </div>
            </Form>
            </td>
            <td>{item.id}</td>
            <td>{item.createdDate}</td>
            <td>{item.createdBy}</td>
            <td>{item.type}</td>
            <td>{item.customerName}</td>
            <td>
                <button className="btn btn-primary" onClick={() => handleShowUpdateOrderModal(item)}>Edit</button>
            </td>
        </tr>

    )
}

export default OrderRow;
