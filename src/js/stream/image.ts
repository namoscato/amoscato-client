/// <reference path="./utility.ts" />

namespace Amo.Client {

    interface IImageConfiguration {
        left: number;
        top: number;
        width: number;
    }

    export class StreamImage {
        private color: number;
        private height: number;

        constructor(
            private photo: IStreamFlickrPhoto,
            private imageConfig: IImageConfiguration,
            private config: IStreamConfiguration) {
            this.color = StreamUtility.getRandomNumber(config.colorMin, config.colorMax);
            this.height = StreamUtility.getImageHeight(photo, imageConfig.width);
        }

        /**
         * @description Returns the image height
         * @returns {number}
         */
        public getHeight(): number {
            return this.height;
        }

        /**
         * @description Returns the image HTML
         * @returns {string}
         */
        public getHtml(): string {
            return StreamUtility.createImageTag({
                alt: this.photo.title,
                src: this.photo.url,
                style: StreamUtility.createStyleAttribute({
                    'background-color': 'rgb(' + this.color + ',' + this.color + ',' + this.color + ')',
                    height: this.height + 'px',
                    left: this.imageConfig.left + 'px',
                    top: this.imageConfig.top + 'px',
                    width: this.imageConfig.width + 'px',
                }),
            });
        }
    }
}
