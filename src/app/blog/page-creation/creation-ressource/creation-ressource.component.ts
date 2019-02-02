import { Component, OnInit, ViewChild } from '@angular/core';
import { Ressource } from '../../classes/ressource';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-creation-ressource',
  templateUrl: './creation-ressource.component.html',
  styleUrls: ['./creation-ressource.component.scss']
})
export class CreationRessourceComponent implements OnInit {
  @ViewChild('fileInput2') fileInput2;
  @ViewChild('fileInput') fileInput;

  ressourceCreation: Ressource = new Ressource();
  chargement: boolean = false;
  creationOk: boolean = false;
  creationProbleme: boolean = false;
  error: string = '';
  base64textString: string = '';
  upok: boolean = false;

  ressourcesExistantes: Ressource[] = [];

  constructor(
    private service: ServicesService,
  ) { }

  /**
   * Initialisation des ressources
   */
  ngOnInit() {
    this.service.getRessources().subscribe((data: Ressource[])=> {
      data.forEach(element => {
        this.ressourcesExistantes.push(element);
      });
    });
  }

  /**
   * Creation de ressource
   */
  onSubmitRessource() {
    if (this.ressourceCreation.ressource_eng === undefined || this.ressourceCreation.ressource_eng === '') {
      this.ressourceCreation.ressource_eng = this.ressourceCreation.ressource;
    }
    if (this.base64textString !== '') {
      this.ressourceCreation.image64 = this.base64textString;
    }    
    this.razBool();
    this.chargement = true;
    this.service.creerRessource(this.ressourceCreation).subscribe(
      (data: any) => {
        this.chargement = false;
        this.ressourceCreation = new Ressource();
        this.creationOk = true;
        this.base64textString = '';
        this.upok = false;
      },
      error => {
        this.chargement = false;
        this.creationProbleme = true;
        this.base64textString = '';
        console.log(error.error);
        this.error = error.error;
        this.upok = false;
      }
    );
  }

  /**
   * Modifie une ressource
   * @param res La ressource a modifier
   */
  onModifRessource(res: Ressource){
    this.razBool();
    this.chargement = true;
    if (this.base64textString !== '') {
      res.image64 = this.base64textString;
    }    
    this.service.updateRessource(res).subscribe(
      (data: any) => {
        this.chargement = false;
        this.creationOk = true;
        this.base64textString = '';
        this.upok = false;
      },
      error => {
        this.chargement = false;
        this.creationProbleme = true;
        this.base64textString = '';
        console.log(error.error);
        this.error = error.error;
        this.upok = false;
      }
    );
  }

  upload() {
    
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      let file = fileBrowser.files[0];      
      let reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  upload2() {    
    let fileBrowser = this.fileInput2.nativeElement;
    
    if (fileBrowser.files && fileBrowser.files[0]) {
      let file = fileBrowser.files[0];      
      let reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.upok = true;
   }

  /**
   * Permet d'ouvrir une ressource a la modification
   * @param res la ressource
   */
  toggle(res: any) {
    res.isActive = true;
  }

  /**
   * Remise a zero des indicateurs
   */
  razBool() {
    this.chargement = false;
    this.creationOk = false;
    this.creationProbleme = false;
  }
}
