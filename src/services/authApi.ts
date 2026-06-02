const API_URL = "http://localhost:3000/api/auth";

type AuthData = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password }: AuthData) => {
  const response = await fetch(`${API_URL}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error signing up");
  }

  return data;
};

export const logIn = async ({ email, password }: AuthData) => {
  const response = await fetch(`${API_URL}/logIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error logging in");
  }
  return data;
};
