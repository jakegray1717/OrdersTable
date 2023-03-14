import React, { Fragment, useEffect, useState } from 'react';
import { Table, Modal} from 'react-bootstrap';
import { Guid } from 'js-guid';
import { ToastContainer, toast } from 'react-toastify';

import OrderRow from './OrderRow';
import ControlBar from './ControlBar';
import NewOrderModal from './NewOrderModal';
import EditOrderModal from './EditOrderModal';

import ordersApi from "../Services/OrdersApi";

const OrdersTable = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('All Orders');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [searchBarId, setSearchBarId] = useState('')

    const [editOrder, setEditOrder] = useState(data[0]);
    const [newEditOrderType, setNewEditOrderType] = useState('Standard');
    const [newEditOrderCustomerName, setNewEditOrderCustomerName] = useState('');
    const [newEditOrderCreatedBy, setNewEditOrderCreatedBy] = useState('');

    const [newOrderId, setNewOrderId] = useState(Guid.newGuid().toString())
    const [newOrderType, setNewOrderType] = useState('Standard');
    const [newOrderCustomerName, setNewOrderCustomerName] = useState('');
    const [newOrderCreatedBy, setNewOrderCreatedBy] = useState('');

    const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
    const handleCloseCreateOrderModal = () => setShowCreateOrderModal(false);
    const handleShowCreateOrderModal = () => {
        //reset newOrderID
        setNewOrderId(Guid.newGuid().toString())
        //show modal
        setShowCreateOrderModal(true)
    }

    const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);
    const handleCloseUpdateOrderModal = () => setShowUpdateOrderModal(false);
    const handleShowUpdateOrderModal = (order) => {
        //populate EditOrder variables
        setEditOrder(order)
        setNewEditOrderCreatedBy(order.createdBy)
        setNewEditOrderCustomerName(order.customerName)
        setNewEditOrderType('Standard')
        //show EditOrderModal
        setShowUpdateOrderModal(true)
    }

    //Initialize the orders list
    useEffect(() => {
        ordersApi.getAllOrders()
        .then((x) => setData(x))
    },[]);

    const handleFilterChange = (orderType) => {
        setFilter(orderType)
        //get the orders by type
        ordersApi.getOrdersByType(orderType)
        .then((x) => setData(x))
    }

    const handleDeleteSelected = () => {
        //delete orders and get new list
        ordersApi.deleteOrders(selectedOrders)
        .then(() => ordersApi.getAllOrders())
        .then((x) => setData(x))
        //reset the selected orders
        .then(() => setSelectedOrders([]))
        //show success toast
        .then(() => toast.success('Order deleted!'))
    }

    const handleUpdateOrder = () => {
        //close modal
        setShowUpdateOrderModal(false);
        //update the order in API and get new list
        ordersApi.updateOrder(editOrder.id, newEditOrderCreatedBy,
            newEditOrderType, newEditOrderCustomerName, editOrder.createdDate)
        .then(() => ordersApi.getAllOrders())
        .then((x) => setData(x))
        //show success toast
        .then(() => toast.success('Order updated!'))
        
    }

    const handleSearch = () => {
        //when nothing is in searchbar, reset list to all orders
        if(searchBarId === ''){
            ordersApi.getAllOrders()
            .then((x) => setData(x))
        } else {
            //search through API
            ordersApi.getOrderById(searchBarId)
            .then((x) => setData(x))
        }
    }

    const handleCreateOrder = () => {
        setShowCreateOrderModal(false);
        //Create new order and get new list
        ordersApi.createNewOrder(newOrderId, newOrderCreatedBy, newOrderType, newOrderCustomerName)
        .then(() => ordersApi.getAllOrders())
        .then((x) => setData(x))
        //show success toast
        .then(() => toast.success('Order created!'))
        
    }

    const handleCheckboxClick = (id) => {
        let newSelectedOrders = [...selectedOrders];
        //Remove id from selectedOrders if it exists in table (uncheck)
        if (selectedOrders.includes(id)) {
            let index = selectedOrders.indexOf(id);
            newSelectedOrders.splice(index, 1);
            setSelectedOrders([...newSelectedOrders]);
        //Add id the selectedOrders (check)    
        } else {
            newSelectedOrders.push(id);
            setSelectedOrders(newSelectedOrders);
        }
    }

    return (
        <Fragment>
            <ToastContainer />

            <ControlBar setSearchBarId={setSearchBarId} handleFilterChange={handleFilterChange} 
            handleSearch={handleSearch} handleDeleteSelected={handleDeleteSelected} handleShowCreateOrderModal={handleShowCreateOrderModal} />

            <Table striped hover size="sm">
                <thead>
                    <tr>
                    <th></th>
                    <th>Order Id</th>
                    <th>Creation Date</th>
                    <th>Created By</th>
                    <th>Order Type</th>
                    <th>Customer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                        data.map((item, index) => {
                            if (item.type === filter || filter === "All Orders") {
                                return (
                                        <OrderRow key={`${item.id}-OrderRow`} item={item} handleCheckboxClick={handleCheckboxClick} 
                                        handleShowUpdateOrderModal={handleShowUpdateOrderModal}/>
                                    ) 
                                }
                                return <></>;
                            })
                        :   <tr>
                                <td>No Results...</td>
                            </tr>
                    }
                </tbody>
            </Table>

            <NewOrderModal showCreateOrderModal={showCreateOrderModal} handleCloseCreateOrderModal={handleCloseCreateOrderModal} newOrderId={newOrderId} 
            setNewOrderCreatedBy={setNewOrderCreatedBy} setNewOrderCustomerName={setNewOrderCustomerName} setNewOrderType={setNewOrderType} handleCreateOrder={handleCreateOrder} />

            {
                editOrder ? 
                    <EditOrderModal showUpdateOrderModal={showUpdateOrderModal} handleCloseUpdateOrderModal={handleCloseUpdateOrderModal} editOrder={editOrder} 
                    setNewEditOrderCreatedBy={setNewEditOrderCreatedBy} setNewEditOrderType={setNewEditOrderType} setNewEditOrderCustomerName={setNewEditOrderCustomerName} 
                    handleUpdateOrder={handleUpdateOrder} />
                : <Modal></Modal>
            }

        </Fragment>
    );

}

export default OrdersTable;