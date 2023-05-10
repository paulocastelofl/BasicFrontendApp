import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { RegisterUpdateComponent } from './register-update/register-update.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'membro',
        component: ListComponent,
      },
      {
        path: 'membro/novo',
        component: RegisterUpdateComponent
      },
      {
        path: 'membro/:id',
        component: RegisterUpdateComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembrosRoutingModule { }
