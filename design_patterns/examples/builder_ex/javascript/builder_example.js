class Pizza {
    constructor(slices, hasCheese, hasCheedar, ingredients) {
        this.slices = slices
        this.hasCheese = hasCheese
        this.hasCheedar = hasCheedar
        this.ingredients = ingredients
    }
}

class PizzaBuilder {
    constructor() {
        this.hasCheese = true
        this.hasCheedar = false
        this.ingredients = ['ham', 'chicken', 'eggs']
    }
    small() { this.slices = 4; return this }
    medium() { this.slices = 6; return this }
    big() { this.slices = 8; return this }
    addCheddar() { this.hasCheedar = true; return this }
    build() { return new Pizza(this.slices, this.hasCheese, this.hasCheedar, this.ingredients) }
}

// build code
const smallPizza = new PizzaBuilder().small().build();
const mediumPizza = new PizzaBuilder().medium().addCheddar().build();
const bigPizza = new PizzaBuilder().big().addCheddar().build();