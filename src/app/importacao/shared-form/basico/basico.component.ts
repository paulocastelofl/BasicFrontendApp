import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { AuthService } from 'app/core/services/auth.service';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { PaisService } from 'app/core/services/pais.service';
import { ProcessoImportacaoService } from 'app/importacao/services/processo-importacao.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, forkJoin, Observable, of, Subject, switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-basico',
  templateUrl: './basico.component.html',
  styleUrls: ['./basico.component.scss']
})
export class BasicoComponent implements OnInit {

  file: any;
  public modalRef?: BsModalRef;
  public form: FormGroup;
  public form_doc: FormGroup;
  public isLoadSave = false;
  public isLoadSaveDoc = false;
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

  isUpdateOrCreate: boolean = false;

  @Input() processo: any;

  modals = [];

  public paises: IPais[];
  public user: IUser;

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

  tipoVersaoDoc = [
    { id: "Original", nome: 'Original' },
    { id: "Copia", nome: 'Cópia' },
    { id: "ConfereComOriginal", nome: 'Confere Com Original' }
  ];

  minLengthTerm = 3;
  regexStr = "";

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private baseEntityAuxService: BaseEntityAuxService,
    private paisService: PaisService,
    private modalService: BsModalService,
    private authservice: AuthService,
    private processoImportacaoService: ProcessoImportacaoService,
    private notifyService: NotifyService,
    private router: Router,
  ) {

    this.form = this.formBuilder.group({
      importador: [{ value: null, disabled: false }, Validators.required],
      despachante_responsavel: [{ value: null, disabled: false }],
      despachante_ponta: [{ value: null, disabled: false, }],
      codigo: [{ value: null, disabled: false, }, Validators.required],
      centroCusto: [{ value: null, disabled: false, }],
      tipo_declaracao: [{ value: null, disabled: false, }, Validators.required],
      pais: [{ value: null, disabled: false, }, Validators.required],
      urfDespacho: [{ value: null, disabled: false, }, Validators.required],
      urfChegada: [{ value: null, disabled: false, }, Validators.required],
      modal: [{ value: null, disabled: false, }],
      necessidadeImportador: [{ value: null, disabled: false, }],
      analistaImportador: [{ value: null, disabled: false, }],
      analistaDespachante: [{ value: null, disabled: false, }],
      tipoConsignatario: [{ value: null, disabled: false, }],
      impModalidadeDespacho: [{ value: null, disabled: false, }],
      infoadicionais: [{ value: null, disabled: false, }]
    });

    this.form_doc = this.formBuilder.group({
      documento: [{ value: null, disabled: false }, Validators.required],
      arquivo: [{ value: null, disabled: false }, Validators.required],
      tipo: [{ value: null, disabled: false, }, Validators.required],
      versao: [{ value: null, disabled: false, }, Validators.required],
      numero: [{ value: null, disabled: false, }, Validators.required],
      recebimento: [{ value: null, disabled: false, }, Validators.required]
    });

  }

  ngOnInit(): void {

    this.user = this.authservice.CurrentUser;
    this.user.empresa.nomeFantasia = this.user.empresa.nomeFantasia + " - " + this.user.empresa.cnpj

    if (this.processo) {

      this.isUpdateOrCreate = true;

      this.processo['tipoDeclaracao'].codigo_nome = this.processo['tipoDeclaracao'].codigo + "-" + this.processo['tipoDeclaracao'].nome
      this.processo['urfdeChegada'].codigo_nome = this.processo['urfdeChegada'].codigo + "-" + this.processo['urfdeChegada'].nome
      this.processo['urfdeDespacho'].codigo_nome = this.processo['urfdeDespacho'].codigo + "-" + this.processo['urfdeDespacho'].nome

      this.loadimportador([this.processo['empresa']])
      this.loaddespachante([this.processo['despanchanteEmpresa']])
      this.loaddespachanteponta([this.processo['despachantePontaEmpresa']])

      this.loadTipoDeclaracao([this.processo['tipoDeclaracao']])
      this.loadUrfChegada([this.processo['urfdeChegada']])
      this.loadUrfDespacho([this.processo['urfdeDespacho']])

      this.processo['modal'] ? this.getAllModal(this.processo['modal'].id) : this.getAllModal()
      this.processo['pais'] ? this.getAllPaises(this.processo['pais'].id) : this.getAllPaises()

      this.formControl.codigo.setValue(this.processo['codigo'])
      this.formControl.centroCusto.setValue(this.processo['centroDeCusto'])
      this.formControl.tipoConsignatario.setValue(this.processo['tipoDeConsignatario'])
      this.formControl.impModalidadeDespacho.setValue(this.processo['modalidadeDeDespacho'])
      this.formControl.necessidadeImportador.setValue(this.processo['necessidadeImportador'])
      this.formControl.analistaImportador.setValue("")
      this.formControl.analistaDespachante.setValue("")
      this.formControl.infoadicionais.setValue(this.processo['informacoesAdicionais'])

    } else {

      this.isUpdateOrCreate = false;

      this.loadimportador()
      this.loaddespachante([this.user.empresa])
      this.loaddespachanteponta([this.user.empresa])
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

  get formControlDoc() {
    return this.form_doc.controls;
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  getFile(event) {
    this.file = event.target.files[0];
  }

  removeFile() {
    this.file = undefined;
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.valid) {

      this.isLoadSave = true;

      var date = new Date();

      const parms = {
        "idEmpresa": this.formControl.importador.value,
        "idDespanchante": this.formControl.despachante_responsavel.value,
        "idDespachantePonta": this.formControl.despachante_ponta.value,
        "codigo": this.formControl.codigo.value,
        "centroDeCusto": this.formControl.centroCusto.value,
        "dtCriacao": date.toISOString(),
        "dtModificacao": date.toISOString(),
        "dtUltimoEvento": date.toISOString(),
        "ultimoEvento": "",
        "idTipoDeDeclaracao": this.formControl.tipo_declaracao.value,
        "idPais": this.formControl.pais.value,
        "idModal": this.formControl.modal.value,
        "idUrfdeChegada": this.formControl.urfDespacho.value,
        "idUrfdeDespacho": this.formControl.urfChegada.value,
        "tipoDeConsignatario": this.formControl.tipoConsignatario.value,
        "modalidadeDeDespacho": this.formControl.impModalidadeDespacho.value,
        "necessidadeImportador": this.formControl.necessidadeImportador.value,
        // "idAnalistaImportador": this.formControl.analistaImportador.value,
        // "idAnalistaDespachante": this.formControl.analistaDespachante.value,
        "informacoesAdicionais": this.formControl.infoadicionais.value
      }


      if (this.isUpdateOrCreate) {

        this.processoImportacaoService.update({
          id: this.processo['id'],
          ...parms
        }).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.notifyService.showNotification('top', 'right', "Processo Atualizado c/ sucesso!", 'success');
              this.isLoadSave = false;
              //this.form.reset();
            }
          }
        )

      } else {
        this.processoImportacaoService.create(parms).subscribe(
          {
            next: (obj) => { 
              this.notifyService.showNotification('top', 'right', "Processo criado c/ sucesso!", 'success');
              this.isLoadSave = false;
              this.form.reset();
              this.router.navigate(["importacao", obj.id]);
            },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              
            }
          }
        )
      }
    }
  }

  onSubmitDoc(){

    this.submitted = true;

    if (!this.form.valid) return;

    var date = new Date();

    this.isLoadSaveDoc = true;

    const  params = {
      "documento":  this.form_doc.controls.documento.value,
      "caminhoDocumento":  this.form_doc.controls.arquivo.value,
      "tipo": this.form_doc.controls.tipo.value,
      "versao": this.form_doc.controls.versao.value,
      "numero": this.form_doc.controls.numero.value,
      "recebimento":  this.form_doc.controls.recebimento.value,
      "dtCriacao": date.toISOString(),
      "idProcesso": this.processo['id']
    }

    this.processoImportacaoService.createdoc(params).subscribe(
      {
        next: (obj) => { 
          this.processo['documentoImportacao'].push(obj)
        },
        error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
          this.isLoadSaveDoc = false;
        },
        complete: () => {
          this.notifyService.showNotification('top', 'right', "Documento cadastrado c/ sucesso!", 'success');
          this.isLoadSaveDoc = false;
          this.form_doc.reset();
          
        }
      }
    )

  }

  onDeleteDoc(item){
    Swal.fire({

      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Sim, Delete!',
      buttonsStyling: false

    }).then((result) => {
      if (result.value) {

        this.processoImportacaoService.deleteDoc(item.id).subscribe({
          next: (obj) => {
    
            this.processo.documentoImportacao.forEach((element,index)=>{
              if(element.id == item.id) this.processo.documentoImportacao.splice(index,1);
           });

          },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
            this.isLoadSave = false;
          },
          complete: () => {
            Swal.fire(
              {
                title: 'Deletado!',
                text: 'Seu usuário foi excluído.',
                icon: 'success',
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false
              }
            )
          }
        })

        Swal.fire(
          {
            title: 'Deletado!',
            text: 'Seu usuário foi excluído.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )

      }
    })
  }

}
