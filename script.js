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