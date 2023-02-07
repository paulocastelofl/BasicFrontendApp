import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/configuracoes/services/user.service';
import { Subscription } from 'rxjs';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public dataTable: DataTable;

  public dtOptions: any = {}
  public table;
  public isLoad: boolean = false;
  subscription: Subscription;
  closeResult = '';

  constructor(private service: UserService, ) { }

  ngOnInit(): void {

    this.dataTable = {
      headerRow: ['ID', 'Nome', 'Email', 'Ações'],
      dataRows: []
    };

    this.getAllUser();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadEvenstDataTable() {
    this.table = $('#datatable').DataTable({
      language:
      {
        "url": "assets/i18n/Portuguese-Brasil.json"
      }

    });
  }

  getAllUser() {
    this.isLoad = true;
    this.subscription = this.service.getAll().subscribe(
      {
        next: (v) => {

          this.dataTable.dataRows = [
            [v[0].id.toString(), v[0].name, v[0].email]
          ]

        },
        error: (e) => {
          console.log(e)
        },
        complete: () => {
          // this.isLoad = false;
          setTimeout(() => {
            this.isLoad = false;
            this.loadEvenstDataTable()
          }, 0);
        }

      }
    )
  }

}
