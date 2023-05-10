import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegisterUpdateComponent } from './register-update/register-update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'celula',
        component: ListComponent,
      },
      {
        path: 'celula/novo',
        component: RegisterUpdateComponent
      },
      {
        path: 'celula/:id',
        component: RegisterUpdateComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelulasRoutingModule { }
