package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	_ "github.com/godror/godror"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

/* == == == == == == == == == == VARIABLES == == == == == == == == == == */
var database *sql.DB

// Types
type test struct {
	ID     int    `json:"ID"`
	Nombre string `json:"Nombre"`
}
type allTest []test

var listTest = allTest{}

// Usuario
type user struct {
	ID              int    `json:"ID"`
	UserName        string `json:"UserName"`
	Password        string `json:"Password"`
	Nombre          string `json:"Nombre"`
	Apellido        string `json:"Apellido"`
	FechaNacimiento string `json:"FechaNacimiento"`
	FechaRegistro   string `json:"FechaRegistro"`
	Email           string `json:"Email"`
	FotoPerfil      string `json:"FotoPerfil"`
	Tipo            int    `json:"Tipo"`
	Membresia       int    `json:"Membresia"`
}
type allUser []user

var userList = allUser{}

type userLogin struct {
	UserName string `json:"UserName"`
	Password string `json:"Password"`
}

// Erro
type errorRequest struct {
	Error string `json:"Error"`
}

// Membresia
type membresia struct {
	ID     int    `json:"ID"`
	Nombre string `json:"Nombre"`
	Precio int    `json:"Precio"`
}
type allMembresia []membresia

var membresiaList = allMembresia{}

// Deporte
type deporte struct {
	ID     int    `json:"ID"`
	Nombre string `json:"Nombre"`
	Imagen string `json:"Imagen"`
	Color  string `json:"Color"`
}
type allDeporte []deporte

var deporteList = allDeporte{}

// Temporada
type temporada struct {
	ID          int    `json:"ID"`
	Nombre      string `json:"Nombre"`
	FechaInicio string `json:"FechaInicio"`
	FechaFin    string `json:"FechaFin"`
	Estado      int    `json:"Estado"`
}
type allTemporada []temporada

var temporadaList = allTemporada{}

// Jornada
type jornada struct {
	ID          int    `json:"ID"`
	Nombre      string `json:"Nombre"`
	Estado      int    `json:"Estado"`
	FechaInicio string `json:"FechaInicio"`
	FechaFin    string `json:"FechaFin"`
	TemporadaID int    `json:"TemporadaID"`
	Temporada   string `json:"Temporada"`
}
type allJornada []jornada

var jornadaList = allJornada{}

// Evento
type evento struct {
	ID                 int    `json:"ID"`
	Estado             int    `json:"Estado"`
	Fecha              string `json:"Fecha"`
	DateTime           string `json:"DateTime"`
	EquipoLocal        string `json:"EquipoLocal"`
	EquipoVisitante    string `json:"EquipoVisitante"`
	ResultadoLocal     int    `json:"ResultadoLocal"`
	ResultadoVisitante int    `json:"ResultadoVisitante"`
	DeporteID          int    `json:"DeporteID"`
	JornadaID          int    `json:"JornadaID"`
	Deporte            string `json:"Deporte"`
	Jornada            string `json:"Jornada"`
	Temporada          string `json:"Temporada"`
}
type allEvento []evento

var eventoList = allEvento{}

// Prediccion
type prediccion struct {
	ID                  int    `json:"ID"`
	PrediccionLocal     int    `json:"Local"`
	PrediccionVisitante int    `json:"Visitante"`
	EventoID            int    `json:"EventoID"`
	UsuarioID           int    `json:"UsuarioID"`
	Usuario             string `json:"Usuario"`
	Deporte             string `json:"Deporte"`
	Jornada             string `json:"Jornada"`
	Temporada           string `json:"Temporada"`
	EquipoLocal         string `json:"EquipoLocal"`
	EquipoVisitante     string `json:"EquipoVistante"`
}
type allPrediccion []prediccion

var prediccionList = allPrediccion{}

// Detalle Usuario
type detalleUsuario struct {
	Usuario   string `json:"Usuario"`
	Temporada string `json:"Temporada"`
	Membresia string `json:"Membresia"`
}

/// Carga masiva

type userLoadFile struct {
	UserName string      `json:"username"`
	Password string      `json:"password"`
	Nombre   string      `json:"nombre"`
	Apellido string      `json:"apellido"`
	Results  []resultsLF `json:"resultados"`
}
type resultsLF struct {
	Season   string       `json:"temporada"`
	Tier     string       `json:"tier"`
	Journeys []journeysLF `json:"jornadas"`
}
type journeysLF struct {
	Journey     string          `json:"jornada"`
	Predictions []predictionsLF `json:"predicciones"`
}
type predictionLF struct {
	P_visitant int `json:"visitante"`
	P_local    int `json:"local"`
}

