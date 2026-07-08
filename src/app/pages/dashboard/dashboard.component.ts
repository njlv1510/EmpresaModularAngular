import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaService } from '../../services/categoria.service';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private categoriaService = inject(CategoriaService);
  private clienteService = inject(ClienteService);
  private productoService = inject(ProductoService);
  private ventaService = inject(VentaService);

  totalCategorias = 0;
  totalClientes = 0;
  totalProductos = 0;
  totalVentas = 0;

  ngOnInit(): void {

    this.categoriaService.getCategorias().subscribe(data => {
      this.totalCategorias = data.length;
    });

    this.clienteService.getClientes().subscribe(data => {
      this.totalClientes = data.length;
    });

    this.productoService.getProductos().subscribe(data => {
      this.totalProductos = data.length;
    });

    this.ventaService.getVentas().subscribe(data => {
      this.totalVentas = data.length;
    });

  }

}
