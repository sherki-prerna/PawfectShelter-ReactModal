const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const getRecommendations = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};
