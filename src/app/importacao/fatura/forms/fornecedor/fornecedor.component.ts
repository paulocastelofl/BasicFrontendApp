import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'app/core/services/fornecedor.service';
import { Observable, Subject, catchError, concat, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  @Input() form_fornecedor: FormGroup;
  @Input() submitted_fornecedor: boolean;

  fornecedor$: Observable<any>;
  fornecedorLoading = false;
  fornecedorInput$ = new Subject<string>();
  minLengthTerm = 3;
  regexStr = "";


  constructor( 
    private fornecedorService: FornecedorService
    ) { 
    
  }

  ngOnInit(): void {
    this.loadfornecedor()
  }

  get formControl() {
    return this.form_fornecedor.controls;
  }

  changeEvetFornecedor(evt){
    console.log(evt)
    this.formControl.logradouro.setValue(evt.logradouro)
    this.formControl.numero.setValue(evt.numero)
    this.formControl.complemento.setValue(evt.complemento)
    this.formControl.bairro.setValue(evt.bairro)
    this.formControl.cep.setValue(evt.cep)
    this.formControl.estado.setValue(evt.estado)
    this.formControl.cidade.setValue(evt.cidade)
    this.formControl.pais.setValue(evt.pais['nome'])
    this.formControl.tipodevinculo.setValue(evt.tipoDeVinculo)
    this.formControl.codigointerno.setValue(evt.codigoInterno)
  }


  loadfornecedor(itens: any[] = []) {

    this.fornecedor$ = concat(
      of(
        itens
      ), // default items
      this.fornecedorInput$.pipe(

        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),

        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.fornecedorLoading = true),
        switchMap(term => {

          return this.fornecedorService.getFornecedorByQ(term).pipe(
            catchError(() => of([])), // empty list on error
            tap((v) => {
              this.regexStr = term;
              this.fornecedorLoading = false

            })
          )
        })
      )
    );

  }

}
