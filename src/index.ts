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

import logger from "./util/logger.js";
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
logger.info("The current orders are: %o", orderManager.getOrders());

// Create and add a new order
const newItem = "Marble";
const newPrice = 22;
orderManager.addOrder(newItem, newPrice);

// Correct logging
logger.info("Orders after adding new order: %o", orderManager.getOrders());

// Financial calculations
logger.info("Total Revenue: %d", orderManager.getTotalRevenue());
logger.info("Average By Power: %d", orderManager.getAverageByPower());

// Fetch an existing order
const fetchId = 2;
const fetchedOrder = orderManager.getOrderById(fetchId);

// Correct logging
logger.info("Fetched Order with id %d is: %o", fetchId, fetchedOrder);

// Fetch a non-existing order
const nonExistingId = 0;
const nonExistingOrder = orderManager.getOrderById(nonExistingId);

// Correct logging
logger.info("Fetched Order with id %d is: %o", nonExistingId, nonExistingOrder);
