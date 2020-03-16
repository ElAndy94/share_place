import axios from 'axios';
import { api as GOOGLE_API_KEY } from './config/api';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  await axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location!');
      }
      const cordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: cordinates,
        zoom: 12
      });

      new google.maps.Marker({ position: cordinates, map: map });
      console.log(cordinates);
    })
    .catch(err => {
      alert(err.messsage);
      console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
