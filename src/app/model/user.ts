import { productoInterface } from "./producto"

export interface userInterface{
  id?:string
  name?:string
  cantidad?:number
  listaProductos?:productoInterface[]
}
