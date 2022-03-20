import moment from "moment";
import { STRAVA_TYPE_VERB_MAP } from "./consts";
import { ListItem } from "./types";

export default class CurrentList {
    private html = "";

    constructor(
        sources: string[],
        data: any // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    ) {
        sources.forEach((source) => {
            const item = data[source];

            if (item !== null) {
                this.html += this.getSourceHtml(source, item);
            }
        });
    }

    /**
     * Returns the current list HTML
     */
    public getHtml(): string {
        return this.html;
    }

    /**
     * Formats the specified date
     */
    private formatDate(date: string): string {
        return moment.utc(date).fromNow();
    }

    /**
     * Returns the HTML for the specified list item
     */
    private getListItemHtml(item: ListItem): string {
        if (typeof item.target === "undefined") {
            item.target = "_blank";
        }

        return `<li class="homepage-current-list-item" title="${item.tooltip}">${item.verb} <a href="${item.url}" target="${item.target}">${item.title}</a></li>`;
    }

    /**
     * Returns the HTML for the specified source item
     */
    private getSourceHtml(source: string, item: any): string {
        switch (source) {
            case "athleticActivity":
                if ("undefined" === typeof STRAVA_TYPE_VERB_MAP[item.type]) {
                    return "";
                }

                return this.getListItemHtml({
                    title: `${Math.floor(100 * item.miles) / 100} miles`,
                    tooltip: `in ${Math.ceil(
                        item.minutes
                    )} minutes, ${this.formatDate(item.date)}`,
                    url: item.url,
                    verb: STRAVA_TYPE_VERB_MAP[item.type],
                });
            case "book":
                return this.getListItemHtml({
                    title: this.quoteText(item.title),
                    tooltip: `by ${item.author}, started ${this.formatDate(
                        item.date
                    )}`,
                    url: item.url,
                    verb: "reading",
                });
            case "drink":
                return this.getListItemHtml({
                    title: item.name,
                    tooltip: `by ${item.brewery}, ${this.formatDate(
                        item.date
                    )}`,
                    url: item.url,
                    verb: "drinking",
                });
            case "journal":
                return this.getListItemHtml({
                    target: "_self",
                    title: this.quoteText(item.title),
                    tooltip: this.formatDate(item.date),
                    url: item.url,
                    verb: "writing",
                });
            case "music":
                return this.getListItemHtml({
                    title: item.artist,
                    tooltip: `${this.quoteText(item.name)} on ${
                        item.album
                    }, ${this.formatDate(item.date)}`,
                    url: item.url,
                    verb: "listening to",
                });
            case "video":
                return this.getListItemHtml({
                    title: this.quoteText(item.title),
                    tooltip: this.formatDate(item.date),
                    url: item.url,
                    verb: "watching",
                });
            default:
                return "";
        }
    }

    /**
     * Quotes the specified text with quotes
     */
    private quoteText(text: string): string {
        return `&ldquo;${text}&rdquo;`;
    }
}
