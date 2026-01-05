// index.ts
// Entry point for running and demonstrating the Order Management logic

import {
  FinancialCalculator,
  OrderManagement,
  Validator,
  ItemValidator,
  PriceValidator,
  MaxPriceValidator,
} from "./app.js";

// Array that contains a group of orders
const orders = [
  { id: 1, item: "Sponge", price: 15 },
  { id: 2, item: "Chocolate", price: 20 },
  { id: 3, item: "Fruit", price: 18 },
  { id: 4, item: "Red Velvet", price: 25 },
  { id: 5, item: "Coffee", price: 8 },
];

// Validation rules (Open/Closed & Single Responsibility respected)
const rules = [
  new ItemValidator(),
  new PriceValidator(),
  new MaxPriceValidator(),
];

// Create OrderManagement with injected dependencies (DIP)
const orderManager = new OrderManagement(
  new Validator(rules),
  new FinancialCalculator()
);

// Add initial orders
for (const order of orders) {
  orderManager.addOrder(order.item, order.price);
}

// Correct logging (no string concatenation with objects)
console.log("The current orders are:", orderManager.getOrders());

// Create and add a new order
const newItem = "Marble";
const newPrice = 22;
orderManager.addOrder(newItem, newPrice);

// Correct logging
console.log("Orders after adding new order:", orderManager.getOrders());

// Financial calculations
console.log("Total Revenue:", orderManager.getTotalRevenue());
console.log("Average By Power:", orderManager.getAverageByPower());

// Fetch an existing order
const fetchId = 2;
const fetchedOrder = orderManager.getOrderById(fetchId);

// Correct logging
console.log("Fetched Order with id 2 is:", fetchedOrder);

// Fetch a non-existing order
const nonExistingId = 10;
const nonExistingOrder = orderManager.getOrderById(nonExistingId);

// Correct logging
console.log("Fetched Order with id 10 is:", nonExistingOrder);
