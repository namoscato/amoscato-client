import $ from "jquery";
import CurrentList from "./current-list/current-list";
import { IStreamConfiguration } from "./stream/interface";
import { Stream } from "./stream/stream";

const currentListElement = $("#homepage-currently");
const streamElement = $("#homepage-stream");
const windowElement = $(window);

const currentListSources: string[] = [
    "journal",
    "music",
    "athleticActivity",
    "book",
    "video",
    "drink",
];
const streamConfig: IStreamConfiguration = {
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
    secondarySourceTypeMap: {},
    secondarySourceTypes: ["github", "twitter"],
    secondarySquareSizeMax: 0.3,
    secondarySquareSizeMin: 0.1,
    typeColorMap: {
        flickr: "#CF006B",
        foodspotting: "#BA5D33",
        github: "#8cc665",
        goodreads: "#A37134",
        instagram: "#eb4644",
        lastfm: "#C40000",
        twitter: "#1da1f2",
        untappd: "#ffcc01",
        vimeo: "#3490C4",
        youtube: "#C41C14",
    },
    windowWidth: Number(windowElement.width()),
};

if (currentListElement.length) {
    $.get("/data/current.json", (data) => {
        data.journal = {
            date: currentListElement.data("journal-date"),
            title: currentListElement.data("journal-title"),
            url: currentListElement.data("journal-url"),
        };

        const currentList = new CurrentList(currentListSources, data);

        currentListElement.append(currentList.getHtml());
    });
}

if (streamElement.length) {
    $.get("/data/stream.json", (data) => {
        let resizeTimeout: number;
        const stream = new Stream(data, streamConfig);

        const setStreamHtml = () => {
            streamElement.html(stream.generateHtml());
        };

        setStreamHtml();

        windowElement.resize(() => {
            const windowWidth = Number(windowElement.width());

            if (streamConfig.windowWidth === windowWidth) {
                return;
            }

            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
                streamConfig.windowWidth = windowWidth;
                setStreamHtml();
            }, 150);
        });
    });
}
