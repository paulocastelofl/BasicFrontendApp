import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'app/core/services/generics/notify.service';
import { EmpresaService } from '../services/empresa.service';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-igreja',
  templateUrl: './igreja.component.html',
  styleUrls: ['./igreja.component.scss']
})
export class IgrejaComponent implements OnInit {

  public nome_fantasia: string = "NÃO DISPONÍVEL";
  public igreja: Igreja;
  public user: IUser;

  constructor(
    private service: EmpresaService,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {

    this.authservice.getUser().subscribe( user => {
      this.user = user
    })
    
    this.route.params.subscribe(
      {
        next: (params) => {
          this.getIgreja(params['id']);
        }
      }
    );
  }

  
  getIgreja(id) {

    this.igreja = null
    this.nome_fantasia = null

    this.service.getById(id).subscribe(
      {
        next: (v) => {
          this.igreja = v
          this.nome_fantasia = this.igreja['nomeFantasia']
        }, error: (e) => {
          this.notifyService.showNotification('top', 'right', e.error.message, 'danger');
        }
      }
    )
  }

}
