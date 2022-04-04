// this is the logout script
const logout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log out.");
    }
  };
  
  // this is the logout button that is being passed in from the form event listener
  document.querySelector("#logout").addEventListener("click", logout);
  