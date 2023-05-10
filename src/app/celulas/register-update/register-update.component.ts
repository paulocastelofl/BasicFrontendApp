import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { MembrosService } from 'app/membros/services/membros.service';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { CelulasService } from '../services/celulas.service';

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

  lider$: Observable<any>;
  liderLoading = false;
  liderInput$ = new Subject<string>();

  colider$: Observable<any>;
  coliderLoading = false;
  coliderInput$ = new Subject<string>();

  minLengthTerm = 3;
  regexStr = "";

  celula: any

  constructor(
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private route: ActivatedRoute,
    private service: EmpresaService,
    private _service: CelulasService,
    private _membroService: MembrosService
  ) {

    this.form = this.formBuilder.group({
      nome: [{ value: null, disabled: false }, Validators.required],

      faixaEtaria: [{ value: null, disabled: false }, Validators.required],
      diaDaSemana: [{ value: "QUI", disabled: false }, Validators.required],

      lider: [{ value: null, disabled: false }, Validators.required],
      colider: [{ value: null, disabled: false }, Validators.required],

      logradouro: [{ value: null, disabled: false }, Validators.required],
      numero: [{ value: null, disabled: false }, Validators.required],
      complemento: [{ value: null, disabled: false }],
      bairro: [{ value: null, disabled: false }, Validators.required],
      cep: [{ value: null, disabled: false }, Validators.required],
      cidade: [{ value: null, disabled: false }, Validators.required],
      estado: [{ value: null, disabled: false }, Validators.required],
      pais: [{ value: null, disabled: false }, Validators.required],

      nomeAnfitriao: [{ value: null, disabled: false }],
      telefoneAnfitriao: [{ value: null, disabled: false }],

    });
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      {
        next: (params) => {
          if (params['id']) {
            this.getCelula(params['id']);
          } else {
            this.loadLider()
            this.loadCoLider()
          }

        }
      }
    );


  }

  getCelula(id) {

    this._service.getById(id).subscribe(
      {
        next: (obj) => {

          this.celula = obj
          this.setValuesUpdate(this.celula)
          if (this.celula.membro) {
            this.loadLider([this.celula.membro])
          } else {
            this.loadLider()
          }

          if (this.celula.coMembro) {
            this.loadCoLider([this.celula.coMembro])
          } else {
            this.loadCoLider()
          }


        }, error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        }
      }
    )
  }

  setValuesUpdate(obj) {

    this.formControl.nome.setValue(obj.nome)
    this.formControl.faixaEtaria.setValue(obj.faixaEtaria)
    this.formControl.diaDaSemana.setValue(obj.diaDaSemana)

    this.formControl.logradouro.setValue(obj.logradouro)
    this.formControl.numero.setValue(obj.numero)
    this.formControl.complemento.setValue(obj.complemento)
    this.formControl.bairro.setValue(obj.bairro)
    this.formControl.cep.setValue(obj.cep)
    this.formControl.cidade.setValue(obj.cidade)
    this.formControl.estado.setValue(obj.estado)
    this.formControl.pais.setValue(obj.pais)
    this.formControl.telefoneAnfitriao.setValue(obj.telefoneAnfitriao)
    this.formControl.nomeAnfitriao.setValue(obj.nomeAnfitriao)
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

  loadLider(itens: any[] = []) {

    this.lider$ = concat(
      of(itens), // default items
      this.liderInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.liderLoading = true),
        switchMap(term => {
          //return of([])
          return this._membroService.GetByFilters(term).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.liderLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.lider.setValue(itens[0].id)
  }

  loadCoLider(itens: any[] = []) {

    this.colider$ = concat(
      of(itens), // default items
      this.coliderInput$.pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.coliderLoading = true),
        switchMap(term => {
          //return of([])
          return this._membroService.GetByFilters(term).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.coliderLoading = false
            })
          )
        })
      )
    );

    if (itens.length > 0) this.formControl.colider.setValue(itens[0].id)
  }

  onSubmit() {

    this.submitted = true;
    if (this.form.valid) {

      this.isLoadSave = true;

      const parms = {
        "nome": this.formControl.nome.value,
        "faixaEtaria": this.formControl.faixaEtaria.value,
        "diaDaSemana": this.formControl.diaDaSemana.value,
        "nomeAnfitriao": this.formControl.nomeAnfitriao.value,
        "telefoneAnfitriao": this.formControl.telefoneAnfitriao.value,
        "logradouro": this.formControl.logradouro.value,
        "numero": this.formControl.numero.value,
        "complemento": this.formControl.complemento.value,
        "bairro": this.formControl.bairro.value,
        "cep": this.formControl.cep.value,
        "cidade": this.formControl.cidade.value,
        "estado": this.formControl.estado.value,
        "pais": this.formControl.pais.value,
        "idMembro": this.formControl.lider.value,
        "idCoMembro": this.formControl.colider.value
      }
      if (this.celula) {

        let p = {
          id: this.celula.id,
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
              this.notifyService.showNotification('top', 'right', "Célula atualizado c/ sucesso!", 'success');
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
              this.notifyService.showNotification('top', 'right', "Célula cadastrada c/ sucesso!", 'success');
              this.isLoadSave = false;
            }
          }
        )
      }
    }
  }

}
