var modalContainer = document.getElementsByClassName('modal-backdrop');
var addBookForm = document.querySelector('form');

let myLibrary = [];

function Book(title, author, numOfPages, readingStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readingStatus = readingStatus;
}

let bookOne = new Book('Mother of Learning','Domagoj Kurmaic',1932,true);
let bookTwo = new Book('Lord of Mysteries','Cuttlefish',1430,true);
myLibrary.push(bookOne);
myLibrary.push(bookTwo);
displayList();

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
    displayList();
    //console.log(myLibrary);
    return;
});

function closeForm() {
    addBookForm.reset();
    modalContainer[0].style.display = 'none';
    return;
}

function displayList() {
    var tableElement = document.querySelector('table');
    tableElement.innerHTML = '<tr><th>Title</th><th>Author</th><th>Number of Pages</th><th>Unread / Read</th></tr>';
    myLibrary.forEach((book) => {
        var newRow = document.createElement('tr');
        tableElement.append(newRow);
        for (var prop in book) {
            var dataNode = document.createElement('td');
            if (prop === 'readingStatus') {
                var labelNode = document.createElement('label');
                labelNode.setAttribute('class','switch');
                dataNode.append(labelNode);
                var checkInputNode = document.createElement('input');
                checkInputNode.setAttribute('type','checkbox');
                checkInputNode.setAttribute('name','readingStatus');
                checkInputNode.setAttribute('data-bookindex',myLibrary.indexOf(book));
                if (book[prop]) {
                    checkInputNode.checked = true;
                }
                insertReadingStatusTogglingFunction(checkInputNode);
                labelNode.append(checkInputNode);
                var spanNode = document.createElement('span');
                spanNode.setAttribute('class','slider round');
                labelNode.append(spanNode);
            } else {
                dataNode.textContent = book[prop].toLocaleString('en-us');
            }
            newRow.append(dataNode);
        }
        var delDataNode = document.createElement('td');
        var delIconNode = document.createElement('i');
        delIconNode.className = 'material-symbols-rounded del-icon';
        delIconNode.setAttribute('data-bookindex',myLibrary.indexOf(book));
        delIconNode.innerHTML = '&#xe872';
        insertDeleteFunction(delIconNode);
        delDataNode.append(delIconNode);
        newRow.append(delDataNode);
    })
    return;
}

function insertReadingStatusTogglingFunction(inputElement) {
    inputElement.addEventListener('click',() => {
        var indexOfBookInArray = inputElement.dataset.bookindex;
        var bookofIndex = myLibrary[indexOfBookInArray];
        bookofIndex.readingStatus = !(bookofIndex.readingStatus);
        //console.log(myLibrary);
        return; 
    })
}

function insertDeleteFunction(delElement) {
    delElement.addEventListener('click',() => {
        var indexOfBookInArray = delElement.dataset.bookindex;
        //console.log(indexOfBookInArray);
        myLibrary.splice(indexOfBookInArray,1);
        displayList();
        return;
    })
}