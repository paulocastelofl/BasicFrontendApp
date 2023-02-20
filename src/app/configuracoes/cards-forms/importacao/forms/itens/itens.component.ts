import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEntityAuxService } from 'app/core/services/base-entity-aux.service';
import { FornecedorService } from 'app/core/services/fornecedor.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, concat, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, tap } from 'rxjs';

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

  minLengthTerm = 3;
  regexStr = ""

  constructor( private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private fornecedorService: FornecedorService,
    private baseEntityAuxService: BaseEntityAuxService
    ) { 
      
      this.form = this.formBuilder.group({
        partnumber: [{ value: null, disabled: false }, Validators.required],
        codigo_interno: [{ value: null, disabled: false }, Validators.required],
        unidade_organizacional: [{ value: null, disabled: false, }, Validators.required],
        decricao_detalhada: [{ value: null, disabled: false }, Validators.required],
        decricao_item: [{ value: null, disabled: false }],
        fornecedor: [{ value: null, disabled: false }, Validators.required],

        ncm: [{ value: null, disabled: false }, Validators.required],
        naladi: [{ value: null, disabled: false }, Validators.required],

        aliquota_ii: [{ value: null, disabled: false }],
        aliquota_ipi: [{ value: null, disabled: false }],
        aliquota_pis: [{ value: null, disabled: false }],
        aliquota_cofins: [{ value: null, disabled: false }],

        produto: [{ value: null, disabled: false }],
        tipo: [{ value: null, disabled: false }],
        detalhe: [{ value: null, disabled: false }],
        isTipoEModeloPli: [{ value: false, disabled: false }]


      });

    }

  ngOnInit(): void {
    this.loadFornecedor();
    this.loadNaladi();
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


 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  onSubmit(){

  }

  onChange(evt){
    
  }


}
