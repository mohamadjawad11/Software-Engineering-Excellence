interface Order {
  id: number;
  item: string;
  price: number;
}

export class OrderManagement {
  constructor(private validator:IValidator,private calculator:ICalculator){
    
  }
  
  private orders: Order[] = [];

  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(item: string, price: number): void {
    const order:Order={
      id: this.orders.length + 1,
      item,
      price,
    }
    //here I am depending on constructor not class Validator itself
    this.validator.validate(order);
    this.orders.push(order);
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  //here I am depending on the constructor not class financial calculator itself
  getTotalRevenue(){
    return this.calculator.getRevenue(this.orders);
  }

  getAverageByPower(){
    return this.calculator.getAverageByPower(this.orders);
  }
}


class PremiemOrderManagement extends OrderManagement {
  public getOrderById(id:number): Order | undefined {
    console.log("Premium Order Management");
    return super.getOrderById(id);
  }
}


interface IValidator {
  validate(order: Order): void;
}

export class Validator implements IValidator {

constructor(private rules: IValidator[]) {}

validate(order: Order): void {
    this.rules.forEach(rule => rule.validate(order))
}

}

export class ItemValidator implements IValidator {
      protected static possibleItems: string[] = [
    "Sponge",
    "Chocolate",
    "Fruit",
    "Red Velvet",
    "Birthday",
    "Carrot",
    "Marble",
    "Coffee",
  ];
    
  validate(order: Order): void {
    if (!ItemValidator.possibleItems.includes(order.item)) {
      throw new Error("Item not found");
    }
  }
}

export class MaxPriceValidator implements IValidator {
  validate(order: Order): void {
    if (order.price > 100) {
      throw new Error("Price cannot be greater than 100");
    }
  }
}

export class PriceValidator implements IValidator {
  validate(order: Order): void {
    if (order.price < 0) {
      throw new Error("Price cannot be negative");
    }
  }
}


interface ICalculator{
  getRevenue(orders: Order[]): number;
  getAverageByPower(orders: Order[]): number;
}


export class FinancialCalculator implements ICalculator {
  public  getRevenue(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.price, 0);
  }

  public  getAverageByPower(orders: Order[]): number {
    if (orders.length === 0) {
      return 0;
    }
    return this.getRevenue(orders) / orders.length;
  }
}
