/// <reference path="./column.ts" />

namespace Amo.Client {

    export interface IStream {
        getHtml(): string;
    }

    export class Stream implements IStream {
        private html = '';

        constructor(
            photos: Array<IStreamFlickrPhoto>,
            private config: IStreamConfiguration) {
            let left = 0;
            let photo: IStreamFlickrPhoto;

            config.windowWidth = $(window).width();

            let column = this.createColumn(left);

            for (photo of photos) {
                if (column.addPhoto(photo)) {
                    continue;
                }

                this.html += column.getHtml();
                left += column.getWidth();

                if (left > config.windowWidth) {
                    break;
                }

                column = this.createColumn(left, photo);
            }
        }

        /**
         * @description Returns the HTML for the initialized photos
         * @returns {string}
         */
        public getHtml(): string {
            return this.html;
        }

        /**
         * @description Creates a column with the specified left offset
         * @param {number} left
         * @param {IStreamFlickrPhoto} [photo]
         * @returns {StreamColumn}
         */
        private createColumn(left: number, photo?: IStreamFlickrPhoto): StreamColumn {
            return new StreamColumn(left, this.config, photo);
        }
    }
}
