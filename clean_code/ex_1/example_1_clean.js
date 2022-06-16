function createContent() {
    const wrapper = getPageContentElement()

    const content = document.createElement("div")

    const title = createTitle()
    content.appendChild(title)

    const contentBody = createContentBody()
    content.appendChild(contentBody)

    const subjectList = createSubjectList(content)
    content.appendChild(subjectList)

    wrapper.appendChild(content)
}

createContent()

function createSubjectList(content) {
    const body2 = document.createElement("p")
    body2.textContent = "Vou aprender sobre todas essas coisas"
    content.appendChild(body2)

    const subjectList = document.createElement("ul")

    let index = 1;
    subjectList.appendChild(createSubjectItem(index++, "Responsabilidade"))
    subjectList.appendChild(createSubjectItem(index++, "Nomenclatura"))
    subjectList.appendChild(createSubjectItem(index++, "Formatação"))
    subjectList.appendChild(createSubjectItem(index, "Ferramentas"))

    return subjectList
}

function createSubjectItem(i, name) {
    const li = document.createElement("li")
    li.textContent = `${i} - ${name}`
    return li
}

function createContentBody() {
    const body1 = document.createElement("p")
    body1.textContent = "Essa aula tá muito legal"
    return body1
}

function createTitle() {
    const header = document.createElement("h1")
    header.textContent = "Aula sobre significado de código"
    return header
}

function getPageContentElement() {
    return document.getElementById("wrapper")
}
