console.log("Working Fine 😊 ");
showlib();

// scroll
let tableBody = document.getElementById("myTable");
tableBody.style.overflow = "auto";
tableBody.style.height = "400px";

// show Books
function showlib() {
  let lib = localStorage.getItem("lib");
  let libObj;
  if (lib == null) {
    libObj = [];
  } else {
    libObj = JSON.parse(lib);
  }

  let row = "";
  libObj.forEach(function (element, index) {
    row += `<tr>
              <td>${element.name}</td>
              <td>${element.author}</td>
              <td>${element.type}</td>
              <td><button index="${index}" onclick="deleteLib(this.index)" class="btn btn-primary">Delete</button></td>
            </tr>`;
  });
  let tbody = document.getElementById("tableBody");
  if (libObj.length == 0) {
    tbody.innerHTML = "";
  } else {
    tbody.innerHTML = row;
  }
}

// Delete Files From Table
function deleteLib(index) {
  let lib = localStorage.getItem("lib");
  let libObj;
  if (lib == null) {
    libObj = [];
  } else {
    libObj = JSON.parse(lib);
  }
  libObj.splice(index, 1);
  localStorage.setItem("lib", JSON.stringify(libObj));
  let message = document.getElementById("message");
  let boldText = "Deleted";
  message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                          <strong>${boldText}: </strong>Book has been deleted from the library
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hindexden="true">×</span>
                          </button>
                      </div>`;
  setTimeout(() => {
    message.innerHTML = "";
  }, 5000);
  showlib();
}

// Book Class
class Book {
  constructor(givenName, givenAuthor, givenType) {
    this.name = givenName;
    this.author = givenAuthor;
    this.type = givenType;
  }
}

class Display {
  add(sherry) {
    console.log("Adding the Book");

    let lib = localStorage.getItem("lib");
    let libObj;
    if (lib == null) {
      libObj = [];
    } else {
      libObj = JSON.parse(lib);
    }

    libObj.push(sherry);
    localStorage.setItem("lib", JSON.stringify(libObj));
    let tableBody = document.getElementById("tableBody");
    showlib();
  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, textMessage) {
    let message = document.getElementById("message");
    let alertMsg = "";
    if (type == "success") {
      alertMsg = "success";
    } else {
      alertMsg = "Error!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                              <strong>${alertMsg}</strong> ${textMessage}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                              </button>
                          </div>`;

    setTimeout(function () {
      message.innerHTML = "";
    }, 5000);
  }
}

// Getting LibraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();

  let name = document.getElementById("inputName").value;
  let author = document.getElementById("inputAuthor").value;
  let type;
  let fiction = document.getElementById("fiction");
  let computer = document.getElementById("computer");
  let cooking = document.getElementById("cooking");
  if (fiction.checked) {
    type = fiction.value;
  } else if (computer.checked) {
    type = computer.value;
  } else {
    type = cooking.value;
  }

  let sherry = new Book(name, author, type);

  let display = new Display();

  if (display.validate(sherry)) {
    display.add(sherry);
    display.clear();
    display.show("success", "You book is successfully added");
  } else {
    display.show("danger", "Sorry ☹ You cannot Add this Book");
  }
}
