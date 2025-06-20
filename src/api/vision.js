import { BASE_URL } from "../config"; 

const VISION_URL = `${BASE_URL}/api/vision`;

// Utility to get token and construct headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Fetch all visions for the logged-in user
export const fetchVisions = async () => {
  const res = await fetch(VISION_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);
  return await res.json();
};

// Add a new vision
export const addVision = async ({ title, image, achieved }) => {
  const res = await fetch(VISION_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, image, achieved }),
  });
  if (!res.ok) throw new Error(`Add error: ${res.statusText}`);
  return await res.json();
};

// Update an existing vision
export const updateVision = async (id, updates) => {
  const res = await fetch(`${VISION_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      ...(updates.title && { title: updates.title }),
      ...(typeof updates.achieved === "boolean" && { achieved: updates.achieved }),
      ...(updates.image && { image: updates.image }),
    }),
  });

  if (!res.ok) throw new Error(`Update error: ${res.statusText}`);
  return await res.json();
};

// Delete a vision
export const deleteVision = async (id) => {
  const res = await fetch(`${VISION_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error(`Delete error: ${res.statusText}`);
  return await res.json();
};
