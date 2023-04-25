import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'app/configuracoes/services/empresa.service';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { PaisService } from 'app/core/services/pais.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private service: EmpresaService,
    private notifyService: NotifyService,
    private paisService: PaisService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [{ value: '', disabled: false }, Validators.required],
      dtNascimento: [{ value: '', disabled: false }, Validators.required],
      cpf: [{ value: '', disabled: false }, Validators.required],
      rg: [{ value: '', disabled: false }, Validators.required],
      telComercial: [{ value: '', disabled: false }, Validators.required],
      telPessoal: [{ value: '', disabled: false }, Validators.required],
      isDespachante: [{ value: '', disabled: false }, Validators.required]
    });
  }

}
