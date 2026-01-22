import type { Item } from "./Item.model.js";
import { ItemCategory } from "./Item.model.js";

export class Book implements Item {
    
    private title: string;
    private author: string
    private genre: string;
    private price: number
    private isbn: string;

    constructor(title: string, author: string, genre: string, price: number, isbn: string) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
        this.isbn = isbn;
    }

    public getTitle(): string {
        return this.title;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getGenre(): string {
        return this.genre;
    }

    public getPrice(): number {
        return this.price;
    }

    public getIsbn(): string {
        return this.isbn;
    }

    public getCategory(): ItemCategory {
        return ItemCategory.BOOK;
    }


}