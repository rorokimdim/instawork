const getMembers = async () => {
  const response = await fetch('/server');
  return response.json();
}

const getMember = async (id) => {
  const response = await fetch(`/server/${id}`);
  return response.json();
};

const addMember = async (member) => {
  await fetch("/server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
};

const deleteMember = async (id) => {
  await fetch(`/server/${id}`, {
    method: "DELETE",
  });
};

const updateMember = async (member) => {
  await fetch(`/server/${member.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
};

export default {getMember, getMembers, addMember, deleteMember, updateMember};