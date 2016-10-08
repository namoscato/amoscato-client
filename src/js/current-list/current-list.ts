declare var moment: any;

namespace Amo.Client {

    interface IListItem {
        title: string;
        tooltip: string;
        url: string;
        verb: string;
    };

    export class CurrentList {
        private html: string = '';

        constructor(
            private sources: Array<string>,
            private data: any) {
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
            return `<li class="homepage-current-list-item" title="${item.tooltip}">${item.verb} <a href="${item.url}" target="_default">${item.title}</a></li>`;
        }

        /**
         * @description Returns the HTML for the specified source item
         * @param {string} source
         * @param {Object} item
         * @return {string}
         */
        private getSourceHtml(source: string, item: any): string {
            switch (source) {
                case 'goodreads':
                    return this.getListItemHtml({
                        title: this.quoteText(item.title),
                        tooltip: `by ${item.author}, started ${this.formatDate(item.date)}`,
                        url: item.url,
                        verb: 'reading',
                    });
                case 'journal':
                    return this.getListItemHtml({
                        title: this.quoteText(item.title),
                        tooltip: this.formatDate(item.date),
                        url: item.url,
                        verb: 'writing',
                    });
                case 'lastfm':
                    return this.getListItemHtml({
                        title: item.artist,
                        tooltip: `${this.quoteText(item.name)} on ${item.album}, ${this.formatDate(item.date)}`,
                        url: item.url,
                        verb: 'listening to',
                    });
                default:
                    return '';
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
}
