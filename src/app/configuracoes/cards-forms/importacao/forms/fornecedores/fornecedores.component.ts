import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'app/configuracoes/services/fornecedor.service';
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
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

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

  constructor(
    private service: FornecedorService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService
  ) { }


  openModal(template: TemplateRef<any>, user?: any) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);

  }

  ngOnInit(): void {
    this.dataTable = {
      headerRow: ['ID', 'CNPJ', 'Razão Social', 'Cidade', 'Estado', 'País', 'Ações'],
      dataRows: []
    };

    this.getAllFornecedor();
  }

  loadEvenstDataTable() {
    this.table = $('#datatable').DataTable({
      language:
      {
        "url": "assets/i18n/Portuguese-Brasil.json"
      }
    });
  }

  getAllFornecedor() {
    this.isLoad = true;
    this.subscription = this.service.getAll().subscribe(
      {
        next: (obj) => {

          (Object.keys(obj) as (keyof typeof obj)[]).forEach((key, index) => {
            this.dataTable.dataRows.push(
              [
                obj[key]['id'].toString(),
                obj[key]['cnpj'],
                obj[key]['razaoSocial'],
                obj[key]['cidade'],
                obj[key]['estado'],
                obj[key]['pais']['nome']
              ]
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

}
