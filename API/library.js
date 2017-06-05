var db = require('../db/mongodb');
var mongoose = require('mongoose');

var address = db.address;
var library = db.library;
var shelvings = db.shelvings;
var book = db.book;

function getBooks() {
    return book.find();
}

function getOneBook(idlib) {
    return book.findOne({idBook: idlib});
}

function findLibrary(titlelibrary) {
    return library.findOne({title: titlelibrary})
}

function addBook(data) {
    var newBook = new db.book({
        title: data.titleb,
        author: data.authorb,
        numberPages: data.numberPage,
        circulations: data.circul,
        dateWriting: data.dateWrit
    });
    console.log(newBook);
    newBook.save();
    shelvings.findOneAndUpdate({genre: data.genreb}, {$push: {books: newBook}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Good job!")
        }
    });
    return getBooks();
}

function deleteBook(id) {
    shelvings.findOneAndUpdate({}, {$pull: {books: {idBook: id}}}, function (err) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("You remove book from shelving")
        }
    });
    book.findOneAndRemove({idBook: id}, function (err) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("You remove book");
        }
    });
    return getBooks();
}

function updateBook(id, data) {
    book.findOneAndUpdate({idBook: id}, {$set: {title: data.titleb, author: data.authorb, circulations: data.circul, numberPages: data.numberpage, dateWriting: data.dateWrit}}, {upsert: true, new: true}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("You update book")
        }
    });
    return getBooks();
}

module.exports = {
    getbooks: getBooks,
    getonebook: getOneBook,
    addbook: addBook,
    deletebook: deleteBook,
    updatebook: updateBook
};