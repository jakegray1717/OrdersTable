import axios from "axios";
import dateformat from "dateformat";

const baseUrl = 'https://jakegrayordersapi.azurewebsites.net/api/Orders';

const ordersApi = {
    getAllOrders : async function() {
        let orders;
        await axios.get(baseUrl)
        .then((result) => {
            orders = result.data
        })
        .catch((error) => {
            console.log(error)
        })
        return orders;
    },

    getOrdersByType : async function (type) {
        let orders = [];
        await axios.get(`${baseUrl}/Type/${type}`)
        .then((result) => {
            orders = result.data
        })
        .catch((error) => {
            console.log(error)
        })
        return orders;
    },

    getOrderById : async function (id) {
        let order = [];
        await axios.get(`${baseUrl}/Id/${id}`)
        .then((result) => {
            order.push(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
        return order;
    },

    createNewOrder : async function (id, createdBy, type, customer) {
        let now = new Date()
        let body = {
            "id": id,
            "type": type,
            "customerName": customer,
            "createdDate": dateformat(now, "mmmm dS, yyyy"),
            "createdBy": createdBy
        }
        await axios.post(baseUrl, body)
        .catch((error) => {
            console.log(error)
        })
    },

    updateOrder : async function (id, createdBy, type, customer, date) {
        let body = {
            "id": id,
            "type": type,
            "customerName": customer,
            "createdDate": date,
            "createdBy": createdBy
        }
        await axios.put(baseUrl, body)
        .catch((error) => {
            console.log(error)
        })
    },

    deleteOrders : async function (orderIds) {
        let body = orderIds
        let url = `${baseUrl}/Delete`
        await axios.post(url, body)
        .catch((error) => {
            console.log(error)
        })
    },
}

export default ordersApi;