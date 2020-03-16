import axios from 'axios';
import { api as GOOGLE_API_KEY } from './config/api';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

async function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
  };

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
      console.log(cordinates);
    })
    .catch(err => {
      alert(err.messsage);
      console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
