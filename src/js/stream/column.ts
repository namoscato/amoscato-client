/// <reference path="./image.ts" />
/// <reference path="./utility.ts" />

namespace Amo.Client {

    export class StreamColumn {
        private height: number;
        private width: number;
        private html = '';
        private offset: number;
        private top: number;

        constructor(
            private left: number,
            private config: IStreamConfiguration,
            item?: IStreamItem) {
            const xCoordinate = left - config.windowWidth / 2;
            const heightMax = config.getColumnHeightMax(xCoordinate);

            this.width = StreamUtility.getRandomInteger(config.photoWidthMin, config.photoWidthMax);
            this.height = StreamUtility.getRandomInteger(config.getColumnHeightMin(xCoordinate), heightMax);

            this.offset = config.getOffset(xCoordinate);
            this.top = StreamUtility.getRandomInteger(this.offset, heightMax - this.height + this.offset);

            if (item) {
                this.addItem(item);
            }
        }

        /**
         * @description Adds the specified item to the stream column
         * @param {IStreamItem} item
         * @returns {boolean} Whether or not the item could be added
         */
        public addItem(item: IStreamItem): boolean {
            const image = new StreamImage(
                item,
                {
                    left: this.left,
                    top: this.top,
                    width: this.width,
                },
                this.config
            );

            if (this.top + image.getHeight() > this.height + this.offset) {
                return false;
            }

            this.html += image.getHtml();
            this.top += image.getHeight();

            return true;
        }

        /**
         * @description Returns the column HTML
         * @returns {string}
         */
        public getHtml(): string {
            return this.html;
        }

        /**
         * @description Returns the column width
         * @returns {number}
         */
        public getWidth(): number {
            return this.width;
        }
    }
}
