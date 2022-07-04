class Pizza {
    slices
    hasCheese
    hasCheedar
    ingredients

    constructor(slices, hasCheese, hasCheedar, ingredients){
        this.slices = slices
        this.hasCheese = hasCheese
        this.hasCheedar = hasCheedar
        this.ingredients = ingredients
    }
}

// build code
const smallPizza = new Pizza(4, true, false, ['ham', 'chicken', 'eggs'])
const mediumPizza = new Pizza(6, true, true, ['ham', 'chicken', 'eggs'])
const bigPizza = new Pizza(8, true, true, ['ham', 'chicken', 'eggs'])