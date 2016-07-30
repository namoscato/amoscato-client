/// <reference path="./column.ts" />

namespace Amo.Client {

    export interface IStream {
        getHtml(): string;
    }

    export class Stream implements IStream {
        private html = '';

        constructor(
            items: Array<IStreamItem>,
            private config: IStreamConfiguration) {
            let left = 0;
            let item: IStreamItem;

            config.windowWidth = $(window).width();

            let column = this.createColumn(left);

            for (item of items) {
                if (item.type === 'github') { // TODO: Add GitHub support
                    continue;
                }

                if (column.addItem(item)) {
                    continue;
                }

                this.html += column.getHtml();
                left += column.getWidth();

                if (left > config.windowWidth) {
                    break;
                }

                column = this.createColumn(left, item);
            }
        }

        /**
         * @description Returns the HTML for the initialized stream items
         * @returns {string}
         */
        public getHtml(): string {
            return this.html;
        }

        /**
         * @description Creates a column with the specified left offset
         * @param {number} left
         * @param {IStreamItem} [item]
         * @returns {StreamColumn}
         */
        private createColumn(left: number, item?: IStreamItem): StreamColumn {
            return new StreamColumn(left, this.config, item);
        }
    }
}
