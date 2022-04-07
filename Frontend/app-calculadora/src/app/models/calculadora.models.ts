// Creo la estructura de los datos a enviar (objeto que utilizo)

export interface Datos{

  numero1:number | string
  operacion: string
  numero2: number| string

}

export interface Retorno{

  error: string| null,
  datos:number |null,
  status: boolean,
  tag: string

}
