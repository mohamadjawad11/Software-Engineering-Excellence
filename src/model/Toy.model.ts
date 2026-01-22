import type { Item } from "./Item.model.js";
import { ItemCategory } from "./Item.model.js";

export class Toy implements Item{


  private type:string;
  private material:string
  private ageGroup:string;
  private price:number;
  private name:string;
  private id:string;
  
    constructor(type:string, material:string, ageGroup:string, price:number, name:string, id:string) {
        this.type = type;
        this.material = material;
        this.ageGroup = ageGroup;
        this.price = price;
        this.name = name;
        this.id = id;
    }

    getType():string {
        return this.type;
    }

    getMaterial():string {
        return this.material;
    }

    getAgeGroup():string {
        return this.ageGroup;
    }

    getPrice():number {
        return this.price;
    }

    getName():string {
        return this.name;
    }

    getId():string {
        return this.id;
    }

    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }
}