//
// This file defines the stroage interface for storing member information.
//
// Only code in this file talks to the server.
//

const getMembers = async () => {
  const response = await fetch('/server');
  return response.json();
}

const getMember = (id) => {
  return fetch(`/server/${id}`);
};

const addMember = (member) => {
  return fetch("/server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
};

const deleteMember = (id) => {
  return fetch(`/server/${id}`, {
    method: "DELETE",
  });
};

const updateMember = (member) => {
  return fetch(`/server/${member.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
};

export default {getMember, getMembers, addMember, deleteMember, updateMember};