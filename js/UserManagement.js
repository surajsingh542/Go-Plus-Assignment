const table = document.getElementById("tab");
const form = document.querySelector("#UserForm");
const title = document.querySelector(".title");
const action = document.querySelector(".action_button");

const fullnameEl = document.getElementById("fullname");
const emailEl = document.getElementById("email");
const dobEl = document.getElementById("dob");
const hobbyEl = document.getElementById("hobby");
const genderEl = document.getElementsByName("gender");
const countryEl = document.getElementById("country");
const stateEl = document.getElementById("state");
const cityEl = document.getElementById("city");

const getGender = (gender) => {
  for (let i = 0; i <= 2; i++) {
    if (gender[i].checked) {
      return gender[i].value;
    }
  }
};

// Function to get all users
function getUsers() {
  let users;

  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  // Display to DOM

  let output;
  const allUsers = users.map((user) => {
    return `
    <tr>
    <td>${user.fullname}</td>
    <td>${user.email}</td>
    <td>${user.dob}</td>
    <td>${user.gender}</td>
    <td>${user.hobby}</td>
    <td>${user.country}</td>
    <td>${user.state}</td>
    <td>${user.city}</td>
    <td>
    <button class="edit" onclick="editUser('${user.id}')" id="update">Edit</button>
    
    </td>
    <td>
      <button class="delete" onclick="deleteUser('${user.id}')" id="delete">X</button>
    </td>
    </tr>

    `;
  });

  output = allUsers.join("");
  // console.log(output);
  table.innerHTML = output;
}
getUsers();

// Function to add a new user
function addUser() {
  // e.preventDefault();
  // console.log("User Added");
  let fullname = fullnameEl.value;
  let email = emailEl.value;
  let dob = dobEl.value;
  let gender = genderEl;
  let hobby = hobbyEl.value;
  let country = countryEl.value;
  let state = stateEl.value;
  let city = cityEl.value;

  let user = {
    id: Date.now(),
    fullname,
    email,
    dob,
    gender: getGender(gender),
    hobby,
    country,
    state,
    city,
  };

  if (user) {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
      // console.log(users);
    } else {
      users = JSON.parse(localStorage.getItem("users"));
      // console.log(users);
    }
    users.push(user);
    // Save to storage
    localStorage.setItem("users", JSON.stringify(users));
  }

  getUsers();
}

// Function to delete a user
function deleteUser(id) {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  users = users.filter((user) => {
    return user.id !== +id;
  });
  localStorage.setItem("users", JSON.stringify(users));
  getUsers();
}

// Function to edit a user
function editUser(id) {
  title.innerText = "Update User";
  action.setAttribute("value", "Update User");

  users = JSON.parse(localStorage.getItem("users"));
  users.find((user) => {
    if (user.id === +id) {
      fullnameEl.setAttribute("value", user.fullname);
      emailEl.setAttribute("value", user.email);
      dobEl.setAttribute("value", user.dob);
      genderEl.forEach((gender) => {
        if (gender.value === user.gender) {
          gender.setAttribute("checked", "true");
        }
      });
      hobbyEl.setAttribute("value", user.hobby);
      return;
    }
  });

  form.setAttribute("onsubmit", `updateUser(${id})`);
}

function updateUser(id) {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  let fullname = fullnameEl.value;
  let email = emailEl.value;
  let dob = dobEl.value;
  let gender = genderEl;
  let hobby = hobbyEl.value;
  let country = countryEl.value;
  let state = stateEl.value;
  let city = cityEl.value;

  users.find((user) => {
    if (user.id === +id) {
      user.fullname = fullname;
      user.email = email;
      user.dob = dob;
      user.gender = getGender(gender);
      user.hobby = hobby;
      user.country = country;
      user.state = state;
      user.city = city;
      return;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));

  title.innerText = "Add User";
  action.setAttribute("value", "Add User");
  form.setAttribute("onsubmit", "addUser()");

  getUsers();
}
