---
categoria: biblioteca
---
# Jest

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Jest é um framework geral de testes para Javascript, essa biblioteca provê um Runner para a execução dos testes.

--- end-column ---

> [!info] Principais referências
> - [Jest](https://jestjs.io/)
>- [Documentação](https://jestjs.io/docs)
>- [Documentação - Mocks](https://jestjs.io/pt-BR/docs/es6-class-mocks)
>- [Github](https://github.com/jestjs/jest)

--- end-multi-column


Necessário adicionar o comando no `package.json`:

```json
"scripts": {
	"test": "jest"
}
```

Pode ser relacionado ao [[Jest-DOM]] para fazer testes utilizando a renderização dos componentes como base.

### Configurações

Para configurar o Jest é necessário criar um arquivo `jest.config.js` na raiz da pasta. Este arquivo irá integrar todas as configurações necessárias para executar, analisar e verificar os testes.

#### Testes separados do `src`

Em alguns projetos pode ser interessante separarmos os testes do código fonte. Para que os testes funcionem é necessário configurar o Jest para ele entender que existem duas pastas raízes no projeto.

```js
// jest.config.js
{
	roots: ["<rootDir>/src", "<rootDir>/test"],
}
```

#### Módulos ECMAScripts

O Jest [não entende módulos ECAMScripts nativamente](https://jestjs.io/docs/ecmascript-modules) (existe uma funcionalidade experimental sobre isso em curso no ano de 2025), então para fazer funcionar os módulos é necessário executar os seguintes passos:

1. Adicionar ao `jest.config.js`

```js
{
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.js$": "babel-jest"
    }
}
```

2. Adicionar ao `package.json`

```json
{
	"scripts": {
		"test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
	}
}
```

3. Por fim adicionar o preset-env para pré-processamento dos scripts

Instalar o preset utilizado

```ps1
npm i -D @babel/preset-env
```

Adicionar ao `.babelrc`

```json
{
  "presets": [..., "@babel/preset-env"]
}
```
#### Importação de CSS e Arquivos

Outra limitação do Jest é a análise de arquivos CSS e imagens, arquivos de texto ou qualquer arquivo que é importado no código. O Jest analisa esses arquivos como código javascript o que leva a problemas de análise. 

Para contornar essa limitação é necessário criar mocks como objetos vazios em javascript e fazer o mapeamento entre o arquivo real para o mock.

```js
// jest.config.js
{
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/test/jest/__mocks__/fileMock.js',
      '\\.(css|less)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
    },
}
```

Onde `styleMock.js` e `fileMock.js` são na verdade um arquivo com o seguinte conteúdo:

```js
export default {}
```

# Mocks

#### Mock de uma instância de uma classe

No exemplo abaixo temos a utilização do Mock para uma classe qualquer `xxx` onde seus dois métodos são alterados para a implementação. Dessa forma podemos fazer testes sobre os métodos.

```js
// *.test.js
import xxx from "./xxx"

const mockxxx = jest.fn();
jest.mock("./xxx", () => {
  return jest.fn().mockImplementation(() => ({
    method_1: mockxxx,
    method_2: jest.fn().mockReturnValue([
      { ... },
    ])
  }))
})

test("qualquer teste", () => {
	expect(mockxxx).toHaveBeenCalledTimes(2)
})
```

> [!warning]- Nomenclatura da variável de mock
> O Jest exige que a variável de mock tenha uma nomenclatura específica já que é uma variável utilizada fora do escopo do mock.
> 
> Nomenclatura: `mockXXX`, onde XXX é qualquer nome dado.

Para que o mock funcione de forma independente entre todos os testes é necessário resetar seu valor a cada teste.

```js
beforeEach(() => {
  // Reseta todas as instâncias e métodos do mock
  mockxxx.mockClear();
});
```
