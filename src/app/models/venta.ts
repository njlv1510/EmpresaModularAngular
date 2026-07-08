export interface Venta {

  id: number;

  fecha: string;

  cantidad: number;

  total: number;

  clienteId: number;

  productoId: number;

  cliente?: {
    id: number;
    identificacion: string;
    nombre: string;
    correo: string;
    telefono: string;
  };

  producto?: {
    id: number;
    nombre: string;
    codigo: string;
    precio: number;
    stock: number;
    categoriaId: number;
  };

}