package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {

	// Creo un nuevo enrutador mux

	NewMux := mux.NewRouter().StrictSlash(false)

	routes := cors.AllowAll().Handler(NewMux)

	// Creo una ruta en donde mux llama al manejador HandleFunc

	NewMux.HandleFunc("/", home)

	NewMux.HandleFunc("/obtenerCalculo", GetCalculo).Methods("GET")

	NewMux.HandleFunc("/mandarCalculo", PostCalculo).Methods("POST")

	// Creo el servidor Web

	// Paso el puerto de escucha y el enrutador mux
	// http.ListenAndServe(":3000", NewRouter)

	// Ahora creo el Servidor Web personalizado, nuestra propia estructura server

	server := &http.Server{

		Addr:           ":3000",
		Handler:        routes,
		ReadTimeout:    10 + time.Second,
		WriteTimeout:   10 + time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Println("Listening http://localhost:3000 .... ")
	server.ListenAndServe()

}

// ------------------------------------------------------------------------------------------------------------

// Función para el home - Inicio
// home - GET - /

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Mensaje desde la función HOME")
}

// ------------------------------------------------------------------------------------------------------------

// Función para obtener el historial de calculos hechos
// GetObtenerCalculo - GET - /obtenerCalculo

func GetCalculo(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "Mensaje desde la función GetCalculo - ")

	var calculos []Calculo

	for _, valor := range arregloCalculos {
		calculos = append(calculos, valor)
	}

	// Creamos una cabecera de tipo http para indicar que vamos a devolver una estructura
	// del tipo json

	w.Header().Set("Content-Type", "application/json")

	j, err := json.Marshal(calculos) // Con Marshall codificamos la estructura de go en json para poder devolverlo

	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)

	w.Write(j)
}

// ------------------------------------------------------------------------------------------------------------

// Función para poder realizar los calculos enviados por la calculadora
// PostMandarCalculo - POST - /mandarCalculo

func PostCalculo(w http.ResponseWriter, r *http.Request) {

	var calculo Calculo

	/*
		err := json.NewDecoder(r.Body).Decode(&calculo) // Decodifica lo que viene el el body del Request y lo asigna a calculo

		if err != nil {
			panic(err)
		}

		id++ // Incrementamos el id

		idS := strconv.Itoa(id) // Convertimos el id numérico a string

		arregloCalculos[idS] = calculo

		arregloResultados[id] = resultado

		// Creamos una cabecera de tipo http para indicar que el POST fue creado

		w.Header().Set("Content-Type", "application/json")

		j, err := json.Marshal(calculo) // Con Marshall codificamos la estructura de go en json para poder devolverlo

		if err != nil {
			panic(err)
		}

		w.WriteHeader(http.StatusCreated)

		w.Write(j)
	*/

	reqBody, err := ioutil.ReadAll(r.Body) //guardo todo lo que llega en reqbody

	if err != nil {
		fmt.Fprintf(w, "insert valid operator")
	}

	json.Unmarshal(reqBody, &calculo) //asigno la info  que recibo a la variable calculo

	w.Header().Set("Content-Type", "application/json") //que tipo de dato envió

	switch calculo.Operacion {

	case "+":
		resultado := (calculo.Numero1 + calculo.Numero2)
		json.NewEncoder(w).Encode(resultado)

	case "-":
		resultado := (calculo.Numero1 - calculo.Numero2)
		json.NewEncoder(w).Encode(resultado)

	case "*":
		resultado := (calculo.Numero1 * calculo.Numero2)
		json.NewEncoder(w).Encode(resultado)

	case "/":
		resultado := (calculo.Numero1 / calculo.Numero2)
		json.NewEncoder(w).Encode(resultado)

	case "**":
		resultado := math.Pow(calculo.Numero1, calculo.Numero2)
		json.NewEncoder(w).Encode(resultado)

	case "√":
		resultado := math.Sqrt(calculo.Numero1)
		json.NewEncoder(w).Encode(resultado)

	case "%":
		resultado := (((calculo.Numero1 * calculo.Numero2) / 100) + calculo.Numero1)
		json.NewEncoder(w).Encode(resultado)

	default:
		json.NewEncoder(w).Encode(0)
	}
}

// ------------------------------------------------------------------------------------------------------------

type Calculo struct {
	Numero1   float64
	Operacion string
	Numero2   float64
}

// Map del tipo Calculo para almacenar los calculos hechos y poder acceder
// para usarlo como historial

var arregloCalculos = make(map[string]Calculo)

// Variable que voy a usar para generar los id de los calculos hechos

var id int

var resultado float64

var arregloResultados []float64
