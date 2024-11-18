import React, { useContext, useEffect, useState } from "react";
import "../css/AllEventsPage.css";
import { EventRow } from "../Components/EventRow";
import MyContext from "../context/MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AllEventsPage = () => {
  const { value, setValue } = useContext(MyContext);

  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  // dummy data for development
  // const mockEvents = [
  //   {
  //     id: "1",
  //     summary: "Team Meeting",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-15T11:00:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Conference Room A",
  //   },
  //   {
  //     id: "2",
  //     summary: "Project Deadline",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-16T17:00:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Office",
  //   },
  //   {
  //     id: "3",
  //     summary: "Lunch with Client",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-17T13:30:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Downtown Cafe",
  //   },
  //   {
  //     id: "4",
  //     summary: "Webinar: New Tech Trends",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-18T16:30:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Online",
  //   },
  //   {
  //     id: "5",
  //     summary: "Code Review",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-19T15:00:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Virtual Meeting Room",
  //   },
  //   {
  //     id: "1",
  //     summary: "Team Meeting",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-15T11:00:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Conference Room A",
  //   },
  //   {
  //     id: "2",
  //     summary: "Project Deadline",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-16T17:00:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Office",
  //   },
  //   {
  //     id: "3",
  //     summary: "Lunch with Client",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-17T13:30:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Downtown Cafe",
  //   },
  //   {
  //     id: "4",
  //     summary: "Webinar: New Tech Trends",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-18T16:30:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Online",
  //   },
  //   {
  //     id: "5",
  //     summary: "Code Review",
  //     start: {
  //       dateTime: "2024-11-18T19:00:00+05:30",
  //       timeZone: "Asia/Kolkata",
  //     },
  //     end: "2023-06-19T15:00:00",
  //     attendees: ["chetan", "ketan"],
  //     location: "Virtual Meeting Room",
  //   },
  // ];

  const getAllEvents = async () => {
    try {
      const res = await axios.post("http://localhost:4000/user/get-events", {
        email: value.email,
      });
      console.log(res);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (value.isAuth) {
      getAllEvents();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <div id="events-table">
        <h1>Google Calendar Events</h1>
        <div className="events-row events-header">
          <div>Event</div>
          <div>Start Date & Time</div>
          <div>End Date & Time</div>
          <div>location</div>
        </div>
        <div className="events-container">
          <h2>All Events</h2>
          {events?.map((event, i) => (
            <div key={i}>
              <EventRow event={event} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
