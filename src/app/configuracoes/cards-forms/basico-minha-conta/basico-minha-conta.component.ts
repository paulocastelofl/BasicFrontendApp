import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { BasicoMinhaContaService } from 'app/configuracoes/services/basico-minha-conta.service'

@Component({
  selector: 'app-basico-minha-conta',
  templateUrl: './basico-minha-conta.component.html',
  styleUrls: ['./basico-minha-conta.component.css']
})
export class BasicoMinhaContaComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public isLoad: boolean = false;
  public isLoadSave: boolean = false;
  public paises: IPais[];
  public usuario = ""
  public telefone = ""
  public cpf = ""
  public idUpdate = 0

  constructor(
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private BasicoMinhaContaService: BasicoMinhaContaService
  ) { }

  ngOnInit(): void {
    this.localStorages()
    this.form = this.formBuilder.group({
      nome: [{ value: this.usuario, disabled: false }, Validators.required],
      dtNascimento: [{ value: '', disabled: false }, Validators.required],
      cpf: [{ value: this.cpf, disabled: false }, Validators.required],
      rg: [{ value: '', disabled: false }, Validators.required],
      telComercial: [{ value: '', disabled: false }, Validators.required],
      telPessoal: [{ value: this.telefone, disabled: false }, Validators.required],
      isDespachante: [{ value: '', disabled: false }, Validators.required]
    });

  }

  async localStorages(){
    var USUARIO = JSON.parse(localStorage.getItem('credencials-ganedencomex'));
    this.idUpdate = USUARIO.id;
    this.usuario = USUARIO.name;
    this.telefone = USUARIO.telefone;
    this.cpf = USUARIO.cpf;
    console.log(USUARIO);
  }

  onSubmit() {
    // console.log(this.form.controls.nome.value+' - '+this.form.controls.cpf.value+' - '+this.form.controls.telefone.value);
    // alert(this.form.controls.cpf.value)
    // if (this.form.valid) {
      this.isLoadSave = true;
      var parms = {
        "id": this.idUpdate,
        "name": this.form.controls.nome.value,
        "cpf": this.form.controls.cpf.value,
        "rg": this.form.controls.rg.value,
        "telefonePessoal": this.form.controls.telPessoal.value,
        "telefone": this.form.controls.telComercial.value,
        "dtNascimento": this.form.controls.dtNascimento.value
      }

        this.BasicoMinhaContaService.update(parms).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.idUpdate = 0;
              this.notifyService.showNotification('top', 'right', "Matriz de tributação atualizado c/ sucesso!", 'success');
              this.isLoadSave = false;
              alert("Atualizado com Sucesso!")
            }
          }
        )
    // }
  }

}
