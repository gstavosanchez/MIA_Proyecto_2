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
	router.HandleFunc("/api/user", getUserApi).Methods("GET")
	router.HandleFunc("/api/signin", signInApi).Methods("POST")
	router.HandleFunc("/api/signup", signUpApi).Methods("POST")

	fmt.Println("Server on port 4000")
	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":4000", handler))
}
