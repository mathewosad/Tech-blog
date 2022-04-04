// this is the login form handler
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // the html form has an input with a name of "email" and an input with a name of "password"
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    
    if (email && password) {
        // this the login model that is being passed in from the form
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to log in.");
      }
    }
  };
  
  // Event handler for signing up (creating a new account):
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (name && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to sign up.");
      }
    }
  };
  
  // Adding event listeners:
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);
  