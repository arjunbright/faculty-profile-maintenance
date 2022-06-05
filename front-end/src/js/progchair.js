const progchaired_form = document.getElementById("progchaired_form");
const programme_chaired = document.getElementById("programme_chaired");
const programme_chaired_from = document.getElementById("programme_chaired_from");
const programme_chaired_to = document.getElementById("programme_chaired_to");
const programmes_charired = document.getElementById("programmes_charired");
const add_prog = document.getElementById("add_prog");
const alert1 = document.querySelector(".alert1");
const clear_all = document.getElementById("clear_all");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

let edit_flag = false;
let edit_element;
let edit_tag;
let edit_from;
let edit_to;
let edit_id = "";

// -------------------------------------------- add / edit programme_chaired_storage  -------------------------------------------- //
// Generate unique ID
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// !!!Alert!!!
function display_alert(text, action) {
  alert1.textContent = text;
  alert1.classList.add(`alert1-${action}`);
  // remove alert1
  setTimeout(function () {
    alert1.textContent = "";
    alert1.classList.remove(`alert1-${action}`);
  }, 4000);
}

// set backt to defaults
function set_back_to_default() {
  programme_chaired.value = "";
  programme_chaired_from.value = "";
  programme_chaired_to.value = "";
  edit_flag = false;
  edit_id = "";
  add_prog.textContent = "Add";
}

// delete an item
function delete_item(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  programmes_charired.removeChild(element);
  display_alert("item removed", "danger");

  set_back_to_default();
  // remove from local storage
  remove_from_local_storage(id);
}

// edit an item
async function edit_item(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  edit_tag = element;
  edit_element = e.currentTarget.previousElementSibling;
  // set form value
  programme_chaired.value = edit_element.childNodes[0].innerHTML;
  programme_chaired_from.value = edit_element.childNodes[2].innerHTML;
  programme_chaired_to.value = edit_element.childNodes[4].innerHTML;
  // faculty.value = edit_fac;
  edit_flag = true;
  edit_id = element.dataset.id;
  //
  add_prog.textContent = "Edit";
}

// clear items
function clear_items(e) {
  e.preventDefault();

  return new Promise((resolve, reject) => {
    // confirm clear
    if (!window.confirm("Are you sure to clear all?")) {
      return;
    }

    window.localStorage.removeItem("programme_chaired_storage");
    const items = document.querySelectorAll(".one-programme_chaired_storage");
    if (items.length > 0) {
      items.forEach(function (item) {
        programmes_charired.removeChild(item);
      });
    }
    display_alert("removed all programme chaired", "danger");
    resolve(set_back_to_default());
  });
}

// add item to the list
function add_item(e) {
  e.preventDefault();

  // *************************************** create *************************************** //
  if (programme_chaired.value && programme_chaired_from.value && programme_chaired_to.value && !edit_flag) {
    const id = uuid();
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;

    element.setAttributeNode(attr);
    element.classList.add("one-programme_chaired_storage");

    element.innerHTML = `
      <p class="one-programme_chaired"><span><b>${programme_chaired.value}</b> from <b>${programme_chaired_from.value}</b> to <b>${programme_chaired_to.value}</b></span>
      &ensp;
                <button type="button" class="edit-btn btn btn-warning">
                  <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn btn btn-danger">
                  <i class="fas fa-trash"></i>
                </button></p>
            `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", delete_item);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", edit_item);

    // append child
    programmes_charired.appendChild(element);
    // display alert1
    display_alert("Added Successfully", "success");
    // set local storage
    add_to_local_storage(id, programme_chaired.value, programme_chaired_from.value, programme_chaired_to.value);
    // // set back to default
    set_back_to_default();
    // ****************************************** Edit ****************************************** //
  } else if (
    programme_chaired.value &&
    programme_chaired_from.value &&
    programme_chaired_to.value &&
    edit_flag
  ) {
    edit_element.innerHTML = `<b>${programme_chaired.value}</b> from <b>${programme_chaired_from.value}</b> to <b>${programme_chaired_to.value}</b>`;
    display_alert("values changed", "success");

    // edit  local storage
    edit_local_storage(
      edit_id,
      programme_chaired.value,
      programme_chaired_from.value,
      programme_chaired_to.value
    );
    set_back_to_default();
  } else {
    display_alert("please fill all the fields", "danger");
  }
}

// -------------------------------------------- Local Storage -------------------------------------------- //
// get eqd
const get_user = () => {
  return window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : [];
};

// get eqd
const get_local_storage = () => {
  return window.localStorage.getItem("programme_chaired_storage")
    ? JSON.parse(window.localStorage.getItem("programme_chaired_storage"))
    : [];
};

// add item to local storage
const add_to_local_storage = (id, deg, deg_f, deg_t) => {
  const item = {
    programme_chaired_id	: id,
    programme_chaired: deg,
    programme_chaired_from: deg_f,
    programme_chaired_to: deg_t,
  };
  let items = get_local_storage();
  items.push(item);
  window.localStorage.setItem("programme_chaired_storage", JSON.stringify(items));
};

// remove from local storage
function remove_from_local_storage(id) {
  let items = get_local_storage();

  items = items.filter((item) => {
    if (item.programme_chaired_id	 != id) {
      return item;
    }
  });

  window.localStorage.setItem("programme_chaired_storage", JSON.stringify(items));
}

// edit an element in local storage
function edit_local_storage(id, deg, deg_f, deg_t) {
  let items = get_local_storage();

  items = items.map(function (item) {
    if (item.programme_chaired_id	 == id) {
      item.programme_chaired = deg;
      item.programme_chaired_from = deg_f;
      item.programme_chaired_to = deg_t;
    }
    return item;
  });
  window.localStorage.setItem("programme_chaired_storage", JSON.stringify(items));
  return;
}

// --------------------------------------- Setup Items after refresh --------------------------------------- //

// get from local storage
function setup_items() {
  programmes_charired.innerHTML = "";
  let items = get_local_storage();
  // console.log("local storage", items);
  if (items.length > 0) {
    items.forEach(function (item) {
      create_list_item(
        item.programme_chaired_id	,
        item.programme_chaired,
        item.programme_chaired_from,
        item.programme_chaired_to
      );
    });
  }

  set_back_to_default();
}

// append te child element to html
async function create_list_item(id, deg, deg_f, deg_t) {
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;

  element.setAttributeNode(attr);
  element.classList.add("one-programme_chaired_storage");

  element.innerHTML = `
      <p class="one-programme_chaired"><span><b>${deg}</b> from <b>${deg_f}</b> to <b>${deg_t}</b></span>
      &ensp;
                <button type="button" class="edit-btn btn btn-warning">
                  <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn btn btn-danger">
                  <i class="fas fa-trash"></i>
                </button></p>
            `;
  // add event listeners to both buttons;
  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", delete_item);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", edit_item);

  // append child
  programmes_charired.appendChild(element);
}

// -------------------------------------------- Submit the form  -------------------------------------------- //
function submit_form(e) {
  e.preventDefault();

  let educational_qualification = [];

  const programme_chaired_storage = get_local_storage();

  // // check if empty
  // if (programme_chaired_storage.length <= 0) {
  //   display_alert("please add some present responsibilities", "danger");
  //   return;
  // }

  programme_chaired_storage.forEach((item) => {
    item.programme_chaired_id	 = isNaN(Number(item.programme_chaired_id	)) ? 0 : item.programme_chaired_id	;
    educational_qualification.push(item);
  });
  const user = get_user();

  if (!user) {
    window.alert("user not logged in");
    return;
  }
  const xhr = new XMLHttpRequest();

  xhr.open(
    "POST",
    `../../api/profile/public/type_5/programme_chaired.php?ID=${user.user_id}`,
    true
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const got = JSON.parse(xhr.responseText);

      if (got.error) {
        display_alert(got.error, "danger");
      } else {
        window.alert("Programme Chaired updated successfully");
        got.forEach((item, index, array) => {
          item.programme_chaired_from = item.programme_chaired_from.substr(0, 7);
          item.programme_chaired_to = item.programme_chaired_to.substr(0, 7);

          if (index + 1 == array.length) {
            // assign the data
            window.localStorage.setItem("programme_chaired_storage", JSON.stringify(got));
            setup_items();
          }
        });
      }
    }
  };

  xhr.send(JSON.stringify(educational_qualification));
}

// --------------------------------------------- Initially  --------------------------------------------- //
// DB data
const db_data = () => {
  return new Promise(async (resolve, reject) => {
    const user = get_user();
    if (!user) {
      window.alert("user not logged in");
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      `../../api/profile/public/type_5/programme_chaired.php?ID=${user.user_id}`,
      true
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        const got = JSON.parse(xhr.responseText);

        if (got.error) {
          // if can't get the data, thorw the error
          display_alert(got.error, "danger");
        } else {
          // change date
          got.forEach((item, index, array) => {
            item.programme_chaired_from = item.programme_chaired_from.substr(0, 7);
            item.programme_chaired_to = item.programme_chaired_to.substr(0, 7);

            if (index + 1 == array.length) {
              // assign the data
              window.localStorage.setItem("programme_chaired_storage", JSON.stringify(got));
              setup_items();
            }
          });
        }
      }
    };
    xhr.send();
  });
};
// Initial setup
async function initialize() {
  if (get_local_storage().length !== 0) {
    setup_items();
  } else {
    db_data();
  }
}

// add an programme_chaired_storage
add_prog.addEventListener("click", add_item);
// when form submitted
progchaired_form.addEventListener("submit", submit_form);
// initialize
window.addEventListener("DOMContentLoaded", initialize);
// clear all
clear_all.addEventListener("click", clear_items);
// previous button
previous.addEventListener("click", () => {
  window.localStorage.removeItem("programme_chaired_storage");
  window.location.replace("./project.html");
});
// next button
next.addEventListener("click", () => {
  window.localStorage.removeItem("programme_chaired_storage");
  window.location.replace("./progorg.html");
});
