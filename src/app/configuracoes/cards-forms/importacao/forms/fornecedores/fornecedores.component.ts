import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'app/configuracoes/services/fornecedor.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { PaisService } from 'app/core/services/pais.service';
import Swal from 'sweetalert2';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  // public dataTable: DataTable;
  // public dtOptions: any = {}
  // public table;
  // public isLoad: boolean = false;
  // public subscription: Subscription;
  // public closeResult = '';
  // public modalRef?: BsModalRef;
  // public form: FormGroup;
  // public submitted = false;
  // public isLoadSave: boolean = false;
  // public paises: IPais[];
  // public userIdupdate: number = 0

  public modalRef?: BsModalRef;
  public form: FormGroup;
  public isLoadSave = false;
  @Input() empresa: Empresa;
  public submitted = false;
  isLoad: boolean = false;
  public titleModal = "Novo";
  public paises: IPais[];
  public fornecedorList: IFornecedor[] = [];
  public listFornecedorListDynamic: IFornecedor[] = [];
  idUpdate: number = 0;

  public p = 1;

  constructor(
    private service: FornecedorService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private paisService: PaisService
  ) {

    this.form = this.formBuilder.group({
      nome: [{ value: null, disabled: false }, Validators.required],
      logradouro: [{ value: null, disabled: false }, Validators.required],
      numero: [{ value: null, disabled: false, }],
      complemento: [{ value: null, disabled: false }],
      bairro: [{ value: null, disabled: false }],
      cep: [{ value: null, disabled: false }],
      cidade: [{ value: null, disabled: false }, Validators.required],
      estado: [{ value: null, disabled: false }, Validators.required],
      pais: [{ value: null, disabled: false }, Validators.required],
      nif: [{ value: null, disabled: false }],
      codigointerno: [{ value: null, disabled: false }]
    });
   }


  get formControl() {
    return this.form.controls;
  }

  openModal(template: TemplateRef<any>, type?: string, row?) {

    this.form.reset();

    if (type == "update") {
      this.titleModal = "Atualizar";
      this.setValueModalUpdate(row);

    } else { this.titleModal = "Novo" }

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  ngOnInit(): void {
    // this.dataTable = {
    //   headerRow: ['ID', 'CNPJ', 'Razão', 'Cidade', 'Estado', 'País', 'Ações'],
    //   dataRows: []
    // };

    this.getAllFornecedor();
    this.getAllPaises();
  }

  onDelete(row) {
    Swal.fire({

      title: `Tem certeza?`,
      text: `Você não poderá reverter isso! (${row.nomeFantasia})`,
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

        this.service.delete(row.id).subscribe({
          next: (obj) => {

          },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
            this.isLoadSave = false;
          },
          complete: () => {
            this.getAllFornecedor();
            Swal.fire(
              {
                title: 'Deletado!',
                text: 'Seu Fornecedor foi excluído.',
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
    })

  }

  getAllFornecedor() {

    this.isLoad = true;

    this.service.getAll().subscribe({
      next: (value) => {
        this.fornecedorList = value;
        this.listFornecedorListDynamic = this.fornecedorList
      }, error: (e) => {
        this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        this.isLoad = false;
      },
      complete: () => {
        this.isLoad = false;
      }
    })
  }

  setValueModalUpdate(row: IFornecedor) {

    this.idUpdate = row.id

    this.formControl.nome.setValue(row.nomeFantasia);
    this.formControl.logradouro.setValue(row.logradouro);
    this.formControl.numero.setValue(row.numero);
    this.formControl.complemento.setValue(row.complemento);
    this.formControl.bairro.setValue(row.bairro);
    this.formControl.cep.setValue(row.cep);
    this.formControl.cidade.setValue(row.cidade);
    this.formControl.estado.setValue(row.estado);
    this.formControl.pais.setValue(row.idPais);
    this.formControl.nif.setValue(row.nif);
    this.formControl.codigointerno.setValue(row.codigoInterno);

  }

  getAllPaises() {
    this.paisService.getAll().subscribe(
      {
        next: (v) => this.paises = v
      }
    )
  }

}
