import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { PaisService } from 'app/core/services/pais.service';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, forkJoin, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-basico',
  templateUrl: './basico.component.html',
  styleUrls: ['./basico.component.css']
})
export class BasicoComponent implements OnInit {

  public form: FormGroup;
  public isLoadSave = false;
  public submitted = false;

  importador$: Observable<any>;
  importadorLoading = false;
  importadorInput$ = new Subject<string>();

  despachante$: Observable<any>;
  despachanteLoading = false;
  despachanteInput$ = new Subject<string>();

  despachanteponta$: Observable<any>;
  despachantepontaLoading = false;
  despachantepontaInput$ = new Subject<string>();

  tipodeclaracao$: Observable<any>;
  tipodeclaracaoLoading = false;
  tipodeclaracaoInput$ = new Subject<string>();
  minLengthTermTipoDeclaracao = 2;

  urfChegada$: Observable<any>;
  urfChegadaLoading = false;
  urfChegadaInput$ = new Subject<string>();
  minLengthTermurfChegada = 2;

  urfDespacho$: Observable<any>;
  urfDespachoLoading = false;
  urfDespachoInput$ = new Subject<string>();
  minLengthTermurfDespacho = 2;

  @Input() processo: any;

  modals = [];

  paises: IPais[];

  tipoConsignatario = [
    { id: "ImportacaoPropria", nome: 'Importação Própria' },
    { id: "Importacaoporcontaeordem", nome: 'Importação por conta e ordem' }
  ];

  impModalidadeDespacho = [
    { id: "Normal", nome: 'Normal' },
    { id: "Antecipado", nome: 'Antecipado' },
    { id: "Simplificado", nome: 'Simplificado' },
    { id: "SobreAguas", nome: 'Sobre Águas' },
    { id: "EntregaFracionada", nome: 'Entrega Fracionada' },
    { id: "AntecipadocomEntregaFracionada", nome: 'Antecipado com Entrega Fracionada' }
  ];

