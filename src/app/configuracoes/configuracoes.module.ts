import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa/empresa.component';
import { ComponentsRoutes } from './configuracoes.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BasicoComponent } from './cards-forms/basico/basico.component';
import { UsuariosComponent } from './cards-forms/usuarios/usuarios.component';
import { ImportacaoComponent } from './cards-forms/importacao/importacao.component';
import { DocumentosComponent } from './cards-forms/documentos/documentos.component';
import { CredenciaisComponent } from './cards-forms/credenciais/credenciais.component';
import { VerticalTabsComponent } from './components/vertical-tabs/vertical-tabs.component';
import { FinanceiroComponent } from './cards-forms/financeiro/financeiro.component';
import { RelatoriosComponent } from './cards-forms/relatorios/relatorios.component';
import { AgenciamentoCargaComponent } from './cards-forms/agenciamento-carga/agenciamento-carga.component';
import { ExportacaoComponent } from './cards-forms/exportacao/exportacao.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgSelectModule } from '@ng-select/ng-select';
import { AssociadosComponent } from './associados/associados.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ComponentsRoutes),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    JwBootstrapSwitchNg2Module
  
  ],
  declarations: [
    EmpresaComponent,
    BasicoComponent,
    UsuariosComponent,
    ImportacaoComponent,
    DocumentosComponent,
    CredenciaisComponent,
    VerticalTabsComponent,
    FinanceiroComponent,
    RelatoriosComponent,
    AgenciamentoCargaComponent,
    ExportacaoComponent,
    AssociadosComponent
  ]
 
})
export class ConfiguracoesModule { }
