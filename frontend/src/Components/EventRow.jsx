import React from "react";
import "../css/EventRow.css";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
export const EventRow = ({ event, index }) => {
  const { summary, start, end, location } = event;

  function convertDateTimeToAmPm(dateTime) {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert to 12-hour clock format
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes} ${period}`;
  }
  return (
    <div className="events-row events-row-container">
      <div>
        <p>{index + 1 + ". " + summary}</p>
      </div>
      <div className="date-time">
        <div className="small-screen-div">Start</div>
        <div>
          <CiCalendarDate className="icons" />
          <p>{start?.dateTime?.split("").slice(0, 10).join("")}</p>
        </div>
        <div>
          <FaRegClock className="icons" />
          <p>{convertDateTimeToAmPm(start?.dateTime)}</p>
        </div>
      </div>
      <div className="date-time">
        <div className="small-screen-div">End</div>
        <div>
          <CiCalendarDate className="icons" />
          <p>{end?.dateTime?.split("").slice(0, 10).join("")}</p>
        </div>
        <div>
          <FaRegClock className="icons" />
          <p>{convertDateTimeToAmPm(end?.dateTime)}</p>
        </div>
      </div>
      <div>
        <IoLocationOutline className="icons" />
        <p>{location ? location : "NA"}</p>
      </div>
    </div>
  );
};
