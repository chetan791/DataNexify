import React, { useContext, useEffect, useState } from "react";
import "../css/Formpage.css";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import MyContext from "../context/MyContext";
import { useNavigate } from "react-router-dom";

export const Formpage = () => {
  const { value, setValue } = useContext(MyContext);
  // console.log(value);
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    attendees: [],
  });

  const [email, setEmail] = useState("");

  const handleUpdate = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!value.isAuth) {
      navigate("/");
    }
  }, [value.isAuth, navigate]);

  const handleAttendees = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && email.includes("@gmail.com")) {
      setEventData((prev) => {
        return {
          ...prev,
          attendees: [...prev.attendees, email],
        };
      });
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (e.target.checkValidity() && value.isAuth) {
        const res = await axios.post(
          "https://datanexify-assignment-7apd.onrender.com/user/create-event",
          { ...eventData, email: value.email }
        );
        console.log(res);
        alert("Event created successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("wrong");
      console.log(error);
    }
  };

  const removeAttendees = (i) => {
    setEventData((prev) => {
      return {
        ...prev,
        attendees: prev.attendees.filter((_, index) => index !== i),
      };
    });
  };

  const getLocalISOString = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="container">
      <form id="event-form" onSubmit={handleSubmit}>
        <h1>Create New Event</h1>
        <div>
          <label htmlFor="name">
            Event Name <span>*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter event name"
            onChange={handleUpdate}
            name="name"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            placeholder="Enter event description"
            onChange={handleUpdate}
          ></textarea>
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter event location"
            onChange={handleUpdate}
          />
        </div>
        <div className="datebox-container">
          <div>
            <label>
              Start Date & Time <span>*</span>
            </label>
            <input
              type="datetime-local"
              className="datebox"
              min={getLocalISOString()}
              onChange={handleUpdate}
              name="startDateTime"
              required
            />
          </div>
          <div>
            <label>
              End Date & Time <span>*</span>
            </label>
            <input
              type="datetime-local"
              className="datebox"
              min={getLocalISOString()}
              onChange={handleUpdate}
              name="endDateTime"
              required
            />
          </div>
        </div>
        <div>
          <label>Attendees</label>
          <div id="attendees-container">
            <input
              type="email"
              placeholder="Enter attendee email"
              name="attendeeEmail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button onClick={handleAttendees}>Add</button>
          </div>
          <div id="attendees-list">
            {eventData.attendees.map((val, i) => {
              return (
                <div className="attendees" key={i}>
                  <p>{val}</p>
                  <TiDeleteOutline onClick={() => removeAttendees(i)} />
                </div>
              );
            })}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
