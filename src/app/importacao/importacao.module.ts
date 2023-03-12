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


@NgModule({
  declarations: [
    NovoComponent,
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
