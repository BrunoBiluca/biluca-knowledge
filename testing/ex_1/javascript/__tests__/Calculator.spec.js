const Calculator = require("../src/Calculator");
const MemoryStorage = require("../src/MemoryStorage");

// Exemplo de utilizar uma estrutura paras os testes
var calculator;

beforeEach(() => {
    calculator = new Calculator(new MemoryStorage())
});

test('should add two numbers and return sum value', () => {
    expect(calculator.sum(1, 2)).toBe(3);
})

test('should add X to last result', () => {
    calculator.sum(1, 2)
    expect(calculator.add(3)).toBe(6);
});

test('should replace result when calculator sum', () => {
    expect(calculator.add(3)).toBe(3);
    expect(calculator.add(3)).toBe(6);

    expect(calculator.sum(2, 2)).toBe(4)
});

test('should return zero when calculator was clear', () => {
    calculator.sum(1, 2)
    expect(calculator.add(3)).toBe(6);

    calculator.clear()
    expect(calculator.getResult()).toBe(0)
});

// Este teste ilusta a utilização de um mock para verificar o comportamento do código
// NÃO É recomendado utilizar um teste desses
// IDEALMENTE testes não devem saber sobre a implementação do código
// PORÉM podem ser usados em mocks para bibliotecas externas ou dependencias onde seus resultados não apresentam valores de retornos
test("should store value when calculator sum two numbers", () => {
    const storage = {
        store: jest.fn(),
        get: jest.fn(),
        clear: jest.fn()
    }
    const calc = new Calculator(storage)
    calc.sum(1, 2)

    expect(storage.store).toHaveBeenCalled()
    expect(storage.get).toHaveBeenCalled()
    expect(storage.get).not.toHaveBeenCalled()
})