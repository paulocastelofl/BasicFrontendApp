import { Routes } from "@angular/router";
import { EmpresaComponent } from "./empresa/empresa.component";

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'empresa',
      component: EmpresaComponent
    }]
  }
];