type predictionsLF struct {
	Sport      string       `json:"deporte"`
	Date       string       `json:"fecha"`
	Visit      string       `json:"visitante"`
	Local      string       `json:"local"`
	Prediction predictionLF `json:"prediccion"`
	Result     resultLF     `json:"resultado"`
}
type resultLF struct {
	R_visitant int `json:"visitante"`
	R_local    int `json:"local"`
}

type dataLoadFile map[string]userLoadFile

/* == == == == == == == == == == == == == == == == == == == == == == == == */
/* == == == == == == == == == == == SERVER == == == == == == == == == == == */
func indexRouter(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Welcome to my API")
}

func getTests(w http.ResponseWriter, r *http.Request) {
	getDbTest()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(listTest)

}
func createTest(w http.ResponseWriter, r *http.Request) {
	var newTest test
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprint(w, "Insert a Valid Test")
	}
	json.Unmarshal(reqBody, &newTest)
	newTest.ID = len(listTest) + 1
	fmt.Println(newTest)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(newTest) // Responder al servidor
}
func getUserApi(w http.ResponseWriter, r *http.Request) {
	getTime("GET to: /api/user")
	getDBUser()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userList)

}

// Get usuario by id
func getUserByIDAPI(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	getTime("GET to: /api/user/id")

	w.Header().Set("Content-Type", "application/json")
	userID, err := strconv.Atoi(vars["id"])
	if err != nil {
		var newError errorRequest
		newError.Error = "Invalid ID"
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(newError)
		return
	}
	getUserByIdDB(userID)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(userList)

}

// GET membresia
func getMembresiaAPI(w http.ResponseWriter, r *http.Request) {
	getTime("GET to: /api/membresia")
	getMembresiaDB()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(membresiaList)
}

// == == LOGIN == ==
func signInApi(w http.ResponseWriter, r *http.Request) {
	var newUserLogin userLogin
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprint(w, "Parameter for login invalids")
	}
	json.Unmarshal(reqBody, &newUserLogin)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	getTime("POST to: /api/signin")
	signInDB(newUserLogin.UserName, newUserLogin.Password)
	json.NewEncoder(w).Encode(userList) // Responder al servidor
}

// == == REGISTER == ==
func signUpApi(w http.ResponseWriter, r *http.Request) {
	var newUser user
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprint(w, "Parameter for login invalids")
	}
	json.Unmarshal(reqBody, &newUser)
	w.Header().Set("Content-Type", "application/json")
	getTime("POST to: /api/signup")
	status := signUpDB(newUser)
	if status == "success" {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(newUser)
	} else {
		var newError errorRequest
		newError.Error = "Error en la peticion"
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(newError)
	}

}

// == == EVENTO == ==
func getEventoApi(w http.ResponseWriter, r *http.Request) {
	getTime("GET to: /api/evento")
	getEventoDB()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(eventoList)
}

// == == DEPORTE == ==
func getDeporteApi(w http.ResponseWriter, r *http.Request) {
	getTime("GET to: /api/deporte")
	getDeporteDB()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(deporteList)
}

// == == TEMPORADA == ==
func getTemporadaApi(w http.ResponseWriter, r *http.Request) {
	getTime("GET to: /api/temporada")
	getTemporadaDB()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(temporadaList)
}

// == == JORNADA == ==
func getJornadaApi(w http.ResponseWriter, r *http.Request) {
	getTime("GET to: /api/jornada")
	getJornadaDB()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(jornadaList)
}

// CARGA MASIVA API
func cargaMasivaAPI(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprint(w, "Parameter for login invalids")
	}
	getTime("POST to: /api/cargamasiva")
	var dataFile dataLoadFile
	json.Unmarshal(reqBody, &dataFile)
	//fmt.Println(dataFile)
	execLoadFile(dataFile)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	var newError errorRequest
	newError.Error = "Se ejecuto la operacion"
	json.NewEncoder(w).Encode(newError)
}

