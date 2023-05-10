import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembrosRoutingModule } from './membros-routing.module';
import { ListComponent } from './list/list.component';
import { RegisterUpdateComponent } from './register-update/register-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    RegisterUpdateComponent,
  ],
  imports: [
    CommonModule,
    MembrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CurrencyMaskModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ]
})
export class MembrosModule { }
