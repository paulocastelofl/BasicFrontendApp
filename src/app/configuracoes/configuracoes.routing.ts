import { Routes } from "@angular/router";
import { AssociadosComponent } from "./associados/associados.component";
import { EmpresaComponent } from "./empresa/empresa.component";
import { MinhaContaComponent } from './minha-conta/minha-conta.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empresa/:id',
        component: EmpresaComponent,
      },
      {
        path: 'empresa/:id/associados',
        component: AssociadosComponent
      },
      {
        path: 'empresa/:id/minha-conta',
        component: MinhaContaComponent
      }
    ]
  }
];