// Load Carga masiva
func execLoadFile(data dataLoadFile) {
	for userKey, userValue := range data {
		var newUser user
		fmt.Println("ID:", userKey)
		fmt.Println("usuario:", userValue.Nombre)
		newUser.Nombre = userValue.Nombre
		newUser.Apellido = userValue.Apellido
		newUser.UserName = userValue.UserName
		newUser.Password = userValue.Password
		newUser.Email = userValue.UserName
		newUser.FechaNacimiento = "01-01-2000"
		for _, resultsValue := range userValue.Results {
			fmt.Println("-----")
			var newSeason temporada
			var newDetalle detalleUsuario
			newUser.Membresia = getIdMembresia(resultsValue.Tier)
			newSeason.Nombre = resultsValue.Season
			newSeason.FechaInicio = getDateSeason(resultsValue.Season)
			newDetalle.Usuario = newUser.UserName
			newDetalle.Temporada = resultsValue.Season
			newDetalle.Membresia = resultsValue.Tier
			fmt.Println("USUARIO:", newUser)
			setUsuarioDBLF(newUser)
			fmt.Println("Temporada:", newSeason)
			setTemporadaDB(newSeason)
			fmt.Println("Detalle:", newDetalle)
			// Mandar a guardar Usuario,detalleUsuario,temporada
			for _, jornadasValue := range resultsValue.Journeys {
				fmt.Println("***********************")
				var newJornada jornada
				newJornada.Nombre = jornadasValue.Journey
				newJornada.Temporada = newSeason.Nombre
				fmt.Println("Jornada:", newJornada)
				setJornadaDB(newJornada)
				for _, predictionValue := range jornadasValue.Predictions {
					fmt.Println("=============================================")
					/* == == DEPORTE == == */
					var newDeporte deporte
					newDeporte.Nombre = predictionValue.Sport
					fmt.Println("Deporte:", newDeporte)
					setDeporteDB(newDeporte)
					/* == == EVENTO == == */
					var newEvento evento
					newEvento.Fecha = getDateEvent(predictionValue.Date)
					newEvento.DateTime = strings.ReplaceAll(predictionValue.Date, "/", "-")
					newEvento.EquipoLocal = predictionValue.Local
					newEvento.EquipoVisitante = predictionValue.Visit
					newEvento.ResultadoLocal = predictionValue.Result.R_local
					newEvento.ResultadoVisitante = predictionValue.Result.R_visitant
					newEvento.Deporte = newDeporte.Nombre
					newEvento.Jornada = newJornada.Nombre
					newEvento.Temporada = newSeason.Nombre
					fmt.Println("Evento:", newEvento)
					setEventoDB(newEvento)
					/* == == PREDICCION == == */
					var newPrediction prediccion
					newPrediction.PrediccionLocal = predictionValue.Prediction.P_local
					newPrediction.PrediccionVisitante = predictionValue.Prediction.P_visitant
					newPrediction.Deporte = newDeporte.Nombre
					newPrediction.Jornada = newJornada.Nombre
					newPrediction.Temporada = newSeason.Nombre
					newPrediction.EquipoLocal = newEvento.EquipoLocal
					newPrediction.EquipoVisitante = newEvento.EquipoVisitante
					newPrediction.Usuario = newUser.UserName
					fmt.Println("Prediccion:", newPrediction)
					setPredictionDB(newPrediction)
				}

			}

		}
	}
}
func getIdMembresia(tier string) int {
	switch strings.ToLower(tier) {
	case "gold":
		return 1
	case "silver":
		return 2
	case "bronze":
		return 3
	default:
		return 4
	}
}
func getDateSeason(name string) string {
	// 2019-Q2
	var year, month string
	date := ""
	split := strings.Split(name, "-")
	year = split[0]
	month = strings.ReplaceAll(split[1], "Q", "")
	numMonth, err := strconv.Atoi(month)
	if err != nil {
		return ""
	}
	if numMonth <= 9 {
		month = "0" + month
	}
	date = "01-" + month + "-" + year
	return date
}
func getDateEvent(dateTime string) string {
	// 05/03/2018 11:58
	date := ""
	split := strings.Split(dateTime, " ")
	date = strings.ReplaceAll(split[0], "/", "-")
	return date
}

