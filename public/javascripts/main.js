window.onload = () => {
  console.log(window.location.href);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      },
      function() {
        console.log("Error in the geolocation service.");
      }
    );
  } else {
    console.log("Browser does not support geolocation.");
  }

  function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }
  function startMap() {
    const startlocation = {
      lat: 40.42417,
      lng: -3.7019972
    };
    const markers = [];

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: startlocation
    });

    let url = "https://trajano-project.herokuapp.com/locationsData";
    let booksData = window.location.href + "/map";

    function getPlaces() {
      if (window.location.href === "https://trajano-project.herokuapp.com/") {
        axios
          .get(url)
          .then(response => {
            console.log(response.data);
            placePlaces(response.data);
          })
          .catch(error => {
            console.log(error);
          });

        function placePlaces(places) {
          places.forEach(function(place) {
            const center = {
              lat: place.latitude,
              lng: place.longitude
            };
            const pin = new google.maps.Marker(
              {
                position: center,
                map: map,
                title: place.name,
                icon: "images/book-icon.png"
              },
              randomFloat(0.1, 1.25) * 1000
            );
            markers.push(pin);
          });
        }
      } else {
        axios
          .get(booksData)
          .then(response => {
            console.log(response.data);
            placePlaces(response.data);
          })
          .catch(error => {
            console.log(error);
          });

        function placePlaces(places) {
          places.forEach(function(place) {
            const center = {
              lat: place.locationId.latitude,
              lng: place.locationId.longitude
            };
            const pin = new google.maps.Marker({
              position: center,
              map: map,
              title: place.name,
            });
            markers.push(pin);
          });
        }
      }
    }

    // function placePlaces(places) {
    //   places.forEach(function (place) {
    //     const center = {
    //       lat: place.locationId.latitude,
    //       lng: place.locationId.longitude
    //     };
    //     const pin = new google.maps.Marker({
    //       position: center,
    //       map: map,
    //       title: place.name
    //     });
    //     markers.push(pin);
    //   });
    // }

    getPlaces();

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     function (position) {
    //       const user_location = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       };

    //       map.setCenter(user_location);

    //       const locationStart = new google.maps.Marker({
    //         position: {
    //           lat: user_location.lat,
    //           lng: user_location.lng
    //         },
    //         map: map,
    //         title: "You are here."
    //       });
    //     },
    //     function () {
    //       console.log("Error in the geolocation service.");
    //     }
    //   );
    // } else {
    //   console.log("Browser does not support geolocation.");
    // }
  }
  startMap();
};
