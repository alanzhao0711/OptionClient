import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./PLCalendar.scss";

const PLCalendar = (props) => {
  const { data } = props;
  const events = data.map((item, index) => {
    const currentBalance = item.balance;
    const prevBalance = index > 0 ? data[index - 1].balance : item.balance;
    const pl = currentBalance - prevBalance;
    const color = pl >= 0 ? "#1ABC9C" : "#FF5733";
    return {
      title: pl.toLocaleString(),
      date: item.date,
      color: color,
    };
  });

  return (
    <div className="card">
      <div className="card-body">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          weekends={false}
          eventRender={events}
        />
      </div>
    </div>
  );
};

export default PLCalendar;
