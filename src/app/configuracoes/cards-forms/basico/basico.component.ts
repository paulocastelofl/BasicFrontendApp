import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { PaisService } from 'app/core/services/pais.service';

@Component({
  selector: 'app-basico',
  templateUrl: './basico.component.html',
  styleUrls: ['./basico.component.css']
})
export class BasicoComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public isLoad: boolean = false;
  public isLoadSave: boolean = false;
  public paises: IPais[];

  @Input() empresa: Empresa;
  @Output() isCheckImportador = new EventEmitter<{}>();

  constructor(
    private formBuilder: FormBuilder,
    private service: EmpresaService,
    private notifyService: NotifyService,
    private paisService: PaisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nome: [{ value: this.empresa['nomeFantasia'], disabled: false }, Validators.required],
      razao_social: [{ value: this.empresa['razaoSocial'], disabled: false }, Validators.required],
      logradouro: [{ value: this.empresa['logradouro'], disabled: false }, Validators.required],
      numero: [{ value: this.empresa['numero'], disabled: false }, Validators.required],
      complemento: [{ value: this.empresa['complemento'], disabled: false }],
      bairro: [{ value: this.empresa['bairro'], disabled: false }, Validators.required],
      cep: [{ value: this.empresa['cep'], disabled: false }, Validators.required],
      cidade: [{ value: this.empresa['cidade'], disabled: false }, Validators.required],
      estado: [{ value: this.empresa['estado'], disabled: false }, Validators.required],
      pais: [{ value: this.empresa['idPais'], disabled: false }, Validators.required],
      cnpj: [{ value: this.empresa['cnpj'], disabled: false }, Validators.required],
      inscricao_municipal: [{ value: this.empresa['inscricaoMunicipal'], disabled: false }],
      inscricao_suframa: [{ value: this.empresa['inscricaoSuframa'], disabled: false }],
      despachante: [{ value: this.empresa['despachante'], disabled: false }],
      importador: [{ value: this.empresa['importador'], disabled: false }],
      exportador: [{ value: this.empresa['exportador'], disabled: false }]

    });

    this.checksValue()
    this.getAllPaises()

  }

  get formControl() {
    return this.form.controls;
  }

  getAllPaises() {
    this.paisService.getAll().subscribe(
      {
        next: (v) => this.paises = v
      }
    )
  }

  checksValue() {
    this.isCheckImportador.emit({
      despachante: this.formControl.despachante.value,
      importador: this.formControl.importador.value,
      exportador: this.formControl.exportador.value
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {

      if (!this.formControl.despachante.value
        && !this.formControl.importador.value
        && !this.formControl.exportador.value) {
        this.notifyService.showNotification('top', 'right', "Marque no minímo 01 característica da empresa.", 'danger');
        return;
      }

      this.isLoadSave = true;

      const parms = {
        "id": this.empresa['id'],
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

      this.service.update(parms).subscribe(
        {
          next: (obj) => { },
          error: (e) => {
            this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
            this.isLoadSave = false;
          },
          complete: () => {
            this.notifyService.showNotification('top', 'right', "Empresa atualizada c/ sucesso!", 'success');
            this.isLoadSave = false;
          }
        }
      )

    }
  }

}
