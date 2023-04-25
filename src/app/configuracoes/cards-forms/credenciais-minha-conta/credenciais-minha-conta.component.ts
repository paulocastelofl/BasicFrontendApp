import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { PaisService } from 'app/core/services/pais.service';

@Component({
  selector: 'app-credenciais-minha-conta',
  templateUrl: './credenciais-minha-conta.component.html',
  styleUrls: ['./credenciais-minha-conta.component.css']
})
export class CredenciaisMinhaContaComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public isLoad: boolean = false;
  public isLoadSave: boolean = false;
  public paises: IPais[];

  constructor(
    private formBuilder: FormBuilder,
    private service: EmpresaService,
    private notifyService: NotifyService,
    private paisService: PaisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [{ value: '', disabled: false }, Validators.required],
      confEmail: [{ value: '', disabled: false }, Validators.required],
      senhaEmail: [{ value: '', disabled: false }, Validators.required],
      confSenhaEmail: [{ value: '', disabled: false }, Validators.required],
      senhaSiscomex: [{ value: '', disabled: false }, Validators.required],
      confSenhaSiscomex: [{ value: '', disabled: false }, Validators.required],
      senhaSuframa: [{ value: '', disabled: false }, Validators.required],
      confSenhaSuframa: [{ value: '', disabled: false }, Validators.required]
    });
  }

}
