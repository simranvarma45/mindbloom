const BASE_URL = 'http://localhost:5000/api/vision'; // Update if hosted

export const fetchVisions = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch visions");
  return await res.json();
};

export const addVision = async ({ title, image, achieved }) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, image, achieved }),
  });
  if (!res.ok) throw new Error("Failed to add vision");
  return await res.json();
};


export const updateVision = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...(updates.title && { title: updates.title }),
      ...(typeof updates.achieved === "boolean" && { achieved: updates.achieved }),
      ...(updates.image && { image: updates.image })  // ✅ add this line
    }),
  });

  if (!res.ok) throw new Error("Failed to update vision");
  return await res.json();
};


export const deleteVision = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error("Failed to delete vision");
  return await res.json();
};
