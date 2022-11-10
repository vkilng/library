var modalContainer = document.getElementsByClassName('modal-backdrop');
var addBookForm = document.querySelector('form');

let myLibrary = [];

function Book(title, author, numOfPages, readingStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readingStatus = readingStatus;
}

function openBookForm() {
    modalContainer[0].style.display = 'grid';
}

addBookForm.addEventListener('submit',(event) => {
    event.preventDefault();
    //console.log(addBookForm.readingStatus.checked);
    var newBook = new Book(addBookForm.title.value, addBookForm.author.value,
        addBookForm.numOfPages.value, addBookForm.readingStatus.checked);
    myLibrary.push(newBook);
    closeForm();
    addBook();
    console.log(myLibrary);
    return;
});

function closeForm() {
    addBookForm.reset();
    modalContainer[0].style.display = 'none';
    return;
}

function addBook() {
    return;
}

//function toggleReadStatus(){}