import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-basico-importacao',
  templateUrl: './basico-importacao.component.html',
  styleUrls: ['./basico-importacao.component.css']
})
export class BasicoImportacaoComponent implements OnInit {

  public form: FormGroup;
  public isLoadSave = false;
  @Input() empresa: Empresa;
  public atvEconomica$: Observable<IBaseEntityAux[]>;

  atividades$: Observable<any>;
  atividadesLoading = false;
  atividadesInput$ = new Subject<string>();
  selectedMovie: any;
  minLengthTerm = 3;
  regexStr = ""

  public inscricoesEstaduais: InscricaoEstadual[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: EmpresaService,
    private notifyService: NotifyService,
    private baseEntityAuxService: BaseEntityAuxService
  ) {
    this.form = this.formBuilder.group({
      cpfRepresentanteLegal: [{ value: null, disabled: false }],
      isAprovaregistroDI: [{ value: null, disabled: false }],
      atividadeEconomica: [{ value: null, disabled: false }],
      CNAE: [{ value: null, disabled: false }],
      numeroCadastroMA: [{ value: null, disabled: false }],
      limiteValorFob: [{ value: null, disabled: false }],
      DespachantePadrão: [{ value: null, disabled: false }],
      PrazoDiasCeMercante: [{ value: null, disabled: false }],
      CentroCusto: [{ value: null, disabled: false }],
      isCadastrarItens: [{ value: false, disabled: false }],
      isAtualizarItens: [{ value: false, disabled: false }],
      isCadastrarFornecedores: [{ value: false, disabled: false }],
      isAtualizarFornecedores: [{ value: false, disabled: false }],
      isControlarDemurrage: [{ value: false, disabled: false }],
      isControlarCEMercante: [{ value: false, disabled: false }],
      isControlarCambio: [{ value: false, disabled: false }],
      isSeguradoPela: [{ value: false, disabled: false }],
      numberInscricaoEstadual: [{ value: null, disabled: false }]
    });
  }

  ngOnInit(): void {

    console.log(this.empresa)

    this.loadAtividades();
    this.setValuesForm();

  }

  get formControl() {
    return this.form.controls;
  }

  onEnter() {

    if (this.formControl.numberInscricaoEstadual.value != null
      && this.formControl.numberInscricaoEstadual.value != "") {

      this.inscricoesEstaduais.push(
        {
          idEmpresa: this.empresa.id,
          inscricao: this.formControl.numberInscricaoEstadual.value
        }
      );

      this.formControl.numberInscricaoEstadual.setValue("")
    }

  }

  onRemove(selectObj) {
    this.inscricoesEstaduais = this.inscricoesEstaduais.filter(obj => { return obj !== selectObj });
  }


  loadAtividades() {

    this.atividades$ = concat(
      of([]), // default items
      this.atividadesInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.atividadesLoading = true),
        switchMap(term => {
          return this.baseEntityAuxService.getAtvEconomica(term).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.atividadesLoading = false
            })
          )
        })
      )
    );

  }


  onChange(event) {
  }

  onSubmit() {

    this.isLoadSave = true;
    // this.empresa. = this.formControl.cpfRepresentanteLegal.value
    this.empresa.idAtividadeEconomica = this.formControl.atividadeEconomica.value;
    this.empresa.aprovaRegistroDI = this.formControl.isAprovaregistroDI.value
    this.empresa.cnae = this.formControl.CNAE.value
    this.empresa.numeroDeCadastroNoMA = this.formControl.numeroCadastroMA.value
    this.empresa.limiteDeValorFOB = this.formControl.limiteValorFob.value
    this.empresa.despachantePadrao = this.formControl.DespachantePadrão.value
    this.empresa.prazoDiasCEMercanteCritico = this.formControl.PrazoDiasCeMercante.value
    this.empresa.centroDeCusto = this.formControl.CentroCusto.value
    this.empresa.cadastroDeItens = this.formControl.isCadastrarItens.value
    this.empresa.atualizarItens = this.formControl.isAtualizarItens.value
    this.empresa.cadastroDeFornecedoresFabricantes = this.formControl.isCadastrarFornecedores.value
    this.empresa.atualizarFornecedoresFabricantes = this.formControl.isAtualizarFornecedores.value
    this.empresa.controlarDemurrage = this.formControl.isControlarDemurrage.value
    this.empresa.controlarCEMercantes = this.formControl.isControlarCEMercante.value
    this.empresa.controlarCambio = this.formControl.isControlarCambio.value
    this.empresa.segurado = this.formControl.isSeguradoPela.value

    this.empresa.inscricaoEstaduais = this.inscricoesEstaduais

    delete this.empresa['pais'];
    delete this.empresa['associados'];
    delete this.empresa['lazyLoader'];

    this.service.update(this.empresa).subscribe(
      {
        next: (obj) => { 
          this.empresa.inscricaoEstaduais = obj['inscricaoEstaduais']
        },
        error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
          this.isLoadSave = false;
        },
        complete: () => {
          this.notifyService.showNotification('top', 'right', "Empresa atualizada c/ sucesso!", 'success');
          this.isLoadSave = false;
        }
      }
    )
  }

  setValuesForm() {

    //this.formControl.cpfRepresentanteLegal.setValue(this.empresa);

    setTimeout( () => {
      if(this.empresa.idAtividadeEconomica != null) {
        this.atividadesInput$.next(this.empresa.atividadeEconomica.codigo)
        this.formControl.atividadeEconomica.setValue(this.empresa.atividadeEconomica.id)
      } 
    },1000)
 
    this.formControl.CNAE.setValue(this.empresa.cnae);
    this.formControl.numeroCadastroMA.setValue(this.empresa.numeroDeCadastroNoMA);
    this.formControl.limiteValorFob.setValue(this.empresa.limiteDeValorFOB);
    this.formControl.DespachantePadrão.setValue(this.empresa.despachantePadrao);
    this.formControl.PrazoDiasCeMercante.setValue(this.empresa.prazoDiasCEMercanteCritico);
    this.formControl.CentroCusto.setValue(this.empresa.centroDeCusto);

    this.formControl.isCadastrarItens.setValue(this.empresa.cadastroDeItens)
    this.formControl.isAtualizarItens.setValue(this.empresa.atualizarItens)
    this.formControl.isCadastrarFornecedores.setValue(this.empresa.cadastroDeFornecedoresFabricantes)
    this.formControl.isAtualizarFornecedores.setValue(this.empresa.atualizarFornecedoresFabricantes)
    this.formControl.isControlarDemurrage.setValue(this.empresa.controlarDemurrage)
    this.formControl.isControlarCEMercante.setValue(this.empresa.controlarCEMercantes)
    this.formControl.isControlarCambio.setValue(this.empresa.controlarCambio)
    this.formControl.isSeguradoPela.setValue(this.empresa.segurado)

    this.inscricoesEstaduais = this.empresa.inscricaoEstaduais 
  }

}
