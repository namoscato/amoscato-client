/// <reference path="./stream/stream.ts" />

namespace Amo.Client {
    const columnHeightMax = 550;
    const streamConfig = {
        colorMax: 300,
        colorMin: 200,
        getColumnHeightMax: (x: number) => {
            const absoluteValue = Math.abs(x);

            if (absoluteValue < 300) {
                return absoluteValue / 2 + 400;
            }

            return columnHeightMax;
        },
        getColumnHeightMin: (x: number) => {
            return Math.abs(x) / 3 + 300;
        },
        getOffset: (x: number) => {
            return -Math.abs(x) / 4 + 90;
        },
        photoWidthMax: 150,
        photoWidthMin: 50,
    };
    const streamElement: JQuery = $('#stream');

    $.get(
        'http://localhost:8000/stream',
        (data) => {
            const stream = new Stream(
                data,
                streamConfig
            );

            streamElement.html(stream.getHtml());
            streamElement.css({
                height: columnHeightMax + 'px',
            });
        }
    );
}