/* == == == == == == == == == == == == == == == == == == == == == == == == */
/* == == == == == == == == == == == DATABASE == == == == == == == == == == */
func getDbTest() {
	var index int
	var data string
	var newTest test
	listTest = allTest{}

	rows, err := database.Query("SELECT * FROM Test")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}

	for rows.Next() {
		rows.Scan(&index, &data)
		fmt.Printf(strconv.Itoa(index)+" %s", data)
		fmt.Printf("\n")
		newTest.ID = index
		newTest.Nombre = data
		listTest = append(listTest, newTest)
	}
	defer rows.Close()
}
func getDBUser() {
	var userNew user
	userList = allUser{}
	rows, err := database.Query("SELECT * FROM Usuario WHERE tipo_ID = 1")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&userNew.ID, &userNew.UserName, &userNew.Password, &userNew.Nombre,
			&userNew.Apellido, &userNew.FechaNacimiento, &userNew.FechaRegistro, &userNew.Email,
			&userNew.FotoPerfil, &userNew.Tipo, &userNew.Membresia)
		//fmt.Println(userNew)
		userList = append(userList, userNew)
	}
	defer rows.Close()
}
func getUserByIdDB(id int) {
	var userNew user
	userList = allUser{}
	idStr := strconv.FormatInt(int64(id), 10)
	query := "SELECT * FROM Usuario WHERE usuario_ID = " + idStr
	rows, err := database.Query(query)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&userNew.ID, &userNew.UserName, &userNew.Password, &userNew.Nombre,
			&userNew.Apellido, &userNew.FechaNacimiento, &userNew.FechaRegistro, &userNew.Email,
			&userNew.FotoPerfil, &userNew.Tipo, &userNew.Membresia)
		userList = append(userList, userNew)
	}
	defer rows.Close()
}
func signInDB(username, password string) {
	var userNew user
	userList = allUser{}
	query := "SELECT * FROM Usuario WHERE user_name LIKE ('" + username + "') AND pass LIKE('" + password + "')"
	//fmt.Println(query)
	rows, err := database.Query(query)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&userNew.ID, &userNew.UserName, &userNew.Password, &userNew.Nombre,
			&userNew.Apellido, &userNew.FechaNacimiento, &userNew.FechaRegistro, &userNew.Email,
			&userNew.FotoPerfil, &userNew.Tipo, &userNew.Membresia)
		userList = append(userList, userNew)
	}
	defer rows.Close()
}
func signUpDB(newUser user) string {
	_, err := database.Exec("call sp_insert_usuario(:1,:2,:3,:4,:5,:6,:7)",
		newUser.UserName, newUser.Password, newUser.Nombre,
		newUser.Apellido, newUser.FechaNacimiento, newUser.Email,
		newUser.Membresia)
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return "failed"
	}
	return "success"
}
func getMembresiaDB() {
	var membresiaNew membresia
	membresiaList = allMembresia{}
	rows, err := database.Query("SELECT * FROM Membresia")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&membresiaNew.ID, &membresiaNew.Nombre, &membresiaNew.Precio)
		membresiaList = append(membresiaList, membresiaNew)
	}
	defer rows.Close()
}
func getEventoDB() {
	var event evento
	eventoList = allEvento{}
	rows, err := database.Query("SELECT * FROM EVENTO")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&event.ID, &event.Estado, &event.Fecha, &event.EquipoLocal,
			&event.EquipoVisitante, &event.ResultadoLocal, &event.ResultadoVisitante,
			&event.DeporteID, &event.JornadaID)
		eventoList = append(eventoList, event)
	}
	defer rows.Close()

}
func getDeporteDB() {
	var sport deporte
	deporteList = allDeporte{}
	rows, err := database.Query("SELECT * FROM DEPORTE")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&sport.ID, &sport.Nombre, &sport.Imagen, &sport.Color)
		deporteList = append(deporteList, sport)
	}
	defer rows.Close()

}
func getJornadaDB() {
	var journal jornada
	jornadaList = allJornada{}
	rows, err := database.Query("SELECT * FROM JORNADA")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&journal.ID, &journal.Nombre, &journal.Estado,
			&journal.FechaInicio, &journal.FechaFin, &journal.TemporadaID)
		jornadaList = append(jornadaList, journal)
	}
	defer rows.Close()

}
func getTemporadaDB() {
	var season temporada
	temporadaList = allTemporada{}
	rows, err := database.Query("SELECT * FROM TEMPORADA")
	if err != nil {
		fmt.Println("Error running query")
		fmt.Println(err)
		return
	}
	for rows.Next() {
		rows.Scan(&season.ID, &season.Nombre, &season.FechaInicio,
			&season.FechaFin, &season.Estado)
		temporadaList = append(temporadaList, season)
	}
	defer rows.Close()

}

