const BASE_URL = "http://localhost:3000/api";

export async function registerUser(formData) {
  try {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return response; // Return the entire response object
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
