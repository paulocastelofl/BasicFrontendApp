import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { MembrosService } from '../services/membros.service';

@Component({
  selector: 'app-register-update',
  templateUrl: './register-update.component.html',
  styleUrls: ['./register-update.component.css']
})
export class RegisterUpdateComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public isLoad: boolean = false;
  public isLoadSave: boolean = false;

  discipulador$: Observable<any>;
  discipuladorLoading = false;
  discipuladorInput$ = new Subject<string>();

  public membro: any;

  minLengthTerm = 3;
  regexStr = "";

  constructor(
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private service: EmpresaService,
    private _service: MembrosService,
  ) {
    this.form = this.formBuilder.group({
      nome: [{ value: null, disabled: false }, Validators.required],
      dtconversao: [{ value: null, disabled: false }],
      dtnasc: [{ value: null, disabled: false }],
      sexo: [{ value: null, disabled: false }, Validators.required],
      discipulador: [{ value: null, disabled: false }],
      logradouro: [{ value: null, disabled: false }, Validators.required],
      numero: [{ value: null, disabled: false }, Validators.required],
      complemento: [{ value: null, disabled: false }],
      bairro: [{ value: null, disabled: false }, Validators.required],
      cep: [{ value: null, disabled: false }, Validators.required],
      cidade: [{ value: null, disabled: false }, Validators.required],
      estado: [{ value: null, disabled: false }, Validators.required],
      pais: [{ value: null, disabled: false }, Validators.required],

      telefone: [{ value: null, disabled: false }],
      email: [{ value: null, disabled: false }]
    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      {
        next: (params) => {
          if (params['id']) {
            this.getMembro(params['id']);
          } else {
            this.loadDiscipulador()
          }
           
        }
      }
    );

  }

  getMembro(id) {

    this._service.getById(id).subscribe(
      {
        next: (obj) => {

          this.membro = obj
          this.setValuesUpdate(this.membro)
          if(this.membro.membroV){
            this.loadDiscipulador([this.membro.membroV])
          }else {
            this.loadDiscipulador()
          }   


        }, error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        }
      }
    )
  }

  setValuesUpdate(obj) {

    this.formControl.nome.setValue(obj.nome)
    if(obj.dtconversao) this.formControl.dtconversao.setValue(obj.dtconversao.split("T")[0])
    if(obj.dtnascimento) this.formControl.dtnasc.setValue(obj.dtnascimento.split("T")[0])
    this.formControl.sexo.setValue(obj.sexo)
    // this.formControl.discipulador.setValue("")
    this.formControl.logradouro.setValue(obj.logradouro)
    this.formControl.numero.setValue(obj.numero)
    this.formControl.complemento.setValue(obj.complemento)
    this.formControl.bairro.setValue(obj.bairro)
    this.formControl.cep.setValue(obj.cep)
    this.formControl.cidade.setValue(obj.cidade)
    this.formControl.estado.setValue(obj.estado)
    this.formControl.pais.setValue(obj.pais)
    this.formControl.telefone.setValue(obj.telefone)
    this.formControl.email.setValue(obj.email)
  }

  onBlurMethod(event) {

    if (event != "") {

      if (event.length == 9) {
        this.service.getCep(event).subscribe(
          {
            next: (obj) => {

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
      } else {
        this.notifyService.showNotification('top', 'right', "CEP com formato inválido", 'danger');
      }

    }

  }

  get formControl() {
    return this.form.controls;
  }

  loadDiscipulador(itens: any[] = []) {

    this.discipulador$ = concat(
      of(itens), // default items
      this.discipuladorInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.discipuladorLoading = true),
        switchMap(term => {
          //return of([])
          return this._service.GetByFilters(term).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.discipuladorLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.discipulador.setValue(itens[0].id)
  }

  onSubmit() {

    this.submitted = true;
    if (this.form.valid) {

      this.isLoadSave = true;

      const parms = {
        "nome": this.formControl.nome.value,
        "dtnascimento": this.formControl.dtnasc.value,
        "dtconversao": this.formControl.dtconversao.value,
        "sexo": this.formControl.sexo.value,
        "email": this.formControl.email.value,
        "telefone": this.formControl.telefone.value,
        "logradouro": this.formControl.logradouro.value,
        "numero": this.formControl.numero.value,
        "complemento": this.formControl.complemento.value,
        "bairro": this.formControl.bairro.value,
        "cep": this.formControl.cep.value,
        "cidade": this.formControl.cidade.value,
        "estado": this.formControl.estado.value,
        "pais": this.formControl.pais.value,
        "idMembro": this.formControl.discipulador.value
        // "idIgreja": 0,
      }

      if (this.membro) {

        let p = {
          id: this.membro.id,
          ...parms
        }

        this._service.update(p).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.notifyService.showNotification('top', 'right', "Discípulo atualizado c/ sucesso!", 'success');
              this.isLoadSave = false;
            }
          }
        )

      } else {
        this._service.create(parms).subscribe(
          {
            next: (obj) => { },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
              this.isLoadSave = false;
            },
            complete: () => {
              this.form.reset();
              this.submitted = false;
              this.notifyService.showNotification('top', 'right', "Discípulo cadastrado c/ sucesso!", 'success');
              this.isLoadSave = false;
            }
          }
        )
      }


    }
  }


}
