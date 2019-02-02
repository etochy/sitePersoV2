import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { Actualite } from '../../classes/actualite';

@Component({
  selector: 'app-creation-post',
  templateUrl: './creation-post.component.html',
  styleUrls: ['./creation-post.component.scss']
})
export class CreationPostComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  
  actuCreation: Actualite = new Actualite();
  chargement: boolean = false;
  creationOk: boolean = false;
  creationProbleme: boolean = false;
  error: string = '';
  base64textString: string = '';
  upok: boolean = false;

  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
  }

  /**
   * Creation d'un post d'actualité lors du clic
   */
  onSubmitActu() {
    if (this.actuCreation.title_eng === undefined || this.actuCreation.title_eng === '') {
      this.actuCreation.title_eng = this.actuCreation.title;
    }
    if (this.actuCreation.description_eng === undefined || this.actuCreation.description_eng === '') {
      this.actuCreation.description_eng = this.actuCreation.description;
    }

    this.actuCreation.akArticle = this.actuCreation.title.trim().toLowerCase() + this.actuCreation.date.toString();
    
    this.razBool();
    this.chargement = true;
    this.actuCreation.image64 = this.base64textString;
    this.service.creerPost(this.actuCreation).subscribe(
      (data: any) => {
        this.chargement = false;
        this.actuCreation = new Actualite();
        this.creationOk = true;
        this.base64textString = '';
        this.upok = false;
      },
      error => {
        this.chargement = false;
        this.creationProbleme = true;
        console.log(error.error);
        this.error = error.error;
        this.base64textString = '';
        this.upok = false;
      }
    );
  }

  /**
   * Remise a zero des indicateurs
   */
  razBool() {
    this.chargement = false;
    this.creationOk = false;
    this.creationProbleme = false;
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
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.upok = true;
   }

}
