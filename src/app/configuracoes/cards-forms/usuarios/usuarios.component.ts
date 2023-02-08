import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/configuracoes/services/user.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public dataTable: DataTable;

  public dtOptions: any = {}
  public table;
  public isLoad: boolean = false;
  public subscription: Subscription;
  public closeResult = '';
  public modalRef?: BsModalRef;
  public form: FormGroup;
  public submitted = false;
  public isLoadSave: boolean = false;
  public userIdupdate: number = 0
  @Input() empresa: Empresa;

  constructor(
    private service: UserService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService
  ) {
    this.form = this.formBuilder.group({
      nome: [{ value: null, disabled: false }, Validators.required],
      email: [{ value: null, disabled: false }, Validators.required],
      cpf: [{ value: null, disabled: false, }, Validators.required],
      telefone: [{ value: null, disabled: false }, Validators.required],
    });
  }

  get formControl() {
    return this.form.controls;
  }

  openModal(template: TemplateRef<any>, user?: any) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);

  }

  ngOnInit(): void {

    this.dataTable = {
      headerRow: ['ID', 'Nome', 'Email', 'CPF', 'Telefone', 'Ações'],
      dataRows: []
    };

    this.getAllUser();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadEvenstDataTable() {
    this.table = $('#datatable').DataTable({
      language:
      {
        "url": "assets/i18n/Portuguese-Brasil.json"
      }
    });
  }

  getAllUser() {
    this.isLoad = true;
    this.subscription = this.service.getAllByEmpresa(this.empresa.id).subscribe(
      {
        next: (obj) => {

          (Object.keys(obj) as (keyof typeof obj)[]).forEach((key, index) => {
            this.dataTable.dataRows.push(
              [obj[key]['id'].toString(), obj[key]['name'], obj[key]['email'], obj[key]['cpf'], obj[key]['telefone']]
            )
          });

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
          // this.isLoad = false;
          setTimeout(() => {
            this.isLoad = false;
            this.loadEvenstDataTable()
          }, 0);
        }

      }
    )
  }

  onSaveNewUser() {

    this.submitted = true;
    if (this.form.valid) {

      this.isLoadSave = true;

      const parms = {
        "name": this.form.controls.nome.value,
        "email": this.form.controls.email.value,
        "cpf": this.form.controls.cpf.value,
        "telefone": this.form.controls.telefone.value,
        "idEmpresa": this.empresa.id,
        "password": "admin"
      }

      this.service.create(parms).subscribe(
        {
          next: (obj) => {

            this.dataTable.dataRows.push(
              [obj['id'], obj['name'], obj['email']]
            )

          },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
            this.isLoadSave = false;
          },
          complete: () => {
            this.modalRef.hide();
            this.notifyService.showNotification('top', 'right', "Usuário registrado c/ sucesso!", 'success');
            this.isLoadSave = false;
          }
        }
      )

    }
  }

  onDelete(user) {
    console.log(user[0])
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

        this.service.delete(user[0]).subscribe({
          next: (obj) => {

            var index = this.dataTable.dataRows.indexOf(user);
            if (index !== -1) {
              this.dataTable.dataRows.splice(index, 1);
            }

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

      }
    })
  }

}
