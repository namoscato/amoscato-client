/// <reference path="./stream/stream.ts" />

namespace Amo.Client {
    const streamConfig = {
        colorBrightnessMax: 0.1,
        colorBrightnessMin: -0.1,
        getColumnHeightMax: (x: number) => {
            const absoluteValue = Math.abs(x);

            if (absoluteValue < 300) {
                return absoluteValue / 2 + 400;
            }

            return 550;
        },
        getColumnHeightMin: (x: number) => {
            return Math.abs(x) / 3 + 300;
        },
        getOffset: (x: number) => {
            return -Math.abs(x) / 4 + 90;
        },
        photoWidthMax: 150,
        photoWidthMin: 50,
        typeColorMap: {
            flickr: '#CF006B',
            foodspotting: '#BA5D33',
            goodreads: '#A37134',
            lastfm: '#C40000',
            vimeo: '#3490C4',
            youtube: '#C41C14',
        },
    };
    const streamElement: JQuery = $('#stream');

    $.get(
        'http://api.amoscato.com/stream',
        (data) => {
            const stream = new Stream(
                data,
                streamConfig
            );

            streamElement.html(stream.getHtml());
        }
    );
}
