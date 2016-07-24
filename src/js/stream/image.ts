/// <reference path="./utility.ts" />

namespace Amo.Client {

    interface IImageConfiguration {
        left: number;
        top: number;
        width: number;
    }

    export class StreamImage {
        private height: number;
        private html: string;

        constructor(
            photo: IStreamFlickrPhoto,
            imageConfig: IImageConfiguration,
            config: IStreamConfiguration) {
            const color = StreamUtility.getRandomNumber(config.colorMin, config.colorMax);

            this.height = StreamUtility.getImageHeight(photo, imageConfig.width);

            this.html = StreamUtility.createImageTag({
                alt: photo.title,
                src: photo.url,
                style: StreamUtility.createStyleAttribute({
                    'background-color': 'rgb(' + color + ',' + color + ',' + color + ')',
                    height: this.height + 'px',
                    left: imageConfig.left + 'px',
                    top: imageConfig.top + 'px',
                    width: imageConfig.width + 'px',
                }),
            });
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
            return this.html;
        }
    }
}
