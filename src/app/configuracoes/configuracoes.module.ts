import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa/empresa.component';
import { ComponentsRoutes } from './configuracoes.routing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ComponentsRoutes)
  ],
  declarations: [
    EmpresaComponent
  ]
 
})
export class ConfiguracoesModule { }
