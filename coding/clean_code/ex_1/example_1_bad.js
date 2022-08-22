function createContent() {
    let i = 1;
    const wrapper = document.getElementById("wrapper")

    const content = document.createElement("div")

    const header = document.createElement("h1")
    header.textContent = "Aula sobre significado de código"
    content.appendChild(header)

    const body1 = document.createElement("p")
    body1.textContent = "Essa aula tá muito legal"

    const body2 = document.createElement("p")
    body2.textContent = "Vou aprender sobre todas essas coisas"

    content.appendChild(body1)
    content.appendChild(body2)
    
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
    ul.appendChild(li3)
    const li4 = document.createElement("li")
    li4.textContent = `${i} - Ferramentas`
    ul.appendChild(li4)
    content.appendChild(ul)
    wrapper.appendChild(content)
}

createContent()