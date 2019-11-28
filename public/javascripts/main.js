

window.onload = () => {

  console.log(window.location.href)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // console.log("center: ", center);
      },
      function () {
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    console.log("Browser does not support geolocation.");
  }

  function startMap() {
    const startlocation = {
      lat: 41.3977381,
      lng: 2.190471916
    };
    const markers = [];

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: startlocation
    });

    // const locationStart = new google.maps.Marker({
    //   position: {
    //     lat: startlocation.lat,
    //     lng: startlocation.lng
    //   },
    //   map: map,
    //   title: "Barcelona Campus"
    // });

    function getPlaces() {
      axios
        .get(window.location.href+"/map")
        .then(response => {
          console.log(response.data)
          placePlaces(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }


    function placePlaces(places) {
      places.forEach(function (place) {
        const center = {
          lat: place.locationId.latitude,
          lng: place.locationId.longitude
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const user_location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(user_location);

          const locationStart = new google.maps.Marker({
            position: {
              lat: user_location.lat,
              lng: user_location.lng
            },
            map: map,
            title: "You are here."
          });
        },
        function () {
          console.log("Error in the geolocation service.");
        }
      );
    } else {
      console.log("Browser does not support geolocation.");
    }
  }
  startMap();
};