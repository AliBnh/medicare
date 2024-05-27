import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarComponent({ appointments }) {
  const events = appointments.map((rdv) => ({
    title:
      rdv.patient_name +
      " - " +
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(`1970-01-01T${rdv.time}Z`)),
    start: rdv.date,
    allDay: true,
  }));

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}

export default CalendarComponent;
