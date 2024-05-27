import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarComponent({ appointments }) {
  const events = appointments.map((rdv) => ({
    title: rdv.patient_name,
    start: rdv.date,
    allDay: true,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      
    />
  );
}

export default CalendarComponent;
