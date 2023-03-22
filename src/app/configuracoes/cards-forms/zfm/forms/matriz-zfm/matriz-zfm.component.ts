import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-matriz-zfm',
  templateUrl: './matriz-zfm.component.html',
  styleUrls: ['./matriz-zfm.component.css']
})
export class MatrizZfmComponent implements OnInit {

  public modalRef?: BsModalRef;
  isLoad: boolean = false;
  public form: FormGroup;
  public titleModal = "Novo";

  @Input() empresa: Empresa;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>, type?: string, row?) {

    //this.form.reset();

    if (type == "update") {
      this.titleModal = "Atualizar";
      //this.setValueModalUpdate(row);

    } else { this.titleModal = "Nova" }

    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }),);
  }

}
