import { useState } from "react";
import { useLoaderData, Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NotFoundPage from "./NotFoundPage.jsx";

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

  if (member.error) {
    return <NotFoundPage message={member.error}></NotFoundPage>;
  }

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

    storage.updateMember(member).then((response) => {
      switch (response.status) {
        case 200:
          toast.success("Member Updated");
          return navigate("/");
        case 400:
          response.json().then((message) => {
            toast.error(message.error);
          });
          break;
        default:
          toast.error("Could not update. An unexpected error occurred.");
      }
    });
  };

  const deleteMember = (e) => {
    e.preventDefault();

    const confirm = window.confirm("Delete this member?");

    if (!confirm) return;

    storage.deleteMember(member.id).then((response) => {
      switch (response.status) {
        case 200:
          toast.success("Member deleted");
          return navigate("/");
        case 400:
          response.json().then((message) => {
            toast.error(message.error);
          });
          break;
        default:
          toast.error("Could not delete. An unexpected error occurred.");
      }
    });
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-8">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="form-title">
              Edit Member
              <Link to="/" className="cancel-x">
                x
              </Link>
            </h2>

            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="xxx-xxx-xxxx"
                value={phone}
                required
                pattern="\d{3}-?\d{3}-?\d{4}"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="type">Role</label>
              <select
                id="type"
                name="type"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="regular">Regular</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <button className="primary-btn" type="submit">
                Save
              </button>

              <button className="ml-4 danger-btn" onClick={deleteMember}>
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
