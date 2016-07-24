/// <reference path="./image.ts" />
/// <reference path="./utility.ts" />

namespace Amo.Client {

    export interface IStreamColumn {
        addPhoto(photo: IStreamFlickrPhoto): boolean;
        getHtml(): string;
        getWidth(): number;
    }

    export class StreamColumn implements IStreamColumn {
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
            const heightMax = config.columnHeightMaxFunction(xCoordinate);

            this.offset = config.offsetFunction(xCoordinate);

            this.width = StreamUtility.getRandomNumber(config.photoWidthMin, config.photoWidthMax);
            this.height = StreamUtility.getRandomNumber(
                config.columnHeightMinFunction(xCoordinate),
                heightMax
            );

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
            const potentialHeight = this.top + StreamUtility.getImageHeight(photo, this.width);

            if (potentialHeight > this.height - this.offset) {
                return false;
            }

            const image = new StreamImage(
                photo,
                {
                    left: this.left,
                    top: this.top,
                    width: this.width,
                },
                this.config
            );

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
