// blog.js

let posts = [ 
    {
        title: "First Post",
        date: "2023-01-01",
        summary: "This is the first post",
      },
      {
        title: "Second Post",
        date: "2023-02-01",
        summary: "This is the second post",
      },
];

// Retrieve posts from localStorage, if any
if (localStorage.getItem("posts")) {
  posts = JSON.parse(localStorage.getItem("posts"));
}

// Function to save posts to localStorage
function savePostsToLocalStorage() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to display posts in the list
function displayPosts() {
  let postsList = document.getElementById("posts-list");
  postsList.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let li = document.createElement("li");
    li.innerHTML = `<h3>${post.title}</h3><p>${post.date}</p><p>${post.summary}</p><button class="edit-post-btn" data-index="${i}">Edit</button> <button class="delete-post-btn" data-index="${i}">Delete</button>`;
    postsList.appendChild(li);
  }
  savePostsToLocalStorage(); // Save posts to localStorage
}

// Function to show the add post dialog
function showAddPostDialog() {
  let dialog = document.getElementById("add-post-dialog");
  dialog.showModal();
}

// Function to handle form submission for adding a new post
function handleAddPostFormSubmit(event) {
  event.preventDefault();
  let title = document.getElementById("post-title").value;
  let date = document.getElementById("post-date").value;
  let summary = document.getElementById("post-summary").value;
  let post = { title, date, summary };
  posts.push(post);
  displayPosts();
  event.target.reset(); // Reset form fields
  let dialog = document.getElementById("add-post-dialog");
  dialog.close();
}

// Function to handle edit post dialog
function handleEditPostDialog(event) {
  let index = event.target.getAttribute("data-index");
  let post = posts[index];
  let dialog = document.getElementById("edit-post-dialog");
  dialog.setAttribute("data-index", index);
  document.getElementById("edit-post-title").value = post.title;
  document.getElementById("edit-post-date").value = post.date;
  document.getElementById("edit-post-summary").value = post.summary;
  dialog.showModal();
}

// Function to handle form submission for editing a post
function handleEditPostFormSubmit(event) {
  event.preventDefault();
  let postDialog = document.getElementById("edit-post-dialog");
  let index = postDialog.getAttribute("data-index");
  let title = document.getElementById("edit-post-title").value;
  let date = document.getElementById("edit-post-date").value;
  let summary = document.getElementById("edit-post-summary").value;
  let post = { title, date, summary };
  posts[index] = post;
  displayPosts();
  let dialog = document.getElementById("edit-post-dialog");
  dialog.close();
}

// Function to handle delete post dialog
function handleDeletePostDialog(onsubmit) {
  let index = onsubmit.target.getAttribute("data-index");
  let post = posts[index];
  let dialog = document.getElementById("delete-post-dialog");
  dialog.setAttribute("data-index", index);
  let message = `Are you sure you want to delete the post "${post.title}"?`;
  dialog.querySelector("p").textContent = message;
  dialog.showModal();
}

// Function to handle delete post confirmation
function handleDeletePostConfirm(event) {
  let index = event.target.getAttribute("data-index");
  posts.splice(index, 1);
  displayPosts();
  let dialog = document.getElementById("delete-post-dialog");
  dialog.close();
}

// Add event listener to show add post dialog on button click
let addPostBtn = document.getElementById("add-post-btn");
addPostBtn.addEventListener("click", showAddPostDialog);

// Add event listener to handle form submission for adding a new post
let addPostForm = document.getElementById("add-post-form");
addPostForm.addEventListener("submit", handleAddPostFormSubmit);

// Add event listener to handle edit post dialog
let postsList = document.getElementById("posts-list");
postsList.addEventListener("click", function(event) {
  if (event.target.classList.contains("edit-post-btn")) {
    handleEditPostDialog(event);
  } else if (event.target.classList.contains("delete-post-btn")) {
    handleDeletePostDialog(event);
  }
});

// Add event listener to handle form submission for editing a post
let editPostForm = document.getElementById("edit-post-form");
editPostForm.addEventListener("submit", (onsubmit) => {
    handleEditPostFormSubmit(onsubmit);
});

// Add event listener to handle confirmation for deleting a post
let deleteDialog = document.getElementById("delete-post-dialog");
let confirmDeleteBtn = document.querySelector("#confirm-delete-btn");
let cancelDeleteBtn = document.querySelector("#cancel-delete-btn");

// Add event listener for pressing the Confirm button for the Delete Dialog
confirmDeleteBtn.addEventListener('click', (event) => {
    handleDeletePostConfirm(event);
});

// Add event listener for pressing the Cancel button for the Delete Dialog

cancelDeleteBtn.addEventListener('click', () => {
    deleteDialog.close();
});

displayPosts();
