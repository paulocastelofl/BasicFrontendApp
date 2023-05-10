import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutes } from './configuracoes.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasicoComponent } from './cards-forms/basico/basico.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgSelectModule } from '@ng-select/ng-select';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'app/shared/shared.module';
import { IgrejaComponent } from './igreja/igreja.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ComponentsRoutes),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    JwBootstrapSwitchNg2Module,
    CurrencyMaskModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [
    IgrejaComponent,
    BasicoComponent
  ]

})
export class ConfiguracoesModule { }
