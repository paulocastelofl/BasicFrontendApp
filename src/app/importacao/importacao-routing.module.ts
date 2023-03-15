import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoComponent } from './novo/novo.component';
import { ProcessoComponent } from './processo/processo.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'novo-processo',
        component: NovoComponent
      },
      {
        path: 'relatorios',
        component: RelatoriosComponent
      },
      {
        path: ':id',
        component: ProcessoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportacaoRoutingModule { }
