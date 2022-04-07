import { CalculadoraService } from './../../service/calculadora.service';
import { Component, OnInit } from '@angular/core';
import { Datos } from 'src/app/models/calculadora.models';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})

export class CalculadoraComponent {


  constructor(
    private calculadoraService: CalculadoraService
  ) { }

  // Inicializo los datos a enviar

  datos: Datos = {
    numero1: -1,
    operacion: "",
    numero2: -1
  }

// Variables

  operacionPendiente: boolean = false
  escribirPantalla: string = ""
  numeroPendiente: string = ""
  numeroEspera: string = ""
  contador: number = 0

  ingresarNumero(num: number | string) {

    // Concatena los números

    if (this.escribirPantalla.trim() == "" && this.operacionPendiente == false) {

      this.numeroPendiente = num.toString()
      this.escribirPantalla = this.numeroPendiente

    } else if (this.escribirPantalla.trim() != "" && this.operacionPendiente == false) {

      this.numeroPendiente = num.toString()
      this.escribirPantalla += this.numeroPendiente
    }

    if (this.escribirPantalla.trim() != "" && this.operacionPendiente == true && this.contador == 0) {

      this.numeroEspera = num.toString();
      this.contador += 1
      this.escribirPantalla += this.numeroEspera

    } else if (this.numeroEspera != "" && this.operacionPendiente == true && this.contador > 0) {

      this.numeroEspera += num.toString()
      this.escribirPantalla = this.escribirPantalla + num.toString()
    }

    console.log('numero1', this.datos.numero1, 'numero2', this.datos.numero2)

  }

  ingresarOperacion(operacion: string) {


    this.datos.operacion = operacion
    this.operacionPendiente = true

    // Asigno a numero1 su valor

    if (this.datos.numero1 < 0) {

      // Convierte el string a número y lo guarda

      if (!isNaN(Number(this.escribirPantalla))) {

        this.datos.numero1 = Number(this.escribirPantalla);
      }
    }

    this.escribirPantalla += operacion
  }

  limpiar() {

    if (this.escribirPantalla != "") {

      this.escribirPantalla = this.escribirPantalla.substr(0, this.escribirPantalla.length - 1)
    }
  }

  limpiarTodo() {

    if (this.escribirPantalla != "") {

      this.operacionPendiente = false
      this.escribirPantalla = ""
      this.numeroPendiente = ""
      this.numeroEspera = ''
      this.contador = 0
      this.escribirPantalla = ''
      this.datos.numero1 = -1
      this.datos.numero2 = -1
      this.datos.operacion = ""
    }
  }

  resultado() {

    this.datos.numero2 = Number(this.numeroEspera);

    console.log('numero1', this.datos.numero1, 'numero2', this.datos.numero2)
    console.log(this.datos)

    this.calculadoraService.getResultado(this.datos).subscribe(
      {
        next: res => {

          console.log("resultado", res)
          this.limpiarTodo()
          this.escribirPantalla = res.toString()

        },

        error: error => {
          console.log(error)
        }
      }
    )
  }



  /*
  constructor(){ }

    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }

    // Variables del tipo string

    input: string = '';
    result: string = '';

    // Función ------

    pressNum(num: string) {

      if (num == ".") {
        if (this.input != "") {

          const lastNum = this.getLastOperand()
          console.log(lastNum.lastIndexOf("."))
          if (lastNum.lastIndexOf(".") >= 0) return;
        }
      }

      if (num == "0") {
        if (this.input == "") {
          return;
        }
        const PrevKey = this.input[this.input.length - 1];
        if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
          return;
        }
      }

      this.input = this.input + num
      this.calcAnswer();
    }


    getLastOperand() {
      let pos: number;
      console.log(this.input)
      pos = this.input.toString().lastIndexOf("+")
      if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
      if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
      if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
      console.log('Last ' + this.input.substr(pos + 1))
      return this.input.substr(pos + 1)
    }


    pressOperator(operacion: string) {

      const lastKey = this.input[this.input.length - 1];
      if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
        return;
      }

      this.input = this.input + operacion
      this.calcAnswer();
    }

    calcAnswer() {
      let formula = this.input;

      let lastKey = formula[formula.length - 1];

      if (lastKey === '.') {
        formula = formula.substr(0, formula.length - 1);
      }

      lastKey = formula[formula.length - 1];

      if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
        formula = formula.substr(0, formula.length - 1);
      }

      console.log("Formula " + formula);
      this.result = eval(formula);
    }

    getAnswer() {
      this.calcAnswer();
      this.input = this.result;
      if (this.input == "0") this.input = "0";
    }

    clear() {
      if (this.input != "") {
        this.input = this.input.substr(0, this.input.length - 1)
      }
    }

    allClear() {
      this.result = '';
      this.input = '';
    }
  */
}
