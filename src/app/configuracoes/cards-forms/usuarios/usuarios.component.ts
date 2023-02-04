import { Component, OnInit } from '@angular/core';

declare var $:any;

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

  constructor() { }

  ngOnInit(): void {
    this.dataTable = {
      headerRow: [ 'ID', 'Nome', 'Email', 'Ações'],
      dataRows: [
          ['1', 'Andrew Mike', 'Develop', ''],
      ]
   };
  }

  ngAfterViewInit(){
    $('#datatable').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    var table = $('#datatable').DataTable();

    // Edit record
    table.on('click', '.edit', function() {
      let $tr = $(this).closest('tr');

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    });

    // Delete a record
    table.on('click', '.remove', function(e) {
      let $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function() {
      alert('You clicked on Like button');
    });
  }

}
