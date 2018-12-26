import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bouton',
  templateUrl: './bouton.component.html',
  styleUrls: ['./bouton.component.scss']
})

/**
 * Bouton générique Comprenant un nom, un lien et une class CSS
 */
export class BoutonComponent implements OnInit {
  @Input() name: string;
  @Input() link: string;
  @Input() class: string;

  constructor() {
  }

  ngOnInit() {
  }

}
