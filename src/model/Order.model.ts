import type { Item } from "./Item.model.js";


interface Order{
    getItem():Item;
    getPrice():number;
    getQuantity():number;
    getId():string;
}