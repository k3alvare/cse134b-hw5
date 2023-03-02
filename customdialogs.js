let alertBtn = document.querySelector('#alert-btn');
let alertDialog = document.querySelector("#alert-dialog");
let confirmBtn = document.querySelector('#confirm-btn');
let yesConfirmBtn = document.querySelector('#dialog-yes');
let cancelConfirmBtn = document.querySelector('#dialog-cancel');
let confirmDialog = document.querySelector('#confirm-dialog');
let output = document.querySelector('output');
let promptDialog = document.querySelector('#prompt-dialog');
let promptInput = document.querySelector('#prompt-input');
let promptBtn = document.querySelector('#prompt-btn');
let promptCancelBtn = document.querySelector('#prompt-cancel-btn');
let promptSubmitBtn = document.querySelector('#prompt-submit-btn')
let confirmResult = false;

alertBtn.addEventListener('click', () => {
    alertDialog.showModal();
    
});

confirmBtn.addEventListener('click', () => {
    confirmDialog.showModal();
});

cancelConfirmBtn.addEventListener('click', () => {
    result = false; 
    output.textContent = `Confirm result : ${result} `;
});


yesConfirmBtn.addEventListener('click', () => {
    result = true;
    output.textContent = `Confirm result : ${result}`
});

promptBtn.addEventListener('click', () => {
    promptDialog.showModal();
});

promptCancelBtn.addEventListener('click', () => {
    promptDialog.close();
});


promptSubmitBtn.addEventListener('click', () => {
    let name = promptInput.value;
    let sanitizedInput = DOMPurify.sanitize(name);
    output.textContent = `User entered: ${sanitizedInput}`;
    promptDialog.close();
});



