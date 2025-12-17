import axios from "axios";

async function loginAdmin() {
  try {
    const response = await axios.post("http://localhost:4000/api/auth/login", {
      email: "admin@casetrace.local",
      password: "admin123",
    });

    console.log("Login successful!");
    console.log("JWT Token:", response.data.token);
    console.log("User info:", response.data.user);
  } catch (err: any) {
    if (err.response) {
      console.error("Login failed:", err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

loginAdmin();