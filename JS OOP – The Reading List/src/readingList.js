console.log('the reading list');

class Book {
    constructor(title, genre, author, isRead = false, readDate = null) {
        this.title = title
        this.genre = genre
        this.author = author
        this.isRead = isRead
        this.readDate = readDate
    }
}

class BookList {
    constructor() {
        this.books = []
        this.booksRead = 0
        this.booksNotRead = 0
        this.currentBook = null
        this.previousBook = null
    }

    add(book) {
        this.books.push(book)
    }

    nextFavouriteBook(book) {
        console.log('\n------nextFavouriteBook', book);
        const filtered = this.books.filter(b => b.title !== book.title)
        filtered.unshift(book)
        book.isRead = false
        // console.log('filtered', filtered);
        this.books = filtered
    }

    finishCurrentBook() {
        console.log('\n----------- finishCurrentBook');
        // console.table(this.books)
        if(!this.currentBook) {
            this.currentBook = this.books.find(book => !book.isRead)
        }

        if(this.currentBook) {
            this.currentBook.isRead = true
            this.currentBook.readDate = new Date()
            this.previousBook = this.currentBook
            this.currentBook = this.books.find(book => !book.isRead)

            console.log(`currentBook`, this.currentBook)
            console.log(`previousBook`, this.previousBook)

            this.booksRead = this.books.reduce((acc, curr) => acc + (curr.isRead ? 1 : 0), 0)
            this.booksNotRead = this.books.length - this.booksRead

            console.log(`booksRead: ${this.booksRead}`)
            console.log(`booksNotRead: ${this.booksNotRead}`)

        } else {
            console.log(`keine Bücher vorhanden oder alles gelesen!`)
            return
        }
        console.table(this.books)
    }
}

const bookList = new BookList()

bookList.add(new Book('LotR - Die Gefährten', 'Fantasy', 'JRR Tolkien'))
bookList.add(new Book('Illuminati', 'Thriller', 'Dan Brown'))
bookList.add(new Book('Per Anhalter durch die Galaxis', 'Sci-Fi', 'Douglas Adams'))
bookList.add(new Book('Homo Faber', 'Drama', 'Max Frisch'))
bookList.add(new Book('Die Nebel von Avalon', 'Fantasy', 'Marion Zimmer Bradley'))
bookList.add(new Book('Der Name der Rose', 'Krimi', 'Umberto Eco'))

console.table(bookList.books)

bookList.finishCurrentBook()
bookList.finishCurrentBook()
bookList.finishCurrentBook()
bookList.nextFavouriteBook(bookList.books.find(b => b.title === 'Illuminati'))
bookList.finishCurrentBook()
bookList.finishCurrentBook()
bookList.finishCurrentBook()
bookList.finishCurrentBook()
bookList.finishCurrentBook()
bookList.finishCurrentBook()