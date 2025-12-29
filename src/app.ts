//the app.ts main problem was that it was not following the clean architecture principles.
//SOLID principles were not being followed.

import { FinancialClculator, OrderManagement, Validator } from "./app-clean.js";

//array that contains group of orders
const orders = [
    { id: 1, item: "Sponge", price: 15 },
    { id: 2, item: "Chocolate", price: 20 },
    { id: 3, item: "Fruit", price: 18 },
    { id: 4, item: "Red Velvet", price: 25 },
    { id: 5, item: "Coffee", price: 8 },
];

//I stored the orders in orders array which is declared in OrderManagement class
const orderManager=new OrderManagement();
for(const order of orders){
    orderManager.addOrder(order.item,order.price);
}

// print the current orders 
console.log("The current orders are:"+orderManager.getOrders());

//created new order 
const newItem = "Marble";
const newPrice = 22;

//added new order to orders through orderManager which have accedd on addorder method
orderManager.addOrder(newItem, newPrice);

console.log("Orders after adding new order: "+orderManager.getOrders());


console.log("Total Revenue: "+FinancialClculator.getRevenue(orders));
console.log("Average By Power: "+FinancialClculator.getAverageByPower(orders));

//print an order by id
const fetch=2;
const fetchedOrder=orderManager.getOrderById(fetch);
console.log("Fetched Order with id 2 is: "+fetchedOrder);

//print a nonexisting order
const nonExistingId=10;
const nonExistingOrder=orderManager.getOrderById(nonExistingId);
console.log("Fetched Order with id 10 is: "+nonExistingOrder);







