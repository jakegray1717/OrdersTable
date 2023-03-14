import ordersApi from "./ordersApi";

describe("Orders API", () => {
  test("should get all orders", async () => {
    const orders = await ordersApi.getAllOrders();
    expect(Array.isArray(orders)).toBe(true);
  });

  test("should get orders by type", async () => {
    const orders = await ordersApi.getOrdersByType("Standard");
    expect(Array.isArray(orders)).toBe(true);
  });

  test("should get order by ID", async () => {
    const orderId = "ab6db441-15ee-46ef-b754-90de223a221d";
    const createdBy = "testUser";
    const type = "Standard";
    const customer = "John Doe";

    await ordersApi.createNewOrder(orderId, createdBy, type, customer);
    const [order] = await ordersApi.getOrderById(orderId);

    expect(order.id).toBe(orderId);

    await ordersApi.deleteOrders([orderId])
  });

  test("should create a new order", async () => {
    const id = "sab6db441-15ee-46ef-b754-90de223a221d";
    const createdBy = "testUser";
    const type = "Standard";
    const customer = "John Doe";

    await ordersApi.createNewOrder(id, createdBy, type, customer);
    const [newOrder] = await ordersApi.getOrderById(id);

    expect(newOrder.createdBy).toBe(createdBy);
    expect(newOrder.type).toBe(type);
    expect(newOrder.customerName).toBe(customer);

    await ordersApi.deleteOrders([id])
  });

  test("should update an existing order", async () => {
    const id = "someOrderIdToUpdate";
    const createdBy = "testUser";
    const type = "someType";
    const customer = "Jane Doe";
    const createdDate = "March 10th, 2023"
    const newCreatedBy = "testUser";
    const newType = "someType";
    const newCustomer = "Jane Doe";

    await ordersApi.createNewOrder(id, createdBy, type, customer);
    await ordersApi.updateOrder(id, newCreatedBy, newType, newCustomer, createdDate);
    const [updatedOrder] = await ordersApi.getOrderById(id);

    expect(updatedOrder.createdBy).toBe(newCreatedBy);
    expect(updatedOrder.type).toBe(newType);
    expect(updatedOrder.customerName).toBe(newCustomer);
    expect(updatedOrder.createdDate).toBe(createdDate);
  });

  test("should delete multiple orders", async () => {
    const ids = ["cf8a2367-ae6b-4651-a5d3-4e52ee821f50", "c3637e8f-7a24-41df-b115-b549e86c7f69", "9e8e9ca7-9066-4bed-a08d-938e3878d05b"];
    const createdBy = "testUser";
    const type = "someType";
    const customer = "Jane Doe";

    await ordersApi.createNewOrder(ids[0], createdBy, type, customer);
    await ordersApi.createNewOrder(ids[1], createdBy, type, customer);
    await ordersApi.createNewOrder(ids[2], createdBy, type, customer);
    await ordersApi.deleteOrders(ids);

    const ordersAfterDelete = await ordersApi.getAllOrders();
    const deletedOrders = ordersAfterDelete.filter((order) =>
      ids.includes(order.id)
    );

    expect(deletedOrders.length).toBe(0);
  });
});