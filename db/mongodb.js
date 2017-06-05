var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var uristring = 'mongodb://karolb:v1901236@ds145009.mlab.com:45009/lab3';
var connection = mongoose.createConnection(uristring);

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

autoIncrement.initialize(connection);

var Schema = mongoose.Schema;

var addressSchema = new Schema({
    city: String,
    street: String,
    numberHome: Number
});

var bookSchema = new Schema({
    idBook: Number,
    title: String,
    author: String,
    numberPages: Number,
    circulations: Number,
    dateWriting: Date.parse("dd.MM.yyyy")
});

var shelvingsSchema = new Schema({
    idShelvings: Number,
    genre: String,
    books: [bookSchema]
});

var librarySchema = new Schema({
    idLibrary: Number,
    title: String,
    addres: addressSchema,
    openingLibrary: Date.parse("hh:mm:ss"),
    closignLibrary: Date.parse("hh:mm:ss"),
    shelvings: [shelvingsSchema]
});

shelvingsSchema.plugin(autoIncrement.plugin, {model: 'Shelvings', field: 'idShelvings', startAt: 1, incrementBy: 1});
bookSchema.plugin(autoIncrement.plugin, {model: 'Book', field: 'idBook', startAt: 1, incrementBy: 1});
librarySchema.plugin(autoIncrement.plugin, {model: 'Library', field: 'idLibrary', startAt: 1, incrementBy: 1});

var Book = mongoose.model('Book', bookSchema);
var Shelvings = mongoose.model('Shelvings', shelvingsSchema);
var Library = mongoose.model('Library', librarySchema);
var Address = mongoose.model('Address', addressSchema);

// var newAddress = Address({
//     city: "Москва",
//     street: "ул. Большая Московская",
//     numberHome: 15
// });
//
// var newBook1 = Book({
//     title: 'Космический волк',
//     author: 'Орлов В.В',
//     numberPages: 200,
//     circulations: 2000,
//     dateWriting: '19.01.2010'
// });
//
// var newBook2 = Book({
//     title: 'Ядерная война',
//     author: 'Иванов И.И.',
//     numberPages: 250,
//     circulations: 3000,
//     dateWriting: '19.02.2014'
// });
//
// var newBook3 = Book({
//     title: 'Новый мир',
//     author: 'Петров В.В.',
//     numberPages: 300,
//     circulations: 1000,
//     dateWriting: '20.12.2013'
// });
//
// var newShelvings = Shelvings({
//     genre: "Фентези",
//     books: [newBook1, newBook2, newBook3]
// });
//
// var newLibrary = Library({
//     title: "Библиотека",
//     addres: newAddress,
//     openingLibrary: "8:00:00",
//     closignLibrary: "20:00:00",
//     shelvings: [newShelvings]
// });

// Shelvings.findOneAndUpdate({genre: 'Фентези'}, {$push: {books: newBook3}}, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Good job!")
//     }
// });
// Shelvings.findOne({genre: 'Фентези'}, function (err, shelving) {
//     console.log(shelving);
// });
// console.log(book);
// book.save();
// console.log(Book);
// Shelvings.findOne({title: "Фэнтези"}).update({"$set": {"books": Book.find() }});

// newAddress.save();
// newBook1.save();
// newBook2.save();
// newBook3.save();
// newShelvings.save();
// newLibrary.save();

module.exports = {
    address: Address,
    library: Library,
    shelvings: Shelvings,
    book: Book
};