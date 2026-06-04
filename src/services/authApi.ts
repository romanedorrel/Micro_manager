const API_URL = "https://micro-manager.onrender.com/auth";

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
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error logging in");
  }
  return data;
};

export const refreshSession = async () => {
  const response = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to refresh session");
  }

  return data;
};

export const logOut = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to logout");
  }

  return data;
};
