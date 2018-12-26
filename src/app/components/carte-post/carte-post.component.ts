import { Component, OnInit, Input } from '@angular/core';
import { Actualite } from 'src/app/blog/classes/actualite';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-carte-post',
  templateUrl: './carte-post.component.html',
  styleUrls: ['./carte-post.component.scss']
})
export class CartePostComponent implements OnInit {
  @Input() post: Actualite;
  
  constructor(
    private service: ServicesService,
  ) { }

  ngOnInit() {
  }

}