/* == == == == == == == == == == == CARGA MASIVA == == == == == == == == == == == */
/* == == USUARIO == == */
func setUsuarioDBLF(newUser user) {
	_, err := database.Exec("call sp_insert_usuario_carga_masiva(:1,:2,:3,:4,:5,:6,:7)",
		newUser.UserName, newUser.Password, newUser.Nombre,
		newUser.Apellido, newUser.FechaNacimiento, newUser.Email,
		newUser.Membresia)
	if err != nil {
		fmt.Println("Error in Query:", err)
		return
	}
}

/* == == TEMPORADA == == */
func setTemporadaDB(season temporada) {
	_, err := database.Exec("call sp_insert_temporada(:1,:2)", season.Nombre, season.FechaInicio)
	if err != nil {
		fmt.Println("Error in Query:", err)
		return
	}
}

/* == == JORNADA == == */
func setJornadaDB(journaley jornada) {
	_, err := database.Exec("call sp_insert_jornada(:1,:2)", journaley.Nombre, journaley.Temporada)
	if err != nil {
		fmt.Println("Error in Query:", err)
		return
	}

}

/* == == DEPORTE == == */
func setDeporteDB(sport deporte) {
	_, err := database.Exec("call sp_insert_deporte(:1)", sport.Nombre)
	if err != nil {
		fmt.Println("Error in Query:", err)
		return
	}
}

/* == == EVENTO == == */
func setEventoDB(event evento) {
	_, err := database.Exec("call sp_insert_evento(:1,:2,:3,:4,:5,:6,:7,:8,:9)",
		event.Fecha, event.DateTime, event.EquipoLocal,
		event.EquipoVisitante, event.ResultadoLocal, event.ResultadoVisitante,
		event.Deporte, event.Jornada, event.Temporada)
	if err != nil {
		fmt.Println("Error in Query:", err)
		return
	}

}
func setPredictionDB(prediction prediccion) {
	_, err := database.Exec("call sp_insert_prediccion(:1,:2,:3,:4,:5,:6,:7,:8)",
		prediction.PrediccionLocal, prediction.PrediccionVisitante, prediction.Usuario,
		prediction.Deporte, prediction.Jornada, prediction.Temporada,
		prediction.EquipoLocal, prediction.EquipoVisitante)
	if err != nil {
		fmt.Println("Error in Query:", err)
		return
	}
}

/* == == == == == == == == == == == == == == == == == == == == == == == == */
func getTime(data string) {
	time := time.Now()
	fecha := fmt.Sprintf("%02d:%02d:%02d",
		time.Hour(), time.Minute(), time.Second())
	request := "[ " + fecha + " ]" + " " + data
	fmt.Println(request)

}

/* == == == == == == == == == == == == MAIN == == == == == == == == ==  == */
func main() {
	/* == == == CONNECT DB == == == */
	db, err := sql.Open("godror", "root/root@localhost:1521/ORCLCDB.localdomain")
	if err != nil {
		fmt.Println(err)
		return
	}
	database = db
	fmt.Println("Database is connect")
	defer db.Close()
	/* == == == SERVER == == == */
	router := mux.NewRouter().StrictSlash(true)
	// Rutas
	router.HandleFunc("/", indexRouter)
	router.HandleFunc("/test", getTests).Methods("GET")
	//router.HandleFunc("/test", createTest).Methods("POST")
	// Membresia
	router.HandleFunc("/api/membresia", getMembresiaAPI).Methods("GET")

	//USUARIO
	router.HandleFunc("/api/user", getUserApi).Methods("GET")
	router.HandleFunc("/api/user/{id}", getUserByIDAPI).Methods("GET")

	// LOGIN - REGISTER
	router.HandleFunc("/api/signin", signInApi).Methods("POST")
	router.HandleFunc("/api/signup", signUpApi).Methods("POST")

	// EVENTO
	router.HandleFunc("/api/evento", getEventoApi).Methods("GET")

	// DEPORTE
	router.HandleFunc("/api/deporte", getDeporteApi).Methods("GET")

	// TEMPORADA
	router.HandleFunc("/api/temporada", getTemporadaApi).Methods("GET")

	// JORNADA
	router.HandleFunc("/api/jornada", getJornadaApi).Methods("GET")

	// CARGA MASIVA
	router.HandleFunc("/api/cargamasiva", cargaMasivaAPI).Methods("POST")

	fmt.Println("Server on port 4000")
	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":4000", handler))
}
