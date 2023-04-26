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
import { FinanceiroComponent } from './cards-forms/financeiro/financeiro.component';
import { RelatoriosComponent } from './cards-forms/relatorios/relatorios.component';
import { AgenciamentoCargaComponent } from './cards-forms/agenciamento-carga/agenciamento-carga.component';
import { ExportacaoComponent } from './cards-forms/exportacao/exportacao.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgSelectModule } from '@ng-select/ng-select';
import { AssociadosComponent } from './associados/associados.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { ItensComponent } from './cards-forms/importacao/forms/itens/itens.component';
import { BasicoImportacaoComponent } from './cards-forms/importacao/forms/basico-importacao/basico-importacao.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BoldSpanPipe } from 'app/core/pipes/bold-span.pipes';
import { FornecedoresComponent } from './cards-forms/importacao/forms/fornecedores/fornecedores.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgenteComponent } from './cards-forms/importacao/forms/agente/agente.component';
import { SharedModule } from 'app/shared/shared.module';
import { VerticalTabsComponent } from 'app/shared/vertical-tabs/vertical-tabs.component';
import { TransportadoresComponent } from './cards-forms/importacao/forms/transportadores/transportadores.component';
import { ZfmComponent } from './cards-forms/zfm/zfm.component';
import { BasicoZfmComponent } from './cards-forms/zfm/forms/basico-zfm/basico-zfm.component';
import { LinhasZfmComponent } from './cards-forms/zfm/forms/linhas-zfm/linhas-zfm.component';
import { ItensZfmComponent } from './cards-forms/zfm/forms/itens-zfm/itens-zfm.component';
import { MatrizZfmComponent } from './cards-forms/zfm/forms/matriz-zfm/matriz-zfm.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { BasicoMinhaContaComponent } from './cards-forms/basico-minha-conta/basico-minha-conta.component';
import { CredenciaisMinhaContaComponent } from './cards-forms/credenciais-minha-conta/credenciais-minha-conta.component';


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
    EmpresaComponent,
    BasicoComponent,
    UsuariosComponent,
    ImportacaoComponent,
    DocumentosComponent,
    CredenciaisComponent,
    FinanceiroComponent,
    RelatoriosComponent,
    AgenciamentoCargaComponent,
    ExportacaoComponent,
    AssociadosComponent,
    ItensComponent,
    BasicoImportacaoComponent,
    FornecedoresComponent,
    AgenteComponent,
    TransportadoresComponent,
    ZfmComponent,
    BasicoZfmComponent,
    LinhasZfmComponent,
    ItensZfmComponent,
    MatrizZfmComponent,
    MinhaContaComponent,
    BasicoMinhaContaComponent,
    CredenciaisMinhaContaComponent
  ]

})
export class ConfiguracoesModule { }