  minLengthTerm = 3;
  regexStr = "";


  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private baseEntityAuxService: BaseEntityAuxService,
    private paisService: PaisService
  ) {

    this.form = this.formBuilder.group({
      importador: [{ value: null, disabled: false }, Validators.required],
      despachante_responsavel: [{ value: null, disabled: false }],
      despachante_ponta: [{ value: null, disabled: false, }],
      codigo: [{ value: null, disabled: false, }],
      centroCusto: [{ value: null, disabled: false, }],
      tipo_declaracao: [{ value: null, disabled: false, }],
      pais: [{ value: null, disabled: false, }],
      urfDespacho: [{ value: null, disabled: false, }],
      urfChegada: [{ value: null, disabled: false, }],
      modal: [{ value: null, disabled: false, }],
      necessidadeImportador: [{ value: null, disabled: false, }],
      analistaImportador: [{ value: null, disabled: false, }],
      analistaDespachante: [{ value: null, disabled: false, }],
      tipoConsignatario: [{ value: null, disabled: false, }],
      impModalidadeDespacho: [{ value: null, disabled: false, }]

    });

  }

  ngOnInit(): void {

    if (this.processo) {

      if (this.processo['despachante']['@ref']) {
        this.processo['despachante'] = this.processo['empresa']
      }

      if (this.processo['despachantePonta']['@ref']) {
        this.processo['despachantePonta'] = this.processo['empresa']
      }

      if (this.processo['urfChegada']['@ref']) {
        this.processo['urfChegada'] = this.processo['urfDespacho']
      }
      if (this.processo['urfDespacho']['@ref']) {
        this.processo['urfDespacho'] = this.processo['urfChegada']
      }

      // const observables = [
      //   this.empresaService.GetByFilters(this.processo['parceiro'].nome, true),
      //   this.empresaService.GetByFilters(this.processo['despachante'].nome, false, true),
      //   this.empresaService.GetByFilters(this.processo['despachantePonta'].nome, false, true),
      //   this.baseEntityAuxService.getByQ(this.processo['tipoDeclaracao'].codigo, "TipoDeclaracao"),
      //   this.baseEntityAuxService.getByQ(this.processo['urfChegada'].codigo, "Urf"),
      //   this.baseEntityAuxService.getByQ(this.processo['urfDespacho'].codigo, "Urf")
      //   //tipoDeclaracao
      // ];

      // const calls = forkJoin(observables);

      // calls.subscribe({
      //   next: (responses) => {
      //     this.loadimportador(responses[0]) 
      //     this.loaddespachante(responses[1]) 
      //     this.loaddespachanteponta(responses[2]) 
      //     this.loadTipoDeclaracao(responses[3])
      //     this.loadUrfChegada(responses[4])
      //     this.loadUrfDespacho(responses[5])
      //   }
      // })

      this.processo['parceiro'].nomeFantasia = this.processo['parceiro'].nome
      this.processo['despachante'].nomeFantasia = this.processo['despachante'].nome
      this.processo['despachantePonta'].nomeFantasia = this.processo['despachantePonta'].nome
      this.processo['tipoDeclaracao'].codigo_nome = this.processo['tipoDeclaracao'].codigo + "-" + this.processo['tipoDeclaracao'].nome
      this.processo['urfChegada'].codigo_nome = this.processo['urfChegada'].codigo + "-" + this.processo['urfChegada'].nome
      this.processo['urfDespacho'].codigo_nome = this.processo['urfDespacho'].codigo + "-" + this.processo['urfDespacho'].nome

      this.loadimportador([this.processo['parceiro']])
      this.loaddespachante([this.processo['despachante']])
      this.loaddespachanteponta([this.processo['despachantePonta']])
      this.loadTipoDeclaracao([this.processo['tipoDeclaracao']])
      this.loadUrfChegada([this.processo['urfChegada']])
      this.loadUrfDespacho([this.processo['urfDespacho']])

      this.processo['modal'] ? this.getAllModal(this.processo['modal'].id) : this.getAllModal()
      this.processo['paisProcedencia'] ? this.getAllPaises(this.processo['paisProcedencia'].id) : this.getAllPaises()
      
      this.formControl.codigo.setValue(this.processo['codigo'])
      this.formControl.centroCusto.setValue("")
      this.formControl.tipoConsignatario.setValue(this.processo['tipoConsignatario'])
      this.formControl.impModalidadeDespacho.setValue(this.processo['impModalidadeDespacho'])
      this.formControl.necessidadeImportador.setValue("")
      this.formControl.analistaImportador.setValue("")
      this.formControl.analistaDespachante.setValue("")

    } else {
      this.loadimportador()
      this.loaddespachante()
      this.loaddespachanteponta()
      this.loadTipoDeclaracao()
      this.loadUrfDespacho()
      this.loadUrfChegada()
      this.getAllModal()
      this.getAllPaises()
    }




  }


  get formControl() {
    return this.form.controls;
  }

  onChange(evt) {

  }

  //************************************************************************************************************** */
  loadimportador(itens: any[] = []) {

    this.importador$ = concat(
      of(
        itens
      ), // default items
      this.importadorInput$.pipe(

        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),

        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.importadorLoading = true),
        switchMap(term => {
          return this.empresaService.GetByFilters(term, true).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.importadorLoading = false

            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.importador.setValue(itens[0].id)
  }

  loaddespachante(itens: any[] = []) {

    this.despachante$ = concat(
      of(itens), // default items
      this.despachanteInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.despachanteLoading = true),
        switchMap(term => {
          return this.empresaService.GetByFilters(term, false, true).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.despachanteLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.despachante_responsavel.setValue(itens[0].id)
  }

  loaddespachanteponta(itens: any[] = []) {

    this.despachanteponta$ = concat(
      of(itens), // default items
      this.despachantepontaInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.despachantepontaLoading = true),
        switchMap(term => {
          return this.empresaService.GetByFilters(term, false, true).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.despachantepontaLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.despachante_ponta.setValue(itens[0].id)
  }


  loadTipoDeclaracao(itens: any[] = []) {

    this.tipodeclaracao$ = concat(
      of(itens), // default items
      this.tipodeclaracaoInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTermTipoDeclaracao
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.tipodeclaracaoLoading = true),
        switchMap(term => {
          return this.baseEntityAuxService.getByQ(term, "TipoDeclaracao").pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.tipodeclaracaoLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.tipo_declaracao.setValue(itens[0].id)
  }

  loadUrfChegada(itens: any[] = []) {

    this.urfChegada$ = concat(
      of(itens), // default items
      this.urfChegadaInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTermurfChegada
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.urfChegadaLoading = true),
        switchMap(term => {
          return this.baseEntityAuxService.getByQ(term, "Urf").pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.urfChegadaLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.urfChegada.setValue(itens[0].id)
  }

  loadUrfDespacho(itens: any[] = []) {

    this.urfDespacho$ = concat(
      of(itens), // default items
      this.urfDespachoInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTermurfDespacho
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.urfDespachoLoading = true),
        switchMap(term => {
          return this.baseEntityAuxService.getByQ(term, "Urf").pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.urfDespachoLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.urfDespacho.setValue(itens[0].id)
  }


  getAllModal(id: number = 0) {
    this.baseEntityAuxService.getByAll("Modal").subscribe(
      {
        next: (v) => {
          this.modals = v
          this.formControl.modal.setValue(id)
        }
      }
    )
  }


  getAllPaises(id: number = 0) {
    this.paisService.getAll().subscribe(
      {
        next: (v) => {
          this.paises = v
          if (id > 0) {
            this.formControl.pais.setValue(id)
          }
        }
      }
    )
  }


}
