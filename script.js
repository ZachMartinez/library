let myLibrary = []

function Book({title, author, pages, read}) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read || false
}

function addBookToLibrary(record) {
    let newBook = new Book(record)
    myLibrary.push(newBook)
}

function addBooksToLibrary(array) {
    array.forEach(record => {
        addBookToLibrary(record)
    })
}

function removeBookFromLibrary(i) {
    myLibrary.splice(i, 1)
}

function changeBookInLibrary(i, newRecord) {
    let book = myLibrary[i]
    let keys = Object.keys(book)
    keys.forEach(key => { // Set the value of all properties in book to match newRecord
        book[key] = newRecord[key] || book[key]
    })
}

function saveLibrary() {
    try {
        let dataString = JSON.stringify(myLibrary)
        localStorage['myLibrary'] = dataString
        console.log(`Saved ${myLibrary.length} books`)
    } catch (error) {
        console.log(`Unable to write to localStorage`)
        console.log(error);
    }
}

function loadLibrary() {
    try {
        let dataString = localStorage['myLibrary']
        let data = JSON.parse(dataString)
        addBooksToLibrary(data)
        console.log(`Loaded ${data.length} books`)
    } catch (error) {
        console.log(`Cannot read from localStorage`)
        console.log(error)
    }
}

function clearLibrary() {
    if (confirm("Do you want to delete all your books?")) {
        let numberOfBooks = myLibrary.length
        myLibrary = []
        localStorage['myLibrary'] = '[]'
        console.log(`Deleted ${numberOfBooks} books`)
    }
}

function createTestBooks() {
    const testBooks = [
        {"title":"War and Peace","author":"Tolstoy","pages":1400,"read":false},
        {"title":"20,000 Leagues Under The Sea","author":"Jules Verne","pages":504,"read":false},
        {"title":"Around The World in 80 Days","author":"Jules Verne","pages":200,"read":false}
    ]

    addBooksToLibrary(testBooks)
}

function renderLibrary(library, targetEl) {
    targetEl.textContent = ''
    library.forEach((book, i) => {
        const row = renderBookRow(book, i)
        targetEl.appendChild(row)
    })
}

function renderBookRow(book, index) {
    const row = document.createElement('tr')
    row.insertCell(-1).textContent = book.title
    row.insertCell(-1).textContent = book.author
    row.insertCell(-1).textContent = book.pages
    row.insertCell(-1).append(readIndicator(book.read))
    row.insertCell(-1).innerHTML = `<button class="deleteBtn">Delete</button>`
    row.setAttribute('data-index', index)
    return row
}

function readIndicator(value) {
    const el = document.createElement('button')
    el.textContent = value
    el.classList.add('readStatus')
    return el
}

function getBookDataFrom(form) {
    let newBook = {}
    newBook.title = form.title.value
    newBook.author = form.author.value
    newBook.pages = parseInt(form.pages.value)
    newBook.read = form.read.checked
    return newBook
}

function openDropdown(wrapperEl) {
    wrapperEl.classList.remove('dropdown-closed')
}

function closeDropdown(wrapperEl) {
    wrapperEl.classList.add('dropdown-closed')
}

const libraryTableBody = document.querySelector("#myLibrary>tbody")
const newBookForm = document.forms.newBook
const newBookContainer = document.querySelector("section#newBookContainer")

function getBookIndexFromHTML(targetEl) {
    return targetEl.closest('tr[data-index]').dataset.index
}

function handleFormSubmission(event) {
    event.preventDefault()
    const form = event.target
    const newBookData = getBookDataFrom(form)
    addBookToLibrary(newBookData)
    renderLibrary(myLibrary, libraryTableBody)
    form.reset()
    closeDropdown(newBookContainer)
}

function handleDeleteButtonClick(targetEl) {
    const index = getBookIndexFromHTML(targetEl)
    removeBookFromLibrary(index)
    renderLibrary(myLibrary, libraryTableBody)
}

function handleReadToggleClick(targetEl) {
    const index = getBookIndexFromHTML(targetEl)
    const book = myLibrary[index]
    book.read = !book.read
    renderLibrary(myLibrary, libraryTableBody)
}

window.onload = function() {
    loadLibrary()
    renderLibrary(myLibrary, libraryTableBody)
}

document.addEventListener('submit', function(e) {
    handleFormSubmission(e)
})

document.addEventListener('click', function (e) {
    switch (e.target.classList.value) {
        case 'deleteBtn':
            handleDeleteButtonClick(e.target)
            break
        case 'readStatus':
            handleReadToggleClick(e.target)
            break
        default:
            break
    }

    switch (e.target.id) {
        case 'newBookBtn':
            openDropdown(newBookContainer)
            break
        case 'cancelNewBookBtn':
            closeDropdown(newBookContainer)
        default:
            break
    }
})