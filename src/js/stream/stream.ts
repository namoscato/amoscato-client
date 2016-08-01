/// <reference path="./column.ts" />

namespace Amo.Client {

    export class Stream {

        constructor(
            private items: Array<IStreamItem>,
            private config: IStreamConfiguration) {
        }

        /**
         * @description Returns the HTML for the initialized stream items
         * @returns {string}
         */
        public getHtml(): string {
            let left = 0;
            let html = '';
            let item: IStreamItem;

            let column = this.createColumn(left);

            for (item of this.items) {
                if (item.type === 'github') { // TODO: Add GitHub support
                    continue;
                }

                if (column.addItem(item)) {
                    continue;
                }

                html += column.getHtml();
                left += column.getWidth();

                if (left > this.config.windowWidth) {
                    break;
                }

                column = this.createColumn(left, item);
            }

            return html;
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
