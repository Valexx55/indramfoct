import { Component, inject } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../models/perfil.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  private perfilService = inject(PerfilService);
  perfil:Perfil;

  constructor()
  {
    this.perfil = this.perfilService.getPerfil();
  }

}
