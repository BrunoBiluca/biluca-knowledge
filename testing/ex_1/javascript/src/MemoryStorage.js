class MemoryStorage {
    constructor() {
        this.storage = 0
    }
    store(value) {
        this.storage = value
    }
    
    get() {
        return this.storage
    }

    clear() {
        this.storage = 0
    }
}
module.exports = MemoryStorage