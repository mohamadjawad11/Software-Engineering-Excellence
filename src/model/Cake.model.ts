import type { Item } from "./Item.model.js";
import { ItemCategory } from "./Item.model.js";

// Cake model is an object that implements Item

export class Cake implements Item {

    private type:string;
    private flavor:string;
    private filling:string;
    private size:number;
    private layers:number;
    private froastingType:string;
    private froastingFlavor:string;
    private decorationType:string;
    private decorationColor:string;
    private customMessage:string;
    private shape:string;
    private allergies:string;
    private specialIngredients:string;
    private packagingType:string;


    constructor(type:string, flavor:string, filling:string, size:number, layers:number, froastingType:string, froastingFlavor:string, decorationType:string, decorationColor:string, customMessage:string, shape:string, allergies:string, specialIngredients:string, packagingType:string) {
        this.type = type;
        this.flavor = flavor;
        this.filling = filling;
        this.size = size;
        this.layers = layers;
        this.froastingType = froastingType;
        this.froastingFlavor = froastingFlavor;
        this.decorationType = decorationType;
        this.decorationColor = decorationColor;
        this.customMessage = customMessage;
        this.shape = shape;
        this.allergies = allergies;
        this.specialIngredients = specialIngredients;
        this.packagingType = packagingType;
    }

    getCategory(): ItemCategory {
        return ItemCategory.CAKE;
    }

    getType():string{
        return this.type;
    }

    getFlavor():string{
        return this.flavor;
    }

    getFilling():string{
        return this.filling;
    }
    getSize():number{
        return this.size;
    }
    getLayers():number{
        return this.layers;
    }
    getFroastingType():string{
        return this.froastingType;
    }
    getFroastingFlavor():string{
        return this.froastingFlavor;
    }
    getDecorationType():string{
        return this.decorationType;
    }
    getDecorationColor():string{
        return this.decorationColor;
    }
    getCustomMessage():string{
        return this.customMessage;
    }
    getShape():string{
        return this.shape;
    }
    getAllergies():string{
        return this.allergies;
    }
    getSpecialIngredients():string{
        return this.specialIngredients;
    }
    getPackagingType():string{
        return this.packagingType;
    }
    

}

