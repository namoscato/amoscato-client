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
            photo?: IStreamFlickrPhoto) {
            const xCoordinate = left - config.windowWidth / 2;
            const heightMax = config.getColumnHeightMax(xCoordinate);

            this.width = StreamUtility.getRandomNumber(config.photoWidthMin, config.photoWidthMax);
            this.height = StreamUtility.getRandomNumber(config.getColumnHeightMin(xCoordinate), heightMax);

            this.offset = config.getOffset(xCoordinate);
            this.top = StreamUtility.getRandomNumber(-this.offset, heightMax - this.height - this.offset);

            if (photo) {
                this.addPhoto(photo);
            }
        }

        /**
         * @description Adds the specified photo to the stream column
         * @param {IStreamFlickrPhoto} photo
         * @returns {boolean} Whether or not the photo could be added
         */
        public addPhoto(photo: IStreamFlickrPhoto): boolean {
            const image = new StreamImage(
                photo,
                {
                    left: this.left,
                    top: this.top,
                    width: this.width,
                },
                this.config
            );

            if (this.top + image.getHeight() > this.height - this.offset) {
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
