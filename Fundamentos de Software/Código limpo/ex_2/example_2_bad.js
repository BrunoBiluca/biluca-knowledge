function createContent() {
    let i = 1;
    const wrapper = document.getElementById("wrapper")

    const ul = document.createElement("ul")
    ul.appendChild(createItem(i++, `RT Item ${i}`))
    ul.appendChild(createItem(i++, `Item ${i}`))
    ul.appendChild(createItem(i++, `FR Item ${i}`))
    ul.appendChild(createItem(i++, `RT Item ${i}`))
    ul.appendChild(createItem(i++, `Item ${i}`))
    wrapper.appendChild(ul)
}

function createItem(index, name) {
    const li = document.createElement("li")
    if (index % 2 == 0) {
        li.textContent = name
        li.style.background = "white"
    }
    else {
        li.style.background = "red"
        li.textContent = name

        if (!name.startsWith("RT")) {
            li.style.color = "cyan"
            if (name.startsWith("FR") && index % 2 != 0) {
                li.style.color = "gray"
            }
        }
        else {
            li.style.color = "purple"
            li.style.background = "blue"
        }
    }
    return li
}

createContent()