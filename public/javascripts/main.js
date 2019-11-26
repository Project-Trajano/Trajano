window.onload = () => {
  const ironhackBCN = {
    lat: 41.38623,
    lng: 2.17498
  };

  const markers = [];

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: ironhackBCN
  });

  let center = {
    lat: undefined,
    lng: undefined
  };

  function getPlaces() {
    axios
      .get("http://localhost:3000/locationsData")
      .then(response => {
        placePlaces(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function placePlaces(places) {
    places.forEach(function(place) {
      console.log(place.latitude);
      const center = {
        lat: place.latitude,
        lng: place.longitude
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: place.name
      });
      markers.push(pin);
    });
  }
  getPlaces();
};
