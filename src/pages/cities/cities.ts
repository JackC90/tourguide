import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExperiencesPage } from '../experiences/experiences';
import { staticCities } from '../../static-data/data';

/**
 * Generated class for the CitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cities',
  templateUrl: 'cities.html',
})
export class CitiesPage {
  cities: { id: number, name: string, img: string }[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cities = staticCities;
  }

  getImageStyle(url) {
    return {
      background: "linear-gradient( to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url('"+url+"') center center no-repeat"
    }
  }

  viewCityExperiences(city){
    this.navCtrl.push(ExperiencesPage, {
      city: city
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitiesPage');
  }
}
