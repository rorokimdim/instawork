//
// This file defines the stroage interface for storing member information.
//
// Only code in this file talks to the server.
//
// All exported functions return a 3 element array:
//   - first entry is the expected result when there is no error; null otherwise
//   - second entry is the error if there is an error; null otherwise
//   - http status code

const getMembers = async () => {
  const response = await fetch("/server");

  if (response.status == 200) {
    return [await response.json(), null, 200];
  } else {
    return [null, "Server is misbehaving. Please check.", response.status];
  }
};

const getMember = async (id) => {
  const response = await fetch(`/server/${id}`);

  if (response.status == 200) {
    return [await response.json(), null, 200];
  } else if (response.status == 404 || response.status == 422) {
    return [null, "Member not found", response.status];
  } else {
    return [null, "Server is misbehaving. Please check.", response.status];
  }
};

const addMember = async (member) => {
  const response = await fetch("/server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });

  if (response.status == 200) {
    return [await response.json(), null, 200];
  } else if (response.status == 400) {
    const message = await response.json();
    return [null, message.error, 400];
  } else {
    return [null, "Could not add. Server is misbehaving.", response.status];
  }
};

const deleteMember = async (id) => {
  const response = await fetch(`/server/${id}`, {
    method: "DELETE",
  });

  if (response.status == 200) {
    return [await response.json(), null, 200];
  } else if (response.status == 404) {
    return [null, "Member not found.", 404];
  } else {
    return [
      null,
      "Could not delete. An unexpected error occurred.",
      response.status,
    ];
  }
};

const updateMember = async (member) => {
  const response = await fetch(`/server/${member.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });

  if (response.status == 200) {
    return [await response.json(), null, 200];
  } else if (response.status == 400) {
    const message = await response.json();
    return [null, message.error, 400];
  } else {
    return [
      null,
      "Could not update. An unexpected error occurred.",
      response.status,
    ];
  }
};

export default { getMember, getMembers, addMember, deleteMember, updateMember };
