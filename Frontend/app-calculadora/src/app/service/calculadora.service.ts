import { Datos, Retorno } from '../models/calculadora.models';
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{environment}from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CalculadoraService {

  url:string = environment.apiUrl

  constructor(
    private http: HttpClient) { }

  getResultado(datos: Datos){
    return this.http.post<Datos>(`${this.url}/mandarCalculo`, datos)
    }

}
