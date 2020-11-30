import fetchWithAuthorization from "./authorization";

export const getProfiles = () => {
  return fetchWithAuthorization("/api/profiles").then(res => res.json());
};

export const getProfile = profileId => {
  return fetchWithAuthorization(`/api/profiles/${profileId}`).then(res =>
    res.json()
  );
};

export const postProfile = profile => {
  const sendProfile = {
    method: "POST",
    body: JSON.stringify(profile),
    headers: {
      "content-type": "application/json"
    }
  };

  return fetchWithAuthorization("/api/profiles", sendProfile).then(
    res => res.ok
  );
};

export const deleteProfile = profileId => {
  fetch(`/api/profiles/${profileId}`, {
    method: "DELETE"
  }).then(res => res.ok);
};

export const getNationalities = () => {
  return fetch("/api/profiles/nationality").then(res => res.json());
};
