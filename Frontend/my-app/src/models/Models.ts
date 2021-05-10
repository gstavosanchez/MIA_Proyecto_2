export interface ISport {
    ID:number,
    Nombre:string,
    Imagen:string,
    Color:string
}
export interface ISeason {
    ID:number,
    Nombre:string,
    FechaInicio:string,
    FechaFin:string,
    Estado:number
}

export interface IJournaly{
    ID:number,
    Nombre:string,
    FechaInicio:string,
    FechaFin:string,
    TemporadaID:number,
    Temporada:string 
}
export interface IEvent{
    ID:number,
    Estado:number,
    Fecha:string,
    EquipoLocal:string,
    EquipoVisitante:string,
    ResultadoLocal:number,
    ResultadoVisitante:number,
    DeporteID:number,
    JornadaID:number,
    TemporadaID:number,
    Deporte:string,
    Jornada:string,
    Temporada:string
}

export interface ICalendar{
    title:string,
    date:string
}

export interface IStateCalendar {
    calendarList:ICalendar[]
    eventoList:IEvent[]
}