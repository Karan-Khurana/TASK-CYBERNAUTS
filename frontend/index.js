const register = async (event) => {
    event.preventDefault();
  
    const firstName = document.getElementById("firstName")?.value;
    const lastName = document.getElementById("lastName")?.value;
    const email = document.getElementById("email")?.value;
    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;
  
    if (!firstName || !lastName || !email || !username || !password) {
      alert("All Fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    const user = {
      firstName,
      lastName,
      email,
      userName: username,
      password,
    };
  
    try {
      const response = await fetch("https://task-cybernauts.vercel.app/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        alert("Registration successful");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error?.message || "Registration failed. Please try again.");
    }
  };
  
  const login = async (event) => {
    event.preventDefault();
  
    const email = document.getElementById("email1")?.value;
    const password = document.getElementById("password1")?.value;
  
    if (!email || !password) {
      alert("All Fields are required.");
      return;
    }
  
    const user = {
      email,
      password,
    };
  
    try {
      const response = await fetch("https://task-cybernauts.vercel.app/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        alert("Login successful");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error?.message || "Login failed. Please try again.");
    }
  };
  
  document
    .getElementById("registrationForm")
    ?.addEventListener("submit", register);
  
  document.getElementById("loginForm")?.addEventListener("submit", login);