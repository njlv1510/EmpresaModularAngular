import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  private clienteService = inject(ClienteService);

  clientes: Cliente[] = [];

  mostrarFormulario = false;

  modoEdicion = false;

  nuevoCliente: Cliente = {
    id: 0,
    identificacion: '',
    nombre: '',
    correo: '',
    telefono: ''
  };

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => console.error(err)
    });
  }

  guardarCliente(): void {

    if (this.modoEdicion) {

      this.clienteService.actualizarCliente(
        this.nuevoCliente.id,
        this.nuevoCliente
      ).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Cliente actualizado correctamente',
            timer: 1800,
            showConfirmButton: false
          });

          this.cancelar();

          this.cargarClientes();

        },

        error: err => console.error(err)

      });

      return;

    }

    this.clienteService.crearCliente(this.nuevoCliente).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'Cliente creado correctamente',
          timer: 1800,
          showConfirmButton: false
        });

        this.cancelar();

        this.cargarClientes();

      },

      error: err => console.error(err)

    });

  }

  editarCliente(cliente: Cliente): void {

    this.mostrarFormulario = true;

    this.modoEdicion = true;

    this.nuevoCliente = {
      ...cliente
    };

  }

  eliminarCliente(id: number): void {

    Swal.fire({
      title: '¿Eliminar cliente?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {

      if (result.isConfirmed) {

        this.clienteService.eliminarCliente(id).subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Cliente eliminado correctamente',
              timer: 1800,
              showConfirmButton: false
            });

            this.cargarClientes();

          },

          error: err => console.error(err)

        });

      }

    });

  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.modoEdicion = false;

    this.nuevoCliente = {
      id: 0,
      identificacion: '',
      nombre: '',
      correo: '',
      telefono: ''
    };

  }

}