import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { User } from '../classes/user';
import { environment } from 'src/environments/environment';

declare var ol: any;


@Component({
  selector: 'app-page-accueil-blog',
  templateUrl: './page-accueil-blog.component.html',
  styleUrls: ['./page-accueil-blog.component.scss'  ]
})

export class PageAccueilBlogComponent implements OnInit {
  
  user: User = new User();
  
  latitude: number = 18.5204;
  longitude: number = 73.8567;
  
  map: any;
  
  iconsLayers: any[] = [];
  
  
  constructor(
    private service: ServicesService,
    ) { }
    
    ngOnInit() {
      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([73.8567, 18.5204]),
          zoom: 8
        })
      });

      this.chargerPos();
    }
    
    /**
     * Charger position utilisateur et MAJ map
     */
    chargerPos() {
      this.service.getUser(environment.util).subscribe((data: User) => {
        this.user = data;
        let pos = this.user.position.split(',');
        
        this.latitude = Number(pos[0]);
        this.longitude = Number(pos[1]);        
        
        let view = this.map.getView();
        view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
        view.setZoom(6);
        
        //create the style
        let iconStyle = new ol.style.Style({
          image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 1,
            scale: 2,
            src: './../../../assets/icons/iconPos.svg'
          }))
        });

        let vectorSource = new ol.source.Vector({
          //create empty vector
        });

        let iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([this.longitude, this.latitude], 'EPSG:4326',   'EPSG:3857')),
          name: 'Null Island'
        });
        vectorSource.addFeature(iconFeature);
        
        let vectorLayer = new ol.layer.Vector({
          source: vectorSource,
          style: iconStyle
        });

        this.map.addLayer(vectorLayer);
        
      });
    }
    
    
  }
