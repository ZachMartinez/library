let myLibrary = []
const libraryTableBody = document.querySelector("table#myLibrary>tbody")

function main(event) {
    document.addEventListener("submit", handleSubmitEvent) 
    document.addEventListener("click", handleClickEvent)
}


function Book({title, author, pages, read}) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read || false
}

function addBook(bookRecord, targetLibrary) {
    const newBook = new Book(bookRecord)
    targetLibrary.push(newBook)
}

function addBooks(booksArray, targetLibrary) {
    booksArray.forEach(book => {
        addBook(book, targetLibrary)
    })
}

function deleteBook(i, targetLibrary) {
    if (targetLibrary[i]) {
        targetLibrary.splice(i, 1)
    } 
}
    
function renderLibraryTable(library, tbody) {
    tbody.innerHTML = ""
    library.forEach((book, index) => {
        const row = tbody.insertRow()
        row.setAttribute("data-index", index)
        row.insertCell(-1).textContent = book.title
        row.insertCell(-1).textContent = book.author 
        row.insertCell(-1).textContent = book.pages 
        row.insertCell(-1).innerHTML = `<button class="readBtn">${book.read ? "True" : "False"}</button>`
        row.insertCell(-1).innerHTML = `<button class="deleteBtn">Delete</button>`
    })
}    

function createTestBooks(library) {
    const testData = [
        {
            title: "War And Peace",
            author: "Leo Tolstoy",
            pages: 1440,
            read: false
        },
        {
            title: "20000 Leagues Under The Sea",
            author: "Jules Verne",
            pages: 220,
            read: false
        },
        {
            title: "Journey to The Centre of The Earth",
            author: "Jules Verne",
            pages: 210,
            read: true
        }
    ]

    addBooks(testData, library) 
}

function getBookDataFrom(form) {
    const newBookData = {}
    newBookData.title = form.title.value
    newBookData.author = form.author.value
    newBookData.pages = parseInt(form.pages.value)
    newBookData.read = form.read.checked

    return newBookData
}

function getBookIndexFromHTML(node) {
    return node.closest("tr").dataset.index
}

function handleDeleteBtn(node, library) {
    const index = node.closest("tr").dataset.index
    deleteBook(index, library)
}

function handleReadBtn(node, library) {
    const index = node.closest("tr").dataset.index
    library[index].read = !library[index].read
}

function handleSubmitEvent(node, library) {
    const newBookData = getBookDataFrom(node)
    addBook(newBookData, library)
    node.reset()
}

function handleClickEvent(node, library) {
    if (node.classList == "deleteBtn") {
        handleDeleteBtn(node, library)
    } else if (node.classList == "readBtn") {
        handleReadBtn(node, library)
    }
}

function main() {
    let library = []
    const libraryTBody = document.querySelector("table#myLibrary>tbody")

    window.addEventListener("submit", (e) => {
        e.preventDefault()
        handleSubmitEvent(e.target, library)
        renderLibraryTable(library, libraryTBody)
    })

    document.addEventListener("click", (e) => {
        handleClickEvent(e.target, library)
        renderLibraryTable(library, libraryTBody)
    })
    console.log(library)
}

main()