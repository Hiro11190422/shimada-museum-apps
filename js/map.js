var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('maps'), { // #mapに地図を埋め込む
        center: { // 地図の中心を指定
            lat: 34.831362, // 緯度
            lng: 138.154442 // 経度
        },
        zoom: 19 // 地図のズームを指定
    });
}