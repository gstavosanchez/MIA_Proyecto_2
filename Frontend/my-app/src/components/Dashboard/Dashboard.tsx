import React, { useCallback, useEffect, useState } from "react";
import { styles } from "../styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ICalendar, IStateCalendar } from "../../models/Models";
import { getEvents } from "../../services/ModelService";

export const Dashboard = () => {
  const initalState:IStateCalendar ={
    calendarList:[],
    eventoList:[]
  }
  const clasess = styles();
  const [estado, setEstado] = useState<IStateCalendar>(initalState)
  
  const getTitle = (eLocal:string,eVisit:string):string => {
    return `${eLocal} VS ${eVisit}`
  }

  const loadEvent = useCallback(async() => {
    const res = await getEvents()
    if(res.data){
      setEstado({
        ...estado,
        eventoList:res.data 
      })
      const dataList:ICalendar[] = []
      estado.eventoList.forEach(event => {
      const newData:ICalendar = {
        title:getTitle(event.EquipoLocal,event.EquipoVisitante),
        date:event.Fecha
      }
      console.log(newData)
      dataList.push(newData)
    });
    
    setEstado({
      ...estado,
      calendarList:dataList
    })
    }
  },[setEstado,estado])
  //events={eventsList}
  useEffect(() => {
    loadEvent()
  }, [loadEvent])
  
  return (
    <div className={clasess.content}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={estado.calendarList}
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
