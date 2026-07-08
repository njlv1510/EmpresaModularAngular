import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Venta } from '../../models/venta';
import { Cliente } from '../../models/cliente';
import { Producto } from '../../models/producto';

import { VentaService } from '../../services/venta.service';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  private ventaService = inject(VentaService);
  private clienteService = inject(ClienteService);
  private productoService = inject(ProductoService);

  ventas: Venta[] = [];
  clientes: Cliente[] = [];
  productos: Producto[] = [];

  mostrarFormulario = false;
  modoEdicion = false;

  nuevaVenta: Venta = {
    id: 0,
    fecha: new Date().toISOString(),
    cantidad: 1,
    total: 0,
    clienteId: 0,
    productoId: 0
  };

  ngOnInit(): void {
    this.cargarVentas();
    this.cargarClientes();
    this.cargarProductos();
  }

  cargarVentas() {
    this.ventaService.getVentas().subscribe({
      next: data => this.ventas = data,
      error: err => console.error(err)
    });
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: data => this.clientes = data,
      error: err => console.error(err)
    });
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: data => this.productos = data,
      error: err => console.error(err)
    });
  }

  calcularTotal() {

    const producto = this.productos.find(
      p => p.id === this.nuevaVenta.productoId
    );

    if (producto) {
      this.nuevaVenta.total =
        producto.precio * this.nuevaVenta.cantidad;
    }

  }

  guardarVenta() {

    if (this.modoEdicion) {

      this.ventaService.actualizarVenta(
        this.nuevaVenta.id,
        this.nuevaVenta
      ).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Venta actualizada correctamente',
            timer: 1800,
            showConfirmButton: false
          });

          this.cancelar();
          this.cargarVentas();

        },

        error: err => console.error(err)

      });

      return;

    }

    this.ventaService.crearVenta(this.nuevaVenta).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Venta registrada correctamente',
          timer: 1800,
          showConfirmButton: false
        });

        this.cancelar();
        this.cargarVentas();

      },

      error: err => console.error(err)

    });

  }

  editarVenta(venta: Venta) {

    this.mostrarFormulario = true;

    this.modoEdicion = true;

    this.nuevaVenta = {
      id: venta.id,
      fecha: venta.fecha,
      cantidad: venta.cantidad,
      total: venta.total,
      clienteId: venta.clienteId,
      productoId: venta.productoId
    };

  }

  eliminarVenta(id: number) {

    Swal.fire({
      title: '¿Eliminar venta?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {

      if (result.isConfirmed) {

        this.ventaService.eliminarVenta(id).subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Venta eliminada correctamente',
              timer: 1800,
              showConfirmButton: false
            });

            this.cargarVentas();

          },

          error: err => console.error(err)

        });

      }

    });

  }

  cancelar() {

    this.mostrarFormulario = false;

    this.modoEdicion = false;

    this.nuevaVenta = {
      id: 0,
      fecha: new Date().toISOString(),
      cantidad: 1,
      total: 0,
      clienteId: 0,
      productoId: 0
    };

  }

}
