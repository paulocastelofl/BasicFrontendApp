import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoComponent } from './novo/novo.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'novo-processo',
      component: NovoComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportacaoRoutingModule { }
