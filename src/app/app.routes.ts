import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VentasComponent } from './pages/ventas/ventas.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'categorias',
    component: CategoriasComponent
  },

  {
    path: 'clientes',
    component: ClientesComponent
  },

  {
    path: 'productos',
    component: ProductosComponent
  },

  {
    path: 'ventas',
    component: VentasComponent
  }

];