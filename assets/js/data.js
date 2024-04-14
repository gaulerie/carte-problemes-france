fetch("assets/data/data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const data = jsonData.Données;

    pointData.eachLayer(function (layer) {
      layer.on("click", function (e) {
        var markerId = e.target.feature.properties.id;
        var markerData = data[markerId - 1];
        console.log(markerData);
        updateSidebar(markerData);
      });
    });
  });

async function fetchData() {
  let n = await fetch("https://script.google.com/macros/s/AKfycbyBCceivdsdI5utTYqA1gYBEiP78OBkjGs9ZTDNL6G7yGQIWsx1HqGQ6yi8uoa79RA1/exec");
  let resp = await n.json();
  console.log(resp);
}

fetchData();

function updateSidebar(data) {
  $(".surname").text(data["Nom"]);
  $(".name").text(data["Prénom"]);
  $(".age").text(data["Âge"]);
  $(".countryEntranceDate").text(data["Date d'entrée en France"]);
  $(".nationalities").text(data["Nationalités"]);
  $(".ethnicities").text(data["Ethnicités"]);

  $(".actDate").eq(0).text(data["Acte 1 - Date"]);
  $(".actTitle").eq(0).text(data["Acte 1 - Titre"]);
  $(".actDescription").eq(0).text(data["Acte 1 - Description"]);

  $(".actDate").eq(1).text(data["Acte 2 - Date"]);
  $(".actTitle").eq(1).text(data["Acte 2 - Titre"]);
  $(".actDescription").eq(1).text(data["Acte 2 - Description"]);

  $(".actDate").eq(2).text(data["Acte 3 - Date"]);
  $(".actTitle").eq(2).text(data["Acte 3 - Titre"]);
  $(".actDescription").eq(2).text(data["Acte 3 - Description"]);

  $(".street").text(data["Rue"]);
  $(".region").text(data["Région"]);
  $(".city").text(data["Ville"]);
}
