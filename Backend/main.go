package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
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
		fmt.Println("USUARIO")
		fmt.Println(newUser)
		// Resultados
		for _, resultsValue := range userValue.Results {
			fmt.Println(resultsValue.Season)
			fmt.Println(resultsValue.Tier)
			fmt.Println("-----")
		}
	}
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

	// CARGA MASIVA
	router.HandleFunc("/api/cargamasiva", cargaMasivaAPI).Methods("POST")

	fmt.Println("Server on port 4000")
	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":4000", handler))
}

/* func loadTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var Carga Info
	json.NewDecoder(r.Body).Decode(&Carga)

	for key, element := range Carga {
		fmt.Println("ID:", key)
		fmt.Print("\t")
		fmt.Println("Usuario:", element.User)
		fmt.Print("\t")
		fmt.Println("Clave:", element.Pass)
		fmt.Print("\t")
		fmt.Println("Nombre:", element.Name)
		fmt.Print("\t")
		fmt.Println("Apellido:", element.Last)
		for _, element := range element.Results {
			fmt.Print("\t")
			fmt.Println("Resultados:")
			fmt.Print("\t\t")
			fmt.Println("Temporada:", element.Season)
			fmt.Print("\t\t")
			fmt.Println("Membresia:", element.Tier)
			for _, element := range element.Journeys {
				fmt.Print("\t\t")
				fmt.Println("Jornadas:")
				fmt.Print("\t\t\t")
				fmt.Println("Jornada:", element.Journey)
				for _, element := range element.Predictions {
					fmt.Print("\t\t\t")
					fmt.Println("Predicciones:")
					fmt.Print("\t\t\t\t")
					fmt.Println("Deporte:", element.Sport)
					fmt.Print("\t\t\t\t")
					fmt.Println("Local:", element.Local)
					fmt.Print("\t\t\t\t")
					fmt.Println("Visitante:", element.Visit)
					fmt.Print("\t\t\t\t")
					fmt.Println("Fecha:", element.Date)
					fmt.Print("\t\t\t\t")
					fmt.Println("Prediccion:")
					fmt.Print("\t\t\t\t\t")
					fmt.Println("P Local:", element.Result.R_local)
					fmt.Print("\t\t\t\t\t")
					fmt.Println("P Visita:", element.Result.R_visitant)
					fmt.Print("\t\t\t\t")
					fmt.Println("Resultado:")
					fmt.Print("\t\t\t\t\t")
					fmt.Println("R Local:", element.Prediction.P_local)
					fmt.Print("\t\t\t\t\t")
					fmt.Println("R Visita:", element.Prediction.P_visitant)

				}
			}
		}
	}
} */
