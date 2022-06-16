// Tópicos:
// - Uma função faz uma única coisa
// - Nomenclatura variáveis
// - Nomenclatura de métodos
// - Side effects, como na variável i

function createContent() {
    // TODO: declaração da variável próxima ao uso
    // TODO: renomear para subjectOrder
    let i = 1;

    // TODO: extract para pegar a referência
    // TODO: mudança de nome para page-content
    const wrapper = document.getElementById("wrapper")

    const content = document.createElement("div")

    // TODO: extract para método createTitle, retornar o elemento
    const header = document.createElement("h1")
    header.textContent = "Aula sobre significado de código"
    content.appendChild(header)

    // TODO: extract para método de content body
    const body1 = document.createElement("p")
    body1.textContent = "Essa aula tá muito legal"

    // TODO: extract para método de content topics
    const body2 = document.createElement("p")
    body2.textContent = "Vou aprender sobre todas essas coisas"

    content.appendChild(body1)
    content.appendChild(body2)

    // TODO: extrair para método de criação de componente

    // TODO: ul renomerar para subjectList
    // TODO: li renomerar para subject
    i = 0
    const ul = document.createElement("ul")
    const li = document.createElement("li")
    li.textContent = `${i} - Responsabilidade`
    i++
    ul.appendChild(li)
    const li2 = document.createElement("li")
    li2.textContent = `${i} - Nomenclatura`
    i++
    ul.appendChild(li2)
    const li3 = document.createElement("li")
    li3.textContent = `${i} - Formatação`

    // TODO: remover esse linha causa um erro
    // i++
    ul.appendChild(li3)
    const li4 = document.createElement("li")
    li4.textContent = `${i} - Ferramentas`

    content.appendChild(ul)
    wrapper.appendChild(content)
}

createContent()