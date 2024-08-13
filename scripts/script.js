// variables for each form box category
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

// What it takes for an email to be sent
function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.
        value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;



    Email.send({
        SecureToken: "cbe9bea9-333c-4f64-b2ca-4e05e2553ee6 ", //Individuals can't see credentials 
        // Host : "smtp.elasticemail.com",
        // Username : "jeanlkenneth@gmail.com",
        // Password : "3A21FEA22C32366EC4B6A12CF192D395B099",
        To : 'jeanlkenneth@gmail.com',
        From : "jeanlkenneth@gmail.com",
        Subject : subject.value,
        Body : bodyMessage

        // What happens after an email is sent
    }).then(
      message => {

        //Display Success pop up
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
              });
        }
      }
    );

}

//Check to see if the form boxes are empty
function checkInputs() {
    const items = document.querySelectorAll(".item");

    
    for (const item of items) {
        //If a form box was left blank, add the error class
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");

        }
        //If the email box (2 item in list) is blank call back checkEmail function
        if (items[1].value != "") {
            checkEmail();
        }

        //Need to research purpose
        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
            
        });

    }
}

// A regular expression to ensure user puts a valid email address
function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    const errorTxtEmail = document.querySelector(".error-txt.email");
    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        }

        else {
            errorTxtEmail.innerText = "*Email Address cannot be blank";

        }
    }


    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
    
}

//What happens when user hits the submit button
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();
    if(!fullName.classList.contains("error") && !email.classList.contains
    ("error") && !phone.classList.contains("error") && !subject.classList.
    contains("error") && !mess.classList.contains("error")) {
        sendEmail();

        form.reset(); //reset the form to blank
        return false;
    }


});