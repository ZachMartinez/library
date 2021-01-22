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

function handleDeleteBtn(node) {
    const index = getBookIndexFromHTML(node) 
    deleteBook(index, myLibrary)
    renderLibraryTable(myLibrary, libraryTableBody)
}

function handleReadBtn(node) {
    const index = getBookIndexFromHTML(node)
    myLibrary[index].read = !myLibrary[index].read
    renderLibraryTable(myLibrary, libraryTableBody)
}

function handleSubmitEvent(event) {
    event.preventDefault()
    const newBookData = getBookDataFrom(event.target)
    addBook(newBookData, myLibrary)
    renderLibraryTable(myLibrary, libraryTableBody)
}

function handleClickEvent(event) {
    if (event.target.classList == 'deleteBtn') {
        handleDeleteBtn(event.target)    
    } else if (event.target.classList == 'readBtn') {
        handleReadBtn(event.target)
    }
}

window.addEventListener("submit", handleSubmitEvent)
document.addEventListener("click", handleClickEvent)