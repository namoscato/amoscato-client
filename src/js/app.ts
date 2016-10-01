/// <reference path="./stream/stream.ts" />

namespace Amo.Client {
    const windowElement: JQuery = $(window);

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
        secondarySourceTypes: [
            'github',
            'twitter',
        ],
        secondarySquareSizeMax: 0.3,
        secondarySquareSizeMin: 0.1,
        typeColorMap: {
            flickr: '#CF006B',
            foodspotting: '#BA5D33',
            github: '#8cc665',
            goodreads: '#A37134',
            lastfm: '#C40000',
            twitter: '#1da1f2',
            vimeo: '#3490C4',
            youtube: '#C41C14',
        },
        windowWidth: windowElement.width(),
    };
    const streamElement: JQuery = $('#homepage-stream');

    $.get(
        '/data/stream.json',
        (data) => {
            let resizeTimeout: number;
            const stream = new Stream(
                data,
                streamConfig
            );

            const setStreamHtml = () => {
                streamElement.html(stream.generateHtml());
            };

            setStreamHtml();

            windowElement.resize(() => {
                const windowWidth = windowElement.width();

                if (streamConfig.windowWidth === windowWidth) {
                    return;
                }

                clearTimeout(resizeTimeout);

                resizeTimeout = setTimeout(() => {
                    streamConfig.windowWidth = windowWidth;
                    setStreamHtml();
                }, 150);
            });
        }
    );
}
