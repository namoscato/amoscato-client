import * as moment from "moment";

interface IListItem {
    target?: string;
    title: string;
    tooltip: string;
    url: string;
    verb: string;
}

const stravaTypeVerbMap: any = {
    Ride: "biking",
    Run: "running",
};

export default class CurrentList {
    private html = "";

    constructor(
        private sources: string[],
        private data: any // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
    ) {
        sources.forEach((source) => {
            const item = data[source];

            if (item !== null) {
                this.html += this.getSourceHtml(source, item);
            }
        });
    }

    /**
     * @description Returns the current list HTML
     * @returns {string}
     */
    public getHtml(): string {
        return this.html;
    }

    /**
     * @description Formats the specified date
     * @param {string} date
     * @returns {string}
     */
    private formatDate(date: string): string {
        return moment.utc(date).fromNow();
    }

    /**
     * @description Returns the HTML for the specified list item
     * @param {IListItem} item
     * @returns {string}
     */
    private getListItemHtml(item: IListItem): string {
        if (typeof item.target === "undefined") {
            item.target = "_blank";
        }

        return `<li class="homepage-current-list-item" title="${item.tooltip}">${item.verb} <a href="${item.url}" target="${item.target}">${item.title}</a></li>`;
    }

    /**
     * @description Returns the HTML for the specified source item
     * @param {string} source
     * @param {Object} item
     * @return {string}
     */
    private getSourceHtml(source: string, item: any): string {
        switch (source) {
            case "athleticActivity":
                if ("undefined" === typeof stravaTypeVerbMap[item.type]) {
                    return "";
                }

                return this.getListItemHtml({
                    title: `${Math.floor(100 * item.miles) / 100} miles`,
                    tooltip: `in ${Math.ceil(
                        item.minutes
                    )} minutes, ${this.formatDate(item.date)}`,
                    url: item.url,
                    verb: stravaTypeVerbMap[item.type],
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
     * @description Quotes the specified text with quotes
     * @param {string} text
     * @return {string}
     */
    private quoteText(text: string): string {
        return `&ldquo;${text}&rdquo;`;
    }
}
