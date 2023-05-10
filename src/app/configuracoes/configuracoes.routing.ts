import { Routes } from "@angular/router";
import { IgrejaComponent } from "./igreja/igreja.component";


export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'igreja',
        component: IgrejaComponent,
      },
      {
        path: 'igreja/:id',
        component: IgrejaComponent
      }
     
    ]
  }
];
