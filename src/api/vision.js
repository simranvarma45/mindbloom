const BASE_URL = 'http://localhost:5000/api/vision'; // Update if hosted

// Utility to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const fetchVisions = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch visions");
  return await res.json();
};

export const addVision = async ({ title, image, achieved }) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, image, achieved }),
  });
  if (!res.ok) throw new Error("Failed to add vision");
  return await res.json();
};

export const updateVision = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      ...(updates.title && { title: updates.title }),
      ...(typeof updates.achieved === "boolean" && { achieved: updates.achieved }),
      ...(updates.image && { image: updates.image }),
    }),
  });

  if (!res.ok) throw new Error("Failed to update vision");
  return await res.json();
};

export const deleteVision = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete vision");
  return await res.json();
};
