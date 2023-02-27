import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'app/configuracoes/services/item.service';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { FornecedorService } from 'app/core/services/fornecedor.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  public modalRef?: BsModalRef;
  public form: FormGroup;
  public isLoadSave = false;
  @Input() empresa: Empresa;
  public submitted = false;

  fornecedor$: Observable<any>;
  fornecedorLoading = false;
  fornecedorInput$ = new Subject<string>();

  ncm$: Observable<any>;
  ncmLoading = false;
  ncmInput$ = new Subject<string>();

  naladi$: Observable<any>;
  naladiLoading = false;
  naladiInput$ = new Subject<string>();

  produto$: Observable<any>;
  produtoLoading = false;
  produtoInput$ = new Subject<string>();

  @ViewChild('file')
  inputFile: ElementRef;
  isLoadFile: boolean = false;

  isLoad: boolean = false;
  itemsV;

  minLengthTerm = 3;
  regexStr = ""

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private fornecedorService: FornecedorService,
    private baseEntityAuxService: BaseEntityAuxService,
    private service: ItemService
  ) {

    this.form = this.formBuilder.group({
      partnumber: [{ value: null, disabled: false }, Validators.required],
      codigo_interno: [{ value: null, disabled: false }],
      unidade_organizacional: [{ value: null, disabled: false, }],
      decricao_detalhada: [{ value: null, disabled: false }, Validators.required],
      decricao_item: [{ value: null, disabled: false }],
      fornecedor: [{ value: null, disabled: false }, Validators.required],

      ncm: [{ value: null, disabled: false }, Validators.required],
      naladi: [{ value: null, disabled: false }],

      aliquota_ii: [{ value: 0, disabled: false }],
      aliquota_ipi: [{ value: 0, disabled: false }],
      aliquota_pis: [{ value: 0, disabled: false }],
      aliquota_cofins: [{ value: 0, disabled: false }],

      produto: [{ value: null, disabled: false }],
      tipo: [{ value: null, disabled: false }],
      detalhe: [{ value: null, disabled: false }],
      isTipoEModeloPli: [{ value: false, disabled: false }]

    });

  }

  ngOnInit(): void {
    this.loadFornecedor();
    this.loadNaladi();
    this.loadNcm();

   
    this.getAllItems();
  }


  get formControl() {
    return this.form.controls;
  }


  loadFornecedor() {

    this.fornecedor$ = concat(
      of([]), // default items
      this.fornecedorInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.fornecedorLoading = true),
        switchMap(term => {
          return this.fornecedorService.getFornecedorByQ(term).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.fornecedorLoading = false
            })
          )
        })
      )
    );

  }



  loadNaladi() {

    this.naladi$ = concat(
      of([]), // default items
      this.naladiInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.naladiLoading = true),
        switchMap(term => {
          return this.baseEntityAuxService.getByQ(term, "Naladi").pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.naladiLoading = false
            })
          )
        })
      )
    );

  }

  loadNcm() {

    this.ncm$ = concat(
      of([]), // default items
      this.ncmInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.ncmLoading = true),
        switchMap(term => {
          return this.baseEntityAuxService.getByQ(term, "Ncm").pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.ncmLoading = false
            })
          )
        })
      )
    );

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  onSubmit() {

    this.submitted = true;

    if (this.form.valid) {
      this.isLoadSave = true;

      const parms = {
        "descricao": this.form.controls.decricao_detalhada.value,
        "partNumber": this.form.controls.partnumber.value,
        "codigoInterno": this.form.controls.codigo_interno.value,
        "unidadeOrganizacional": this.form.controls.unidade_organizacional.value,
        "descricaoItemNfe": this.form.controls.decricao_item.value,
        "idFornecedor": this.form.controls.fornecedor.value,
        "ncm": this.form.controls.ncm.value,
        "naladi": this.form.controls.naladi.value,
        // "unidade": "string",
        // "detalheNcm": "string",
        // "produtoSuframa": "string",
        "aliquotaIi": this.formControl.aliquota_ii.value,
        "aliquotaIpi": this.formControl.aliquota_ipi.value,
        "aliquotaPis": this.formControl.aliquota_pis.value,
        "aliquotaCofins": this.formControl.aliquota_cofins.value
      }


      this.service.create(parms).subscribe(
        {
          next: (obj) => {

          },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
            this.isLoadSave = false;
          },
          complete: () => {
            this.modalRef.hide();
            this.notifyService.showNotification('top', 'right', "Item registrado c/ sucesso!", 'success');
            this.isLoadSave = false;
            this.form.reset();
          }
        }
      )
    } else {
      console.log("Não é valido")
    }
  }

  onChange(evt) {
    console.log(evt)
    if (evt == undefined) {
      this.formControl.aliquota_ii.setValue(0);
      this.formControl.aliquota_ipi.setValue(0);
      this.formControl.aliquota_pis.setValue(0);
      this.formControl.aliquota_cofins.setValue(0);

      return;
    }
    this.formControl.aliquota_ii.setValue(evt.vlIi);
    this.formControl.aliquota_ipi.setValue(evt.vlIpi);
    this.formControl.aliquota_pis.setValue(evt.vlPis);
    this.formControl.aliquota_cofins.setValue(evt.vlCofins);
  }

  onFileChange(e) {

    this.isLoadFile= true;

    this.service.uploadFileItens(e.target.files[0]).subscribe(
      {
        next: (ob) => {

        },
        error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
          this.inputFile.nativeElement.value = "";
          this.isLoadFile= false;
        },
        complete: () => {
          this.inputFile.nativeElement.value = "";
          this.notifyService.showNotification('top', 'right', "Item registrado c/ sucesso!", 'success');
          this.isLoadFile= false;
        }
      }
    )
  }

  getAllItems(){

    this.isLoad = true;

    this.service.getAll().subscribe({
      next: (value) => {

        this.itemsV = value

      },error: (e) => {
        this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        this.isLoad = false;
      },
      complete: () => {
        this.isLoad = false;
      }
    })
  }


}
