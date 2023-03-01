import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgenteService } from 'app/configuracoes/services/agente.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { PaisService } from 'app/core/services/pais.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent implements OnInit {

  public modalRef?: BsModalRef;
  public form: FormGroup;
  public isLoadSave = false;
  @Input() empresa: Empresa;
  public submitted = false;
  isLoad: boolean = false;
  public titleModal = "Novo";
  public paises: IPais[];
  public agentesList: IAgente[] = [];
  public listAgenteListDynamic: IAgente[] = [];
  idUpdate: number = 0;

  public p = 1;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private paisService: PaisService,
    private service: AgenteService
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

  ngOnInit(): void {
    this.getAllPaises();
    this.getAllAgentes();
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

  getAllPaises() {
    this.paisService.getAll().subscribe(
      {
        next: (v) => this.paises = v
      }
    )
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.isLoadSave = true;

      var parms = {
        "id": this.idUpdate,
        "razaoSocial": this.form.controls.nome.value,
        "nomeFantasia": this.form.controls.nome.value,
        "logradouro": this.form.controls.logradouro.value,
        "numero": this.form.controls.numero.value,
        "complemento": this.form.controls.complemento.value,
        "bairro": this.form.controls.bairro.value,
        "cep": this.form.controls.cep.value,
        "cidade": this.form.controls.cidade.value,
        "estado": this.form.controls.estado.value,
        "idEmpresa": this.empresa.id,
        "idPais": this.form.controls.pais.value,
        "nif": this.form.controls.nif.value,
        "codigoInterno": this.form.controls.codigointerno.value,
      }


      if (this.titleModal == "Atualizar") {

        this.service.update(parms).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.getAllAgentes();
              this.modalRef.hide();
              this.idUpdate = 0;
              this.notifyService.showNotification('top', 'right', "Agente atualizado c/ sucesso!", 'success');
              this.isLoadSave = false;
              this.form.reset();
            }
          }
        )

      } else {
        this.service.create(parms).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.getAllAgentes();
              this.modalRef.hide();
              this.notifyService.showNotification('top', 'right', "Agente registrado c/ sucesso!", 'success');
              this.isLoadSave = false;
              this.form.reset();
            }
          }
        )
      }
    }
  }

  setValueModalUpdate(row: IAgente) {

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


  getAllAgentes() {

    this.isLoad = true;

    this.service.getAll(this.empresa.id).subscribe({
      next: (value) => {
        this.agentesList = value;
        this.listAgenteListDynamic = this.agentesList
      }, error: (e) => {
        this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        this.isLoad = false;
      },
      complete: () => {
        this.isLoad = false;
      }
    })
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
            this.getAllAgentes();
            Swal.fire(
              {
                title: 'Deletado!',
                text: 'Seu Agente foi excluído.',
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

  keyup(evt){
    if (evt === "") {
      this.listAgenteListDynamic = this.agentesList
    } else {
      this.listAgenteListDynamic = this.agentesList.filter(x => x.nomeFantasia.toString().toLowerCase().includes(evt.toString().toLowerCase()));
    }
  }



}
