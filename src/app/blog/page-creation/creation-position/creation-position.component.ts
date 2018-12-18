import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-creation-position',
  templateUrl: './creation-position.component.html',
  styleUrls: ['./creation-position.component.scss']
})
export class CreationPositionComponent implements OnInit {

  ville: string = '';
  pays: string = '';

  chargement: boolean = false;
  creationOk: boolean = false;
  creationProbleme: boolean = false;
  error: string = '';
  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
  }
  onSubmitRessource() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let user = {
          idUtil: sessionStorage.getItem('user'),
          position: pos.coords.latitude + "," + pos.coords.longitude,
          pays: this.pays,
          ville: this.ville
        };
        this.razBool();
        this.chargement = true;
        this.service.majPosition(user).subscribe(
        (data: any) => {
          this.chargement = false;
          this.ville = '';
          this.pays = '';
          this.creationOk = true;
        },
        error => {
          this.chargement = false;
          this.creationProbleme = true;
          console.log(error.error);
          this.error = error.error;
        });
      });
    } else {
      // Pas de support, proposer une alternative ?
    }    
    
  }
  razBool() {
    this.chargement = false;
    this.creationOk = false;
    this.creationProbleme = false;
  }

}
