import { useState } from "react";
import { useLoaderData, Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import storage from "../storage.js";

const EditMemberPage = () => {
  const member = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(member.first_name);
  const [lastName, setLastName] = useState(member.last_name);
  const [email, setEmail] = useState(member.email);
  const [phone, setPhone] = useState(member.phone);
  const [role, setRole] = useState(member.role);

  const submitForm = (e) => {
    e.preventDefault();

    const member = {
      id: Number(id),
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      role,
    };

    storage.updateMember(member);

    toast.success("Member Updated");

    return navigate("/");
  };

  const deleteMember = (e) => {
    e.preventDefault();

    const confirm = window.confirm("Delete this member?");

    if (!confirm) return;

    storage.deleteMember(member.id);

    toast.success("Member deleted");

    return navigate("/");
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-8">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Member
              <Link
                to="/"
                className="float-right text-gray-400 hover:text-gray-600"
              >
                x
              </Link>
            </h2>

            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border rounded w-full py-2 px-3"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border rounded w-full py-2 px-3"
                placeholder="Last Name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border rounded w-full py-2 px-3"
                placeholder="xxx-xxx-xxxx"
                value={phone}
                required
                pattern="\d{3}-?\d{3}-?\d{4}"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Role
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="regular">Regular</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>

              <button
                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                onClick={deleteMember}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditMemberPage;
