import { BASE_URL } from "../config"; 

export const fetchUserAffirmations = async (token) => {
  const res = await fetch(`${BASE_URL}/api/affirmations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);
  return await res.json();
};

export const addAffirmation = async (text, token) => {
  const res = await fetch(`${BASE_URL}/api/affirmations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(`Add error: ${res.statusText}`);
  return await res.json();
};

export const deleteAffirmation = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/affirmations/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Delete error: ${res.statusText}`);
  return await res.json();
};
