import {
    OrderManagement,
    FinancialCalculator,
    Validator,
    ItemValidator,
    PriceValidator,
    MaxPriceValidator,
} from "../src/app.js";

//this is a test to test if the OrderManagement class is working properly
describe("OrderManagement Testing Functions", () => {

    //test to add an order
    it("should add an order",()=>{
        const validator=new Validator([]);
        const calculator=new FinancialCalculator();
        const manager=new OrderManagement(validator,calculator);

        const item="Sponge";
        const price=15;

        manager.addOrder(item,price);
        expect(manager.getOrders()).toEqual([{id:1,item,price}]);
    })

    //test to get a specefic order by id
    it("should get an order by id",()=>{
        const validator=new Validator([]);
        const calculator=new FinancialCalculator();
        const manager=new OrderManagement(validator,calculator);

        const item="Sponge";
        const price=15;

        manager.addOrder(item,price);
        const order=manager.getOrderById(1);
        expect(order).toEqual({id:1,item,price});
    })

    //calculating totals via OrderManagement not financial calculator directly
    it("should calculate totals via OrderManagement", () => {
        const validator = new Validator([]);
        const calculator = new FinancialCalculator();
        const manager = new OrderManagement(validator, calculator);

        manager.addOrder("Sponge", 15);
        manager.addOrder("Chocolate", 20);

        expect(manager.getTotalRevenue()).toBe(35);
        expect(manager.getAverageByPower()).toBe(17.5);
    });
})

//testing through financial calculator directly
describe("FinancialCalculator Testing Functions", () => {
    it("Should calculate total revenue",()=>{
        const calculator=new FinancialCalculator();
        const orders=[
            {id:1,item:"Sponge",price:15},
            {id:2,item:"Chocolate",price:20},
            {id:3,item:"Fruit",price:18},
        ];
        const revenue=calculator.getRevenue(orders);
        expect(revenue).toBe(53);
    })

    it("Should calculate average by power",()=>{// 1,2,3,4,5
        const calculator=new FinancialCalculator();
        const orders=[
            {id:1,item:"Sponge",price:15},
            {id:2,item:"Chocolate",price:20},
            {id:3,item:"Fruit",price:18},
        ];
        const average=calculator.getAverageByPower(orders);
        expect(average).toBeCloseTo(17.667);
    })

    it("Should return 0 average when there are no orders", () => {
        const calculator = new FinancialCalculator();
        expect(calculator.getAverageByPower([])).toBe(0);
    });
})

//testing the validator rules
describe("Validator rules", () => {

    //test that shows that valid items and prices are accepted and added throgh getting the length of orders
    it("should allow valid items and prices", () => {
        const rules = [
            new ItemValidator(),
            new PriceValidator(),
            new MaxPriceValidator(),
        ];
        const validator = new Validator(rules);
        const calculator = new FinancialCalculator();
        const manager = new OrderManagement(validator, calculator);

        manager.addOrder("Marble", 22);
        expect(manager.getOrders()).toHaveLength(1);
    });

    //test that shows that invalid items and prices are rejected by throwing errors
    it("should reject unknown item", () => {
        const rules = [new ItemValidator()];
        const validator = new Validator(rules);
        const calculator = new FinancialCalculator();
        const manager = new OrderManagement(validator, calculator);

        expect(() => manager.addOrder("Unknown", 10)).toThrow("Item not found");
    });

    //test that shows that invalid items and prices are rejected by throwing errors
    it("should reject negative price", () => {
        const rules = [new PriceValidator()];
        const validator = new Validator(rules);
        const calculator = new FinancialCalculator();
        const manager = new OrderManagement(validator, calculator);

        expect(() => manager.addOrder("Sponge", -1)).toThrow("Price cannot be negative");
    });

    //I can use the length also not necessary to throw error
    it("should reject price above 100", () => {
        const rules = [new MaxPriceValidator()];
        const validator = new Validator(rules);
        const calculator = new FinancialCalculator();
        const manager = new OrderManagement(validator, calculator);

        expect(() => manager.addOrder("Sponge", 101)).toThrow("Price cannot be greater than 100");
    });
});



