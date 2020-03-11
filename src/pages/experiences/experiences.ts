import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { staticExperiences, staticGuides, staticCities } from '../../static-data/data';
import { ExperiencePage } from '../experience/experience';

/**
 * Generated class for the ExperiencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-experiences',
  templateUrl: 'experiences.html',
})
export class ExperiencesPage {
  city: any;
  staticExperiences: any;
  staticGuides: any;
  staticCities: any;

  experiences: any = [];
  guides: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.city = this.navParams.get('city');
    this.staticExperiences = staticExperiences;
    this.staticGuides = staticGuides;
    this.staticCities = staticCities;

    if (this.city) {
      this.experiences = this.staticExperiences.filter(experience => {
        return experience.city_id === this.city.id; 
      });
    } else {
      this.experiences = this.staticExperiences;
    }
  }

  getGuide(experience) {
    let guide = this.staticGuides.filter(guide => {
      return guide.id === experience.guide_id 
    });
    return guide ? guide[0] : null;
  }

  getCity(experience) {
    let city = this.staticCities.filter(city => {
      return city.id === experience.city_id 
    });
    return city ? city[0] : null;
  }

  viewExperience(experience){
    this.navCtrl.push(ExperiencePage, {
      experience: experience,
      city: this.getCity(experience),
      guide: this.getGuide(experience)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExperiencesPage');
  }

}
