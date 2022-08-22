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
    if (index % 2 === 0)
        return pairIndexItem(name);

    if (name.startsWith("RT"))
        return itemRT(name)

    if (name.startsWith("FR"))
        return itemFR(name)
    
    return defaultItem(name);
}

createContent()

function itemFR(name) {
    const item = document.createElement("li")
    item.textContent = name;
    item.style.background = "red"
    item.style.color = "gray"
    return item
}

function itemRT(name) {
    const item = document.createElement("li")
    item.textContent = name;
    item.style.color = "purple"
    item.style.background = "blue"
    return item
}

function pairIndexItem(name) {
    const item = document.createElement("li")
    item.style.background = "white"
    item.textContent = name;
    return item
}

function defaultItem(name) {
    const item = document.createElement("li")
    item.style.background = "red";
    item.textContent = name;
    return item
}
