import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { PaisService } from 'app/core/services/pais.service';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';

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
      tipo_declaracao: [{ value: null, disabled: false, }],
      pais: [{ value: null, disabled: false, }],
      urfDespacho: [{ value: null, disabled: false, }],
      urfChegada: [{ value: null, disabled: false, }],
      modal: [{ value: null, disabled: false, }],
      analistaImportador: [{ value: null, disabled: false, }],
      analistaDespachante: [{ value: null, disabled: false, }],
      tipoConsignatario: [{ value: null, disabled: false, }],
      impModalidadeDespacho: [{ value: null, disabled: false, }]

    });

  }

  ngOnInit(): void {



    if (this.processo) {

      this.empresaService.GetByFilters(this.processo['parceiro'].nome, true).subscribe(
        {
          next: (obj) => {
            this.loadimportador(obj)
          }
        }
      )

    } else {
      this.loadimportador()
    }


    this.loaddespachante()
    this.loaddespachanteponta()
    this.loadTipoDeclaracao()
    this.loadUrfDespacho()
    this.loadUrfChegada()
    this.getAllModal()
    this.getAllPaises()
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

    if(itens.length > 0) this.formControl.importador.setValue(itens[0].id)
  }

  loaddespachante() {

    this.despachante$ = concat(
      of([]), // default items
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
  }

  loaddespachanteponta() {

    this.despachanteponta$ = concat(
      of([]), // default items
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
  }


  loadTipoDeclaracao() {

    this.tipodeclaracao$ = concat(
      of([]), // default items
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
  }

  loadUrfChegada() {

    this.urfChegada$ = concat(
      of([]), // default items
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
  }

  loadUrfDespacho() {

    this.urfDespacho$ = concat(
      of([]), // default items
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
  }


  getAllModal() {
    this.baseEntityAuxService.getByAll("Modal").subscribe(
      {
        next: (v) => {
          this.modals = v
        }
      }
    )
  }


  getAllPaises() {
    this.paisService.getAll().subscribe(
      {
        next: (v) => this.paises = v
      }
    )
  }


}
