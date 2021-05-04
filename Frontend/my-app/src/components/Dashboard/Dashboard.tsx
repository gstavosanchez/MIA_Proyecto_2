import React from "react";
import { styles } from "../styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export const Dashboard = () => {
  const clasess = styles();
  const eventsList = [
    {
      title: "Dia de las Madres",
      date: "2021-05-10",
    },
    {
        title: "Bailar",
        date: "2021-05-10",
      },
    {
      title: "Dia del trabajo",
      date: "2021-05-01",
    },
  ];
  return (
    <div className={clasess.content}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventsList}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        dayMaxEvents={true}
        weekends={true}
      />
    </div>
  );
};
