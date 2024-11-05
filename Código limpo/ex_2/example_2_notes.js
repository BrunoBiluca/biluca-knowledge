// Tópicos:
// - Evitar condicionais com múltiplas instruções
// - Condicionais invertidas
// - Alta complexidade ciclomática
// - Side effects

function createContent() {
    let i = 1;
    const wrapper = document.getElementById("wrapper")

    const ul = document.createElement("ul")
    ul.appendChild(createItem(i++, `RT Item ${i}`))
    ul.appendChild(createItem(i++, `FR Item ${i}`))
    ul.appendChild(createItem(i++, `Item ${i}`))
    ul.appendChild(createItem(i++, `RT Item ${i}`))
    ul.appendChild(createItem(i++, `Item ${i}`))
    wrapper.appendChild(ul)
}

function createItem(index, name) {
    const li = document.createElement("li")
    if (index % 2 == 0) {
        li.textContent = name
        li.style.background = "black"

        if (!name.startsWith("RT")) {
            if(name.startsWith("FR") && index % 2 != 0){
                li.style.color = "gray"    
            }
            li.style.color = "cyan"
        }
        else {
            li.style.color = "purple"
            li.style.background = "blue"
        }
    }
    else {
        li.style.background = "red"
        li.textContent = name
    }
    return li
}

createContent()