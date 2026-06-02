const API_URL = "http://localhost:3000/api/goals";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getGoals = async () => {
  const token = getToken();

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error fetching goals");
  }
  return data;
};
