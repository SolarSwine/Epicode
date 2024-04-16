// script.js

document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.querySelector(".checkbox");
    const button = document.getElementById("button");

    checkbox.addEventListener("change", function() {
        button.disabled = !this.checked;
    });
});
//Proceed
document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.querySelector(".checkbox");
    const button = document.getElementById("button");

    checkbox.addEventListener("change", function() {
        button.disabled = !this.checked;
    });

    button.addEventListener("click", function() {
        if (checkbox.checked) {
            window.location.href = "https://www.google.com";
        } else {
            alert("Please check the checkbox before proceeding.");
        }
    });
});