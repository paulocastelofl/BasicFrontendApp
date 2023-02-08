import { Routes } from "@angular/router";
import { AssociadosComponent } from "./associados/associados.component";
import { EmpresaComponent } from "./empresa/empresa.component";

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empresa/:id',
        component: EmpresaComponent
      },
      {
        path: 'associados',
        component: AssociadosComponent
      }
    ]
  }
];
