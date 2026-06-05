const API_URL = import.meta.env.VITE_API_URL;

type AuthData = {
  email: string;
  password: string;
};

export const signUp = async ({ email, password }: AuthData) => {
  const response = await fetch(`${API_URL}/auth/signUp`, {
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
  const response = await fetch(`${API_URL}/auth/logIn`, {
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
  const response = await fetch(`${API_URL}/auth/refresh`, {
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
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to logout");
  }

  return data;
};
