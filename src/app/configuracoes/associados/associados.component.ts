import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { PaisService } from 'app/core/services/pais.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { EmpresaService } from '../services/empresa.service';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-associados',
  templateUrl: './associados.component.html',
  styleUrls: ['./associados.component.css']
})
export class AssociadosComponent implements OnInit {

  public modalRef?: BsModalRef;
  public dataTable: DataTable;

  public dtOptions: any = {}
  public table;
  public isLoad: boolean = false;
  public isLoadSave: boolean = false;
  public subscription: Subscription;
  public form: FormGroup;
  public submitted = false;
  public paises: IPais[];
  

  constructor(
    private modalService: BsModalService,
    private service: EmpresaService,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private paisService: PaisService,
    private router:  Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: [{ value: null, disabled: false }, Validators.required],
      razao_social: [{ value: null, disabled: false }, Validators.required],
      logradouro: [{ value: null, disabled: false }, Validators.required],
      numero: [{ value: null, disabled: false }, Validators.required],
      complemento: [{ value: null, disabled: false }],
      bairro: [{ value: null, disabled: false }, Validators.required],
      cep: [{ value: null, disabled: false }, Validators.required],
      cidade: [{ value: null, disabled: false }, Validators.required],
      estado: [{ value: null, disabled: false }, Validators.required],
      pais: [{ value: null, disabled: false }, Validators.required],
      cnpj: [{ value: null, disabled: false }, Validators.required],
      inscricao_municipal: [{ value: null, disabled: false }],
      inscricao_suframa: [{ value: null , disabled: false }],
      despachante: [{ value: null , disabled: false }],
      importador: [{ value: null , disabled: false }],
      exportador: [{ value: null , disabled: false }]
      
    });

    this.route.params.subscribe(
      {
        next: (params) => {
          this.getAllEmpresas(params['id']);
        }
      }
    );
    
    this.dataTable = {
      headerRow: ['ID', 'Nome', 'Endereço','Cnpj', 'Ações'],
      dataRows: []
    };

    this.getAllPaises();
    
  }

  getAllPaises(){
    this.paisService.getAll().subscribe(
      {
        next: (v) => this.paises = v
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get formControl() {
    return this.form.controls;
  }


  loadEvenstDataTable() {
    this.table = $('#datatable').DataTable({
      language:
      {
        "url": "assets/i18n/Portuguese-Brasil.json"
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

  getAllEmpresas(idEmpresa){
    this.isLoad = true;
    this.subscription = this.service.getAllByEmpresa(idEmpresa).subscribe(
      {
        next: (obj) => {

          (Object.keys(obj) as (keyof typeof obj)[]).forEach((key, index) => {
            this.dataTable.dataRows.push(
              [obj[key]['id'].toString(), 
              obj[key]['nomeFantasia'],
              obj[key]['logradouro']+" - "+obj[key]['numero']+", "+obj[key]['bairro']+", "+obj[key]['cidade']+", "+obj[key]['estado'], 
              obj[key]['cnpj'], 
              obj[key]['status']
            ],
             // 
            )
          });

        }, 
        error: (e) => {
          console.log(e)
          this.isLoad = false;
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

  onSaveNewEmpresa() {
    this.submitted = true;
    if (this.form.valid) {

      if(!this.formControl.despachante.value 
        && !this.formControl.importador.value 
        && !this.formControl.exportador.value) {
          this.notifyService.showNotification('top', 'right', "Marque no minímo 01 característica da empresa.", 'danger');
          return;
        }

      this.isLoadSave = true;
      
      const parms = {
        "cnpj": this.formControl.cnpj.value,
        "razaoSocial": this.formControl.razao_social.value,
        "nomeFantasia": this.formControl.nome.value,
        "logradouro": this.formControl.logradouro.value,
        "numero": this.formControl.numero.value,
        "complemento": this.formControl.complemento.value,
        "bairro": this.formControl.bairro.value,
        "cep": this.formControl.cep.value,
        "cidade": this.formControl.cidade.value,
        "estado": this.formControl.estado.value,
        "inscricaoMunicipal": this.formControl.inscricao_municipal.value,
        "inscricaoSuframa": this.formControl.inscricao_suframa.value,
        "idPais": this.formControl.pais.value,
        "despachante": this.formControl.despachante.value,
        "importador": this.formControl.importador.value,
        "exportador": this.formControl.exportador.value
      }

      this.service.create(parms).subscribe(
        {
          next: (obj) => {
            this.dataTable.dataRows.push(
              [obj['id'], obj['nomeFantasia'],  obj['logradouro']+" - "+obj['numero']+", "+obj['bairro']+", "+obj['cidade']+", "+obj['estado'], obj['cnpj']]
            )
          },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
            this.isLoadSave = false;
          },
          complete: () => {
            this.notifyService.showNotification('top', 'right', "Empresa registrada c/ sucesso!", 'success');
            this.modalRef.hide();
            this.isLoadSave = false;
          }
        }
      )
      
    }
  }

  onNavigateEmpresa(id){
    this.router.navigate(["configuracoes/empresa", id]);
  }

  onChange(row, evt){
    let status = "";

    status = evt.currentValue ? 'Ativado' : 'Desativado'
    
    this.service.updateStatus(row[0], evt.currentValue).subscribe(
      {
        next: (obj) => {},
        error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
          this.isLoadSave = false;
        },
        complete: () => {
          this.notifyService.showNotification('top', 'right', `Empresa ${row[1]} \n <b>${status}</b> c/ sucesso!`, 'success');
        }
      }
    )

    
  }

}
