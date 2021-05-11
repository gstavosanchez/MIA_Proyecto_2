import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import { ICalendar, IStateCalendar } from "../../models/Models";
import { getEvents } from "../../services/ModelService";
import { useHistory } from "react-router";

export const Dashboard = () => {
  const initalState: IStateCalendar = {
    calendarList: [],
    eventoList: [],
  };
  const clasess = styles();
  const [estado, setEstado] = useState<IStateCalendar>(initalState);
  const history = useHistory();

  const getTitle = (eLocal: string, eVisit: string): string => {
    return `${eLocal} VS ${eVisit}`;
  };

  const loadEvent = async() => {
    const res = await getEvents();
    const dataList: ICalendar[] = [];
    if (res.data) {
      // console.log(res.data)
      setEstado({
        ...estado,
        eventoList: res.data
      });
      estado.eventoList = res.data
      res.data.forEach((event) => {
        const newData: ICalendar = {
          title: getTitle(event.EquipoLocal, event.EquipoVisitante),
          date: event.Fecha,
        };
        dataList.push(newData);
      });
      setEstado({
        ...estado,
        calendarList: dataList
      });
      estado.calendarList= dataList
      // console.log(estado)
    }
  }
  

  //events={eventsList}
  useEffect(() => {
    loadEvent();
  },[]);


  const getEventByTeam = (local:string,visit:string,date:Date):number => {
    for (let index = 0; index < estado.eventoList.length; index++) {
      const element = estado.eventoList[index];
      if(element.EquipoLocal === local && element.EquipoVisitante){
        const eventDate:Date = new Date(element.Fecha)
        const fecha1:string =date.getTime().toString().trim()
        const fecha2:string = eventDate.getTime().toString().trim()  
        if ( fecha1 === fecha2 ){
          const id:number = element.ID
          return id
        }
      }
      
    }
    return 0
  }
  
  const handleDateClick = (arg:any) => {
    const eventName:string = arg.event.title
    const date:Date = new Date(arg.event.start)
    const split:string[] = eventName.split("VS")
    const eventID:number = getEventByTeam(split[0].trim(),split[1].trim(),date)
    if(eventID !== 0){
      history.push(`/calendar/${eventID}`)
    }
   
  }
  

  return (
    <div className={clasess.content}>
      <FullCalendar
        plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={estado.calendarList}
        editable={true}
        selectable={true}
        dayMaxEvents={true}
        weekends={true}
        eventClick={handleDateClick}
      />
    </div>
  );
};
