import { Component, OnInit } from '@angular/core';
import { MembrosService } from '../services/membros.service';
import Swal from 'sweetalert2';
import { NotifyService } from 'app/core/services/generics/notify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public isLoad: boolean = false
  public membros = []
  public membrosDynamic = []
  public p = 1;

  constructor(private _service: MembrosService, private notifyService: NotifyService,) { }

  ngOnInit(): void {
    this.getMembros()
  }


  getMembros() {
    this.isLoad = true;

    this._service.getAll().subscribe(
      {
        next: (obj) => {

          this.membros = []
          this.membrosDynamic = []

          obj.forEach(element => {

            element = {
              isSelect: false,
              ...element
            }

            this.membros.push(element)

          });

          this.membrosDynamic = this.membros;
          this.isLoad = false;
        }

      }
    )
  }

  selectRow(item) {
    item.isSelect = !item.isSelect
  }

  sendit(evt) {
    if (evt === "") {
      this.membrosDynamic = this.membros
    } else {
      this.membrosDynamic = this.membros.filter(x => x.nome.toString().toLowerCase().includes(evt.toString().toLowerCase()));
    }
  }

  onDelete() {

    let list = this.membros.filter(x => x.isSelect == true);

   

    if (list.length > 0) {
      Swal.fire({

        title: `Tem certeza?`,
        text: `Você não poderá reverter isso!`,
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        confirmButtonText: 'Sim, Delete!',
        buttonsStyling: false

      }).then((result) => {

        if (result.value) {

          let listIds = []

          list.forEach(element => {
      
            listIds.push(element.id)
      
          });
      
          this._service.delete(listIds).subscribe({
            next: (obj) => {

            },
            error: (e) => {
              this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
            },
            complete: () => {
              this.getMembros();
              Swal.fire(
                {
                  title: 'Deletado!',
                  text: 'Membro(s) excluído.',
                  icon: 'success',
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                  buttonsStyling: false
                }
              )
            }
          })

        }
      })
    }


  }

}
