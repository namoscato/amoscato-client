namespace Amo.Client {

    interface IListItem {
        title: string;
        url: string;
        verb: string;
    };

    export class CurrentList {
        private html: string = '';

        constructor(
            private sources: Array<string>,
            private data: any) {
            ['lastfm', 'goodreads'].forEach((source) => {
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
         * @description Returns the HTML for the specified list item
         * @param {IListItem} item
         * @returns {string}
         */
        private getListItemHtml(item: IListItem): string {
            return `<li class="homepage-current-list-item">${item.verb} <a href="${item.url}" target="_default">${item.title}</a></li>`;
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
                        url: item.url,
                        verb: 'reading',
                    });
                case 'lastfm':
                    return this.getListItemHtml({
                        title: item.artist,
                        url: item.url,
                        verb: 'listening to',
                    });
                default:
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
