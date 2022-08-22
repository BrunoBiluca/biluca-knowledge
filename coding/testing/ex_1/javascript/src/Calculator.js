class Calculator {
    constructor(storage) {
        this.storage = storage
    }

    sum(a, b) {

        if (typeof a !== 'number' || typeof b !== 'number')
            throw new Error("only numbers")

        this.storage.store(a + b)
        return this.storage.get()
    }

    add(value) {
        this.storage.store(this.storage.get() + value)
        return this.storage.get()
    }

    getResult() {
        return this.storage.get()
    }

    clear() {
        this.storage.clear()
    }
}
module.exports = Calculator