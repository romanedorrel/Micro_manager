const API_URL = import.meta.env.VITE_API_URL + "/profile";

export const getMyProfile = async (accessToken: string) => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get profile");
  }

  return response.json();
};

export const completeOnboarding = async (accessToken: string) => {
  const response = await fetch(`${API_URL}/onboarding`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to complete onboarding");
  }

  return response.json();
};
