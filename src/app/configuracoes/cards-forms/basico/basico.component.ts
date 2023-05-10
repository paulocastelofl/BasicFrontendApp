import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { AuthService } from 'app/core/services/auth.service';
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

  public user: IUser;

  @Input() igreja: Igreja;

  constructor(
    private formBuilder: FormBuilder,
    private service: EmpresaService,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.authservice.getUser().subscribe( user => {
      this.user = user
    })
    
    if (this.igreja) {

      this.form = this.formBuilder.group({
        nome: [{ value: this.igreja['nomeFantasia'], disabled: false }, Validators.required],
        razao_social: [{ value: this.igreja['razaoSocial'], disabled: false }, Validators.required],
        logradouro: [{ value: this.igreja['logradouro'], disabled: false }, Validators.required],
        numero: [{ value: this.igreja['numero'], disabled: false }, Validators.required],
        complemento: [{ value: this.igreja['complemento'], disabled: false }],
        bairro: [{ value: this.igreja['bairro'], disabled: false }, Validators.required],
        cep: [{ value: this.igreja['cep'], disabled: false }, Validators.required],
        cidade: [{ value: this.igreja['cidade'], disabled: false }, Validators.required],
        estado: [{ value: this.igreja['estado'], disabled: false }, Validators.required],
        pais: [{ value: this.igreja['pais'], disabled: false }, Validators.required],
        cnpj: [{ value: this.igreja['cnpj'], disabled: false }, Validators.required]
      });

    } else {

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
        cnpj: [{ value: null, disabled: false }, Validators.required]
      });

    }
  }

  onBlurMethod(event){
    this.service.getCep(event).subscribe(
      {
        next: (obj) =>{
          
          this.formControl.logradouro.setValue(obj.logradouro)
          this.formControl.bairro.setValue(obj.bairro)
          this.formControl.cidade.setValue(obj.localidade)
          this.formControl.estado.setValue(obj.uf)
          this.formControl.pais.setValue("Brasil")
        },
        error: (e) => {
          this.notifyService.showNotification('top', 'right', "CEP não localizado", 'danger');
          this.isLoadSave = false;
        },
      }
    )
   }

  get formControl() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {

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
        "pais": this.formControl.pais.value
      }

      if(this.igreja){
        
        let p = {
          id: this.igreja.id,
          ...parms
        }

        this.service.update(p).subscribe(
          {
            next: (obj) => { 
              this.user.igreja = obj
              if(obj) this.authservice.setUser(
                this.user
              )   
            },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.notifyService.showNotification('top', 'right', "Igreja atualizada c/ sucesso!", 'success');
              this.isLoadSave = false;
            }
          }
        )

      }else {

        this.service.create(parms).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.notifyService.showNotification('top', 'right', "Igreja atualizada c/ sucesso!", 'success');
              this.isLoadSave = false;
            }
          }
        )
      }
    }
  }
}
