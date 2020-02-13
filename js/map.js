var map;
var marker = [];
var infoWindow = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('maps'), { // #mapに地図を埋め込む
        center: { // 地図の中心を指定
            lat: 34.831362, // 緯度
            lng: 138.154442 // 経度
        },
        zoom: 19 // 地図のズームを指定
    });

    getCSV();

}

//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "./data/museumData.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行

    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    req.onload = function () {
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }

    // alert(result[1][2]); // 300yen

    // マーカー毎の処理
    for (var i = 1; i < result.length - 1; i++) {
        markerLatLng = new google.maps.LatLng({ lat: Number(result[i][6]), lng: Number(result[i][7]) }); // 緯度経度のデータ作成
        marker[i] = new google.maps.Marker({ // マーカーの追加
            position: markerLatLng, // マーカーを立てる位置を指定
            map: map, // マーカーを立てる地図を指定
            icon:{
                url:"./img/icon/audio.png",
                scaledSize : new google.maps.Size(50, 50)
            }
        });

        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: '<div id="map">' + result[i][1] + '</div></br>'+'<audio src="./data/audio/'+result[i][8]+'" controls></br>' // 吹き出しに表示する内容
        });

        infoWindow[i].open(map, marker[i]); // 吹き出しの表示

        // markerEvent(i); // マーカーにクリックイベントを追加
    }

    //    marker[0].setOptions({// TAM 東京のマーカーのオプション設定
    //         icon: {
    //          url: markerData[0]['icon']// マーカーの画像を変更
    //        }
    //    });

    // マーカーにクリックイベントを追加
    function markerEvent(i) {
        marker[i].addListener('click', function () { // マーカーをクリックしたとき
            infoWindow[i].open(map, marker[i]); // 吹き出しの表示
        });
    }
}
