import * as faker from 'faker';
import * as txtgen from 'txtgen';
import * as moment from 'moment';
import { City } from '../pages/cities/cities.service';
import { Guide } from '../pages/guide/guide.service';
import { Experience } from '../pages/experience/experience.service';

// Countries
export const staticCities: City[] = [
  {
    id: 1, 
    name: "Bali", 
    img: "https://images.pexels.com/photos/654/clouds-cloudy-agriculture-farm.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    location: {
      longitude: 115.188919,
      latitude: -8.409518
    }
  },
  {
    id: 2, 
    name: "Bangkok", 
    img: "https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    location: {
      longitude: 100.523186,
      latitude: 13.736717
    }
  },
  {
    id: 3, 
    name: "Manila", 
    img: "https://images.pexels.com/photos/210367/pexels-photo-210367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    location: {
      longitude: 120.984222,
      latitude: 14.599512
    }
  },
  {
    id: 4, 
    name: "Kuala Lumpur", 
    img: "https://images.pexels.com/photos/22804/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    location: {
      longitude: 101.703651,
      latitude: 3.152815
    }
  }
];

const languages = [
  {code: "en", name: "English"},
  {code: "fr", name: "French"},
  {code: "zh", name: "Chinese"},
  {code: "my", name: "Malay"},
  {code: "tg", name: "Tagalog"},
  {code: "th", name: "Thai"},
  {code: "id", name: "Indonesian"},
  {code: "ko", name: "Korean"},
  {code: "ja", name: "Japanese"},
];
let languagesNoEn = languages.splice(1, languages.length - 1);

let guides: Guide[] = [];
for (let i = 1; i < staticCities.length * 5; i++) {
  guides.push({
    id: i,
    avatar: faker.internet.avatar(),
    name: faker.name.findName(),
    tagline: txtgen.sentence(),
    story: txtgen.paragraph(),
    languages: [
      languages[0],
      randomPicker(languagesNoEn)
    ]
  })
};

const experienceNames = [
  "Tour",
  "Street Food Galore",
  "Tour Around Town",
  "Cultural Enrichment",
  "Local Hotspots",
  "Sightseeing",
  "Shopping Highlights",
  "City Adventure",
  "Suburban Escapades",
  "Chill Out Like A Local",
  "Hidden Gems Tour",
  "Guided Excursion"
];
function randomPicker(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function randomInt(min,max)
{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const staticGuides = guides;

let experiences: Experience[] = [];

let experienceId = 1;
staticCities.forEach(city => {
  staticGuides.forEach(guide => {
    let order = guide.id - (5 * (city.id - 1));
    if (order >= 1 && order <= 5) {
      let exp: Experience = { 
        id: experienceId, 
        city_id: city.id,
        name: randomPicker(experienceNames), 
        img: "", 
        guide_id: guide.id, 
        tagline: txtgen.sentence(), 
        description: txtgen.paragraph(),
        essentials: txtgen.sentence(),
        rating: Math.floor(Math.random() * 5) + 3,
        sessions: [],
        currency: "MYR",
        price: (Math.floor(Math.random() * 20) + 8) * 10,
        locations: []
      };

      // Fill sessions
      let prevDayNum = 0;
      for(let i = 0; i < 4; i++) {
        let meridien = randomPicker([" am", " pm"]);
        let timeNum = randomInt(5, 8);
        let start = timeNum + randomPicker([":00", ":30"]) + meridien;
        let end = timeNum + 3 + randomPicker([":00", ":30"]) + meridien;
        let dayNum = randomInt(prevDayNum, 6);
        if (dayNum === prevDayNum && exp.sessions.length > 0) break;
        exp.sessions.push({
          day: moment().day(dayNum).format('ddd'), 
          time_start: start, 
          time_end: end 
        });
        prevDayNum = dayNum;
      };
      experiences.push(exp);

      // Fill locations
      let locationCount = randomInt(1, 3);
      for(let j = 0; j < locationCount; j++) {
        let label = "Start";
        if (j > 0 && j < locationCount) {
           label = `Checkpoint ${j}`;
        } else if (j === locationCount) {
          label = "Finish"; 
        };
        let loc = {
          label: label,
          longitude: city.location.longitude + (Math.random() - 0.5), 
          latitude: city.location.latitude + (Math.random() - 0.5)
        };
        exp.locations.push(loc);
      }; 

      experienceId++;
    } 
  })
});

export const staticExperiences = experiences;