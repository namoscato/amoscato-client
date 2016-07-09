(function() {

    var $photos = $('#photos');
    var $window = $(window);
    
    var _windowHeight = $window.height();
    var _windowWidth = $window.width();

    var _photoWidthMin = 50;
    var _photoWidthMax = 150;
    var _colorMin = 200;
    var _colorMax = 300;
    var _columnHeightMin = 300;
    var _columnHeightMax = 500;

    // $.get(
    //     'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=555508864e8edfb1d4c87c10f92cf741&user_id=91374488%40N07&extras=url_m&format=json&nojsoncallback=1',
    //     fetchPhotosHandler
    // );

    var data = '[{"id":1836,"type":"flickr","source_id":"26155280591","url":"https://farm2.staticflickr.com/1575/26155280591_cd29fe6549.jpg","width":500,"height":334,"title":"Lighthouse Sign","reference_url":"https://www.flickr.com/photos/namoscato/26155280591"},{"id":2042,"type":"lastfm","source_id":"362351fc9d2fc22a758a3e7461f7a4e5","url":"http://img2-ak.lst.fm/i/u/300x300/5d0727cbee32472b909e90aed7fea1c1.png","width":300,"height":300,"title":"Bittersweet by The Accidentals","reference_url":"http://www.last.fm/music/The+Accidentals/Bittersweet"},{"id":1936,"type":"foodspotting","source_id":"5801868","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5801868/thumb_275.jpg?1460823836","width":280,"height":280,"title":"S\u0027mores French Toast at Gepetto Cafe","reference_url":"http://www.foodspotting.com/reviews/5801868"},{"id":1835,"type":"flickr","source_id":"26129139052","url":"https://farm2.staticflickr.com/1675/26129139052_ee7f816092.jpg","width":500,"height":335,"title":"Saugerties Lighthouse","reference_url":"https://www.flickr.com/photos/namoscato/26129139052"},{"id":2041,"type":"lastfm","source_id":"e6f15785033253593c5d93e8437b55fe","url":"http://img2-ak.lst.fm/i/u/300x300/54421aa2d4764a7d8276d56b47f975ac.png","width":300,"height":300,"title":"Daybreak by Sierra Hull","reference_url":"http://www.last.fm/music/Sierra+Hull/Daybreak"},{"id":1935,"type":"foodspotting","source_id":"5781192","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5781192/thumb_275.jpg?1458952357","width":280,"height":280,"title":"Seafood Pasta at Luigis Restaurant \u0026 Bar Inc","reference_url":"http://www.foodspotting.com/reviews/5781192"},{"id":1834,"type":"flickr","source_id":"26155283131","url":"https://farm2.staticflickr.com/1686/26155283131_6f10aa68eb.jpg","width":500,"height":334,"title":"Saugerties Lighthouse","reference_url":"https://www.flickr.com/photos/namoscato/26155283131"},{"id":2040,"type":"lastfm","source_id":"04a6d92a13d927c0ee68de288d945ca8","url":"http://img2-ak.lst.fm/i/u/300x300/d68e035c54f78b3fa456ba2d11c2232c.png","width":300,"height":300,"title":"Weighted Mind by Sierra Hull","reference_url":"http://www.last.fm/music/Sierra+Hull/Weighted+Mind"},{"id":1934,"type":"foodspotting","source_id":"5683436","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5683436/thumb_275.jpg?1450628954","width":280,"height":280,"title":"Spicy Sausage-Stuffed Apple at Pints On Penn","reference_url":"http://www.foodspotting.com/reviews/5683436"},{"id":1833,"type":"flickr","source_id":"26155284131","url":"https://farm2.staticflickr.com/1570/26155284131_07f7f3a31f.jpg","width":334,"height":500,"title":"Grass","reference_url":"https://www.flickr.com/photos/namoscato/26155284131"},{"id":2039,"type":"lastfm","source_id":"35ba7aa427ac84d89723b93c8a7aa03a","url":"http://img2-ak.lst.fm/i/u/300x300/70f62a49998b436a911eaa297b6da21a.png","width":300,"height":300,"title":"Ma Fleur by The Cinematic Orchestra","reference_url":"http://www.last.fm/music/The+Cinematic+Orchestra/Ma+Fleur"},{"id":1933,"type":"foodspotting","source_id":"5482033","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5482033/thumb_275.jpg?1436636285","width":280,"height":280,"title":"Chocolate Frosted Donut at Top Pot Doughnuts","reference_url":"http://www.foodspotting.com/reviews/5482033"},{"id":1832,"type":"flickr","source_id":"26155285271","url":"https://farm2.staticflickr.com/1521/26155285271_9d9941b35b.jpg","width":500,"height":334,"title":"Propeller","reference_url":"https://www.flickr.com/photos/namoscato/26155285271"},{"id":2038,"type":"lastfm","source_id":"b5f8a9ec4deb36b1685bce69df624b6b","url":"http://img2-ak.lst.fm/i/u/300x300/d2220b5934b344bd97d408fa1f9cbc01.png","width":300,"height":300,"title":"Horizon by The Cinematic Orchestra","reference_url":"http://www.last.fm/music/The+Cinematic+Orchestra/Horizon"},{"id":1932,"type":"foodspotting","source_id":"5478272","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5478272/thumb_275.jpg?1436415141","width":280,"height":280,"title":"Shrimp And Pork Dumplings at Din Tai Fung Dumpling House","reference_url":"http://www.foodspotting.com/reviews/5478272"},{"id":1831,"type":"flickr","source_id":"26129143392","url":"https://farm2.staticflickr.com/1616/26129143392_c08b7d4c66.jpg","width":500,"height":334,"title":"Boat","reference_url":"https://www.flickr.com/photos/namoscato/26129143392"},{"id":2037,"type":"lastfm","source_id":"c90f0b8a76c3ff5ca4ab2d8257395f71","url":"http://img2-ak.lst.fm/i/u/300x300/d8268e84c69140a8a36c1c18140401b2.png","width":300,"height":300,"title":"Man With a Movie Camera by The Cinematic Orchestra","reference_url":"http://www.last.fm/music/The+Cinematic+Orchestra/Man+With+a+Movie+Camera"},{"id":1931,"type":"foodspotting","source_id":"5475084","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5475084/thumb_275.jpg?1436210192","width":280,"height":280,"title":"Iced Coffee at Starbucks","reference_url":"http://www.foodspotting.com/reviews/5475084"},{"id":1830,"type":"flickr","source_id":"25618930473","url":"https://farm2.staticflickr.com/1610/25618930473_fa3b71213c.jpg","width":334,"height":500,"title":"Saugerties Lighthouse Fence","reference_url":"https://www.flickr.com/photos/namoscato/25618930473"},{"id":2036,"type":"lastfm","source_id":"64653f6d58e7aa27eb1ede2f1f1554a5","url":"http://img2-ak.lst.fm/i/u/300x300/1ade209b01494cd0869184f617006def.png","width":300,"height":300,"title":"Motion by The Cinematic Orchestra","reference_url":"http://www.last.fm/music/The+Cinematic+Orchestra/Motion"},{"id":1930,"type":"foodspotting","source_id":"5473791","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5473791/thumb_275.jpg?1436135666","width":280,"height":280,"title":"Swedish Pancakes at Issaquah Cafe","reference_url":"http://www.foodspotting.com/reviews/5473791"},{"id":1829,"type":"flickr","source_id":"26155287701","url":"https://farm2.staticflickr.com/1611/26155287701_a2f32d19fd.jpg","width":334,"height":500,"title":"Saugerties Lighthouse Fence","reference_url":"https://www.flickr.com/photos/namoscato/26155287701"},{"id":2035,"type":"lastfm","source_id":"32521ef997443aaefaeec3c61c9e2eaa","url":"http://img2-ak.lst.fm/i/u/300x300/22b6db386f4d586164ebe4b051522687.png","width":300,"height":300,"title":"Kintsugi by Death Cab for Cutie","reference_url":"http://www.last.fm/music/Death+Cab+for+Cutie/Kintsugi"},{"id":1929,"type":"foodspotting","source_id":"5461466","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5461466/thumb_275.jpg?1435433634","width":280,"height":280,"title":"Prosciutto \u0026 Fig Pizza at Matchbox Restaurant","reference_url":"http://www.foodspotting.com/reviews/5461466"},{"id":1828,"type":"flickr","source_id":"25948714240","url":"https://farm2.staticflickr.com/1675/25948714240_f149197f96.jpg","width":334,"height":500,"title":"Hudson River Marker","reference_url":"https://www.flickr.com/photos/namoscato/25948714240"},{"id":2034,"type":"lastfm","source_id":"b879d3d5d8304d20064f6a1a0e46591b","url":"http://img2-ak.lst.fm/i/u/300x300/4cb65a0ed4f84583b19dd36a7fa7e355.png","width":300,"height":300,"title":"Plains by George Winston","reference_url":"http://www.last.fm/music/George+Winston/Plains"},{"id":1928,"type":"foodspotting","source_id":"5386448","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5386448/thumb_275.jpg?1431282824","width":280,"height":280,"title":"Belgium Waffle Sundae at DeLuca\u0027s","reference_url":"http://www.foodspotting.com/reviews/5386448"},{"id":1827,"type":"flickr","source_id":"26221588655","url":"https://farm2.staticflickr.com/1598/26221588655_fea1ddd2fc.jpg","width":335,"height":500,"title":"Bud","reference_url":"https://www.flickr.com/photos/namoscato/26221588655"},{"id":2033,"type":"lastfm","source_id":"085fb86dcad5d6cb79edfd2d9a653848","url":"","width":300,"height":300,"title":"Autumn by Robin Trower","reference_url":"http://www.last.fm/music/Robin+Trower/Autumn"},{"id":1927,"type":"foodspotting","source_id":"5371764","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5371764/thumb_275.jpg?1430502450","width":280,"height":280,"title":"Large Pepperoni Pizza at Gaby\u0027s Pizza","reference_url":"http://www.foodspotting.com/reviews/5371764"},{"id":1826,"type":"flickr","source_id":"26221589475","url":"https://farm2.staticflickr.com/1700/26221589475_b8f6b75dcf.jpg","width":334,"height":500,"title":"Tree","reference_url":"https://www.flickr.com/photos/namoscato/26221589475"},{"id":2032,"type":"lastfm","source_id":"a39458021a767061ed81ddeac5f024cf","url":"http://img2-ak.lst.fm/i/u/300x300/905667d3b3c741b988da9f92d519b888.png","width":300,"height":300,"title":"Autumn by George Winston","reference_url":"http://www.last.fm/music/George+Winston/Autumn"},{"id":1926,"type":"foodspotting","source_id":"5371707","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/5371707/thumb_275.jpg?1430498998","width":280,"height":280,"title":"Penne Toscana at Luigis Restaurant \u0026 Bar Inc","reference_url":"http://www.foodspotting.com/reviews/5371707"},{"id":1825,"type":"flickr","source_id":"26129148582","url":"https://farm2.staticflickr.com/1482/26129148582_9eb461b17c.jpg","width":500,"height":334,"title":"Saugerties Lighthouse","reference_url":"https://www.flickr.com/photos/namoscato/26129148582"},{"id":2031,"type":"lastfm","source_id":"007cef8142e4f843e94b9d689b1bc3a2","url":"","width":300,"height":300,"title":"From Nothing: Solo Piano by Chick Corea","reference_url":"http://www.last.fm/music/Chick+Corea/From+Nothing:+Solo+Piano"},{"id":1925,"type":"foodspotting","source_id":"4918146","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4918146/thumb_275.jpg?1407627862","width":280,"height":280,"title":"Southern Pulled Pork Sandwich at Chow Daddy\u0027s","reference_url":"http://www.foodspotting.com/reviews/4918146"},{"id":1824,"type":"flickr","source_id":"26155291611","url":"https://farm2.staticflickr.com/1582/26155291611_7a40a958d2.jpg","width":500,"height":334,"title":"Tree Branch","reference_url":"https://www.flickr.com/photos/namoscato/26155291611"},{"id":2030,"type":"lastfm","source_id":"33b2968f18ad0574897c7e6016ad8f12","url":"http://img2-ak.lst.fm/i/u/300x300/4cd2b67e52944981c9d4d0300be61fc4.png","width":300,"height":300,"title":"Loopified by Dirty Loops","reference_url":"http://www.last.fm/music/Dirty+Loops/Loopified"},{"id":1924,"type":"foodspotting","source_id":"4901465","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4901465/thumb_275.jpg?1407012845","width":280,"height":280,"title":"Chicken Club Ciabatta at Taziki\u0027s Mediterranean Cafe ","reference_url":"http://www.foodspotting.com/reviews/4901465"},{"id":1823,"type":"flickr","source_id":"26129150502","url":"https://farm2.staticflickr.com/1588/26129150502_76b43b66d5.jpg","width":500,"height":334,"title":"Hudson River Marker","reference_url":"https://www.flickr.com/photos/namoscato/26129150502"},{"id":2029,"type":"lastfm","source_id":"6e21a9203376d5182774caaf86fba3b7","url":"http://img2-ak.lst.fm/i/u/300x300/20b1fa668a174b0182d2bd495ff0e23d.png","width":300,"height":300,"title":"All of a Sudden I Miss Everyone by Explosions in the Sky","reference_url":"http://www.last.fm/music/Explosions+in+the+Sky/All+of+a+Sudden+I+Miss+Everyone"},{"id":1923,"type":"foodspotting","source_id":"4898446","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4898446/thumb_275.jpg?1406911491","width":280,"height":280,"title":"Biscuit Beignets at Another Broken Egg Caf\u00e9","reference_url":"http://www.foodspotting.com/reviews/4898446"},{"id":1822,"type":"flickr","source_id":"26221592445","url":"https://farm2.staticflickr.com/1575/26221592445_3f5c79b723.jpg","width":500,"height":334,"title":"Lights","reference_url":"https://www.flickr.com/photos/namoscato/26221592445"},{"id":2028,"type":"lastfm","source_id":"a9552bb8806c78f7ccc8b42d338f340d","url":"http://img2-ak.lst.fm/i/u/300x300/b8852e79a1fe4811a4382c668ccd6633.png","width":300,"height":300,"title":"The Earth Is Not a Cold Dead Place by Explosions in the Sky","reference_url":"http://www.last.fm/music/Explosions+in+the+Sky/The+Earth+Is+Not+a+Cold+Dead+Place"},{"id":1922,"type":"foodspotting","source_id":"4897188","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4897188/thumb_275.jpg?1406858052","width":280,"height":280,"title":"Crabcake Burger at Pearlz Oyster Bar","reference_url":"http://www.foodspotting.com/reviews/4897188"},{"id":1821,"type":"flickr","source_id":"26129151822","url":"https://farm2.staticflickr.com/1681/26129151822_66dc748c50.jpg","width":500,"height":335,"title":"Lights","reference_url":"https://www.flickr.com/photos/namoscato/26129151822"},{"id":2027,"type":"lastfm","source_id":"794882ce04db9e56cde3132f1d1ccddb","url":"http://img2-ak.lst.fm/i/u/300x300/81d82fe5efe74f66cf55480288bd07f5.png","width":300,"height":300,"title":"Another Language by This Will Destroy You","reference_url":"http://www.last.fm/music/This+Will+Destroy+You/Another+Language"},{"id":1921,"type":"foodspotting","source_id":"4896536","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4896536/thumb_275.jpg?1406834612","width":280,"height":280,"title":"Turkey In The Straw at Brown Dog Deli","reference_url":"http://www.foodspotting.com/reviews/4896536"},{"id":1820,"type":"flickr","source_id":"25948720190","url":"https://farm2.staticflickr.com/1493/25948720190_9873ca3d64.jpg","width":334,"height":500,"title":"Lights","reference_url":"https://www.flickr.com/photos/namoscato/25948720190"},{"id":2026,"type":"lastfm","source_id":"4727064ff64af82a313b60b91fac6c9a","url":"http://img2-ak.lst.fm/i/u/300x300/62d26c6cb4ac4bdccb8f3a2a0fd55421.png","width":300,"height":300,"title":"OK Computer by Radiohead","reference_url":"http://www.last.fm/music/Radiohead/OK+Computer"},{"id":1920,"type":"foodspotting","source_id":"4751182","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4751182/thumb_275.jpg?1401659611","width":280,"height":280,"title":"Chicken Pasquale at 17th Street Cafe","reference_url":"http://www.foodspotting.com/reviews/4751182"},{"id":1819,"type":"flickr","source_id":"25616844144","url":"https://farm2.staticflickr.com/1703/25616844144_9af4344db3.jpg","width":500,"height":335,"title":"Boat","reference_url":"https://www.flickr.com/photos/namoscato/25616844144"},{"id":2025,"type":"lastfm","source_id":"fcb797012aac11c51655e9ea14c05996","url":"http://img2-ak.lst.fm/i/u/300x300/ef0e99c5d7b94144854f828ab132c104.png","width":300,"height":300,"title":"Threads by Now, Now","reference_url":"http://www.last.fm/music/Now,+Now/Threads"},{"id":1919,"type":"foodspotting","source_id":"4736062","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4736062/thumb_275.jpg?1401158055","width":280,"height":280,"title":"Ribs at Amoscato\u0027s Kitchen","reference_url":"http://www.foodspotting.com/reviews/4736062"},{"id":1818,"type":"flickr","source_id":"26129154502","url":"https://farm2.staticflickr.com/1708/26129154502_c1e07f8b90.jpg","width":334,"height":500,"title":"Saugerties Lighthouse","reference_url":"https://www.flickr.com/photos/namoscato/26129154502"},{"id":2024,"type":"lastfm","source_id":"99ef6e382bd52bf8d9771f94c4db3b93","url":"http://img2-ak.lst.fm/i/u/300x300/1a7b2660753c427d86d9d971dccbab25.png","width":300,"height":300,"title":"Neighbors by Now, Now","reference_url":"http://www.last.fm/music/Now,+Now/Neighbors"},{"id":1918,"type":"foodspotting","source_id":"4728778","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4728778/thumb_275.jpg?1400956504","width":280,"height":280,"title":"Peanut Butter Hotcakes at De Luca\u0027s Restaurant","reference_url":"http://www.foodspotting.com/reviews/4728778"},{"id":1817,"type":"flickr","source_id":"26129155632","url":"https://farm2.staticflickr.com/1705/26129155632_57ae860b1e.jpg","width":335,"height":500,"title":"Saugerties Lighthouse","reference_url":"https://www.flickr.com/photos/namoscato/26129155632"},{"id":2023,"type":"lastfm","source_id":"78eb9e3e2decace50a0e4c16dc864d05","url":"http://img2-ak.lst.fm/i/u/300x300/ef0e99c5d7b94144854f828ab132c104.png","width":300,"height":300,"title":"Threads by Now, Now","reference_url":"http://www.last.fm/music/Now,+Now/Threads"},{"id":1917,"type":"foodspotting","source_id":"4724252","url":"http://s3.amazonaws.com/foodspotting-ec2/reviews/4724252/thumb_275.jpg?1400803865","width":280,"height":280,"title":"Scallop And Shrimp Over Pasta at Andora","reference_url":"http://www.foodspotting.com/reviews/4724252"}]';
    fetchPhotosHandler(JSON.parse(data));

    function fetchPhotosHandler(data) {
        var current = {
            left: 0,
            rowIndex: 0
        };
        var html = '';

        for (var i in data) {
            if (current.left + current.columnWidth > _windowWidth) {
                break;
            }

            current.photo = data[i];

            if (typeof current.columnHeight !== 'undefined' && (current.top + getImageHeight(current.photo, current.columnWidth)) > current.columnHeight) {
                current.left += current.columnWidth;
                current.rowIndex = 0;
            }

            if (++current.rowIndex === 1) {
                current.columnHeight = getRandomNumber(_columnHeightMin, _columnHeightMax);
                current.columnWidth = getRandomNumber(_photoWidthMin, _photoWidthMax);
                current.top = getRandomNumber(0, _columnHeightMax - current.columnHeight);
            }

            current.color = getRandomNumber(_colorMin, _colorMax);
            current.imageHeight = getImageHeight(current.photo, current.columnWidth);

            html += createImageTag({
                alt: current.photo.title,
                src: current.photo.url,
                style: createStyleAttribute({
                    'background-color': 'rgb(' + current.color + ',' + current.color + ',' + current.color + ')',
                    height: current.imageHeight + 'px',
                    left: current.left + 'px',
                    top: current.top + 'px',
                    width: current.columnWidth + 'px'
                })
            });

            current.top += current.imageHeight;
        };

        $photos.html(html);
        $photos.css({
            height: _columnHeightMax + 'px'
        });
    }

    function createImageTag(attributes) {
        var tag = '<img';

        for (var i in attributes) {
            tag += ' ' + i + '="' + attributes[i] + '"';
        }

        return tag + '>';
    }

    function createStyleAttribute(properties) {
        var result = '';

        for (var i in properties) {
            result += i + ':' + properties[i] + ';';
        }

        return result;
    }

    function getImageHeight(photo, width) {
        return Number(photo.height) / Number(photo.width) * width;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

})();
