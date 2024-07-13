import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import storage from "../storage.js";

const AddPage = () => {
  const navigate = useNavigate();

  const defaultRole = "regular";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(defaultRole);

  const submitForm = (e) => {
    e.preventDefault();

    const member = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      role,
    };

    storage.addMember(member).then(([_, error, _status]) => {
      if (!error) {
        toast.success("Member Added");
        return navigate("/");
      } else {
        toast.error(error);
      }
    });
  };

  return (
    <section>
      <div className="container m-auto max-w-2xl py-8">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2>
              Add Member
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
                className="form-input"
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
                className="form-input"
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
                className="form-input"
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
                className="form-input"
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
              <button className="primary-btn-full" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddPage;
