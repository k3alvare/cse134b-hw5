// Generate the current date and time
let date = new Date().toLocaleString();

// Display the date and time in the form
let dateOutput = document.getElementById("date");
dateOutput.innerHTML = date;

// Add event listeners to the buttons
let postBtn = document.getElementById("postBtn");
let getBtn = document.getElementById("getBtn");
let putBtn = document.getElementById("putBtn");
let deleteBtn = document.getElementById("deleteBtn");

postBtn.addEventListener("click", postData);
getBtn.addEventListener("click", getData);
putBtn.addEventListener("click", putData);
deleteBtn.addEventListener("click", deleteData);

// Function to get the input data from the form
function getInputData() {
  let id = document.getElementById("id").value;
  let articleName = document.getElementById("articleName").value;
  let articleBody = document.getElementById("articleBody").value;

  let data = {
    id: id,
    article_name: articleName,
    article_body: articleBody,
    date: date
  };

  return data;
}

// Function to format the JSON response into HTML
function formatResponse(response) {
  let formatted = JSON.stringify(response, null, 2); // Indentation of 2 spaces
  formatted = formatted.replace(/\n/g, "<br>"); // Replace newlines with <br> tags
  formatted = formatted.replace(/\s/g, "&nbsp;"); // Replace spaces with non-breaking spaces

  return formatted;
}

// Functions to handle HTTP requests
function postData() {
  let url = "https://httpbin.org/post";
  let data = getInputData();
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(url, options)
    .then(response => response.json())
    .then(json => {
      let responseOutput = document.getElementById("response");
      responseOutput.innerHTML = formatResponse(json);
    })
    .catch(error => console.error(error));
}

function getData() {
  let url = "https://httpbin.org/get";
  let data = getInputData();
  let params = new URLSearchParams(data);
  url += "?" + params;

  fetch(url)
    .then(response => response.json())
    .then(json => {
      let responseOutput = document.getElementById("response");
      responseOutput.innerHTML = formatResponse(json);
    })
    .catch(error => console.error(error));
}

function putData() {
  let url = "https://httpbin.org/put";
  let data = getInputData();
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  fetch(url, options)
    .then(response => response.json())
    .then(json => {
      let responseOutput = document.getElementById("response");
      responseOutput.innerHTML = formatResponse(json);
    })
    .catch(error => console.error(error));
}

function deleteData() {
  let url = "https://httpbin.org/delete";
  let data = getInputData();
  let params = new URLSearchParams(data);
  url += "?" + params;

  fetch(url, { method: "DELETE" })
    .then(response => response.json())
    .then(json => {
      let responseOutput = document.getElementById("response");
      responseOutput.innerHTML = formatResponse(json);
    })
    .catch(error => console.error(error));
}
