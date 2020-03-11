import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Experience } from './experience.service';
import { City } from '../cities/cities.service';
import { Guide } from '../guide/guide.service';
import leaflet from 'leaflet';

/**
 * Generated class for the ExperiencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experience',
  templateUrl: 'experience.html',
})
export class ExperiencePage {
  @ViewChild('experience-map') mapContainer: ElementRef;
  experience: Experience;
  city: City;
  guide: Guide;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.experience = this.navParams.get('experience');
    this.city = this.navParams.get('city');
    this.guide = this.navParams.get('guide');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencePage');
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("experience-map").setView([this.city.location.latitude, this.city.location.longitude], 8);
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    this.experience.locations.forEach((loc) => {
      leaflet.marker([loc.latitude, loc.longitude])
        .bindPopup(loc.label)
        .addTo(this.map);
    })
  }
}
