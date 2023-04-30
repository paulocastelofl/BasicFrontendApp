import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaturaComponent } from './fatura/fatura.component';
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
      {
        path: ':id/fatura',
        component: FaturaComponent
      },
      {
        path: ':id/fatura/:idfatura',
        component: FaturaComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportacaoRoutingModule { }
