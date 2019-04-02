$(document).ready(
    //tutaj jest kawałek kodu w którym przypisane są zmienne z adrsami do udostęnionych danych
    function(){
    var daneOSM=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    var daneOrto=L.tileLayer.wms("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer",{layer:"Raster", format:"image/png", transparent:'true',version:'1.1.1'});
// tutaj jest obiekt: przypisanie do zmiennej obiektu leaflet i wywołanie metody .map która tworzy mapę o wybranych parametrach
var mojaMapa=L.map('mymap',{center:[52.2,21.0],zoom:10});
// wywołanie mapy i wprowadzenie danych OSM
mojaMapa.addLayer(daneOSM);
        // obsługa różnych źródeł danych
var baseMaps = {
"OpenStreetMaps": daneOSM,
    "Ortofotomapa": daneOrto
};
    // guzik do zmiany źródła danych
        L.control.layers(baseMaps).addTo(mojaMapa);
    //skala
        L.control.scale({imperial:false}).addTo(mojaMapa);
        
    // dodanie lokalizacji i obsługa lokalizacji
        
        mojaMapa.locate({setView: true, maxZoom: 10});
        
    // lokalizacja - funkcja która wyświetla ikonę okręgu w miejscu gdzie się znajdujemy (współrzędne są przesyłane za pomocą zmiennej event)
        
        function zlokalizowano(event){
            var radius = event.accuracy/2;
            L.marker(event.latlng).addTo(mojaMapa);
            L.circle(event.latlng,radius).addTo(mojaMapa);
            
        };
        mojaMapa.on('locationfound', zlokalizowano);
    }

);