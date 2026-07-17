import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaSearch,
  FaClipboardList
} from "react-icons/fa";

const API = "https://event-registation-system-backend.onrender.com";

function App() {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
  });

  const [events, setEvents] = useState([]);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
    const fetchEvents = async () => {
    const res = await axios.get(API);
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, formData);
      setEditId(null);
    } else {
      await axios.post(API, formData);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      event: "",
    });

    fetchEvents();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this participant?")) {
      await axios.delete(`${API}/${id}`);
      fetchEvents();
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      event: item.event,
    });

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
    return (
    <div className="main">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

      <h2 className="logo">
    <FaClipboardList className="logo-icon" />
    Event Registration System
      </h2>

        <div className="nav-links">

          <a href="#register">Home</a>

          <a href="#participants">Participants</a>

        </div>

      </nav>

      {/* ================= CONTAINER ================= */}

      <div className="container">

        {/* ================= REGISTRATION ================= */}

        <div
          className="registration-card"
          id="register"
        >

          <h1>Event Registration</h1>

          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="input-group">

              <label>Name</label>

              <div className="input-box">

                <FaUser className="icon" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Email */}

            <div className="input-group">

              <label>Email</label>

              <div className="input-box">

                <FaEnvelope className="icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Phone */}

            <div className="input-group">

              <label>Phone</label>

              <div className="input-box">

                <FaPhone className="icon" />

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Event */}

            <div className="input-group">

              <label>Event</label>

              <div className="input-box">

                <FaCalendarAlt className="icon" />

                <input
                  type="text"
                  name="event"
                  placeholder="Enter Event Name"
                  value={formData.event}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button type="submit">

              {editId
                ? "Update Participant"
                : "Register Participant"}

            </button>

          </form>

        </div>
                {/* ================= DASHBOARD ================= */}

        <div className="top-section">

          {/* Total Participants Card */}

          <div className="card">

            <h3>Total Participants</h3>

            <h1>{events.length}</h1>

          </div>

          {/* Search Panel */}

          <div className="search-panel">

            <div className="search-title">

              Search Participants

            </div>

            <div className="search-box">

              <FaSearch className="search-icon" />

              <input
                className="search"
                type="text"
                placeholder="Search by Name, Email, Phone or Event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

        </div>
                {/* ================= PARTICIPANTS TABLE ================= */}

        <div
          className="table-card"
          id="participants"
        >

          <div className="table-header">

            <h2>Registered Participants</h2>

            <div className="table-count">

              {
                events.filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.email.toLowerCase().includes(search.toLowerCase()) ||
                  item.phone.toLowerCase().includes(search.toLowerCase()) ||
                  item.event.toLowerCase().includes(search.toLowerCase())
                ).length
              } Records

            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Event</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {events
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase()) ||
                    item.event.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (

                    <tr key={item._id}>

                      <td>{item.name}</td>

                      <td>{item.email}</td>

                      <td>{item.phone}</td>

                      <td>{item.event}</td>

                      <td>

                        <div className="actions">

                          <button
                            type="button"
                            className="edit"
                            onClick={() => handleEdit(item)}
                          >
                            ✏ Edit
                          </button>

                          <button
                            type="button"
                            className="delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                {events.filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.email.toLowerCase().includes(search.toLowerCase()) ||
                  item.phone.toLowerCase().includes(search.toLowerCase()) ||
                  item.event.toLowerCase().includes(search.toLowerCase())
                ).length === 0 && (

                  <tr>

                    <td
                      colSpan="5"
                      className="no-data"
                    >

                      No participants found.

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>
                {/* ================= FOOTER ================= */}

        <footer
          className="footer"
          id="footer"
        >

          <p>
            © 2026 Event Registration System
          </p>

          <p>
            Designed & Developed by <strong>Poovarasu K</strong>
          </p>

        </footer>

      </div>

    </div>

  );
}

export default App;