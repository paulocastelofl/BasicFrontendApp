import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportacaoRoutingModule } from './importacao-routing.module';
import { NovoComponent } from './novo/novo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { BoldSpanPipe } from 'app/core/pipes/bold-span.pipes';
import { SharedModule } from 'app/shared/shared.module';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ProcessoComponent } from './processo/processo.component';
import { BasicoComponent } from './shared-form/basico/basico.component';
import { VerticalTabsComponent } from 'app/shared/vertical-tabs/vertical-tabs.component';
import { FeedComponent } from './shared-form/feed/feed.component';
import { CargaComponent } from './shared-form/carga/carga.component';
import { RelatorioFaturasComponent } from './shared-form/relatorio-faturas/relatorio-faturas.component';
import { FaturaComponent } from './fatura/fatura.component';
import { HeaderProcessoComponent } from './components/header-processo/header-processo.component';
import { FornecedorComponent } from './fatura/forms/fornecedor/fornecedor.component';
import { ItensComponent } from './fatura/forms/itens/itens.component';
import { PliComponent } from './fatura/forms/pli/pli.component';
import { BasicoFaturaComponent } from './fatura/forms/basico-fatura/basico-fatura.component';


@NgModule({
  declarations: [
    NovoComponent,
    RelatoriosComponent,
    ProcessoComponent,
    BasicoComponent,
    FeedComponent,
    CargaComponent,
    RelatorioFaturasComponent,
    FaturaComponent,
    HeaderProcessoComponent,
    FornecedorComponent,
    ItensComponent,
    PliComponent,
    BasicoFaturaComponent,
  ],
  imports: [
    CommonModule,
    ImportacaoRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    JwBootstrapSwitchNg2Module,
    CurrencyMaskModule,
    NgxPaginationModule,
   SharedModule
    
  
  ]
})
export class ImportacaoModule { }
