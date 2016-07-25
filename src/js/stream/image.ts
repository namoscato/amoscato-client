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
            private item: IStreamItem,
            private imageConfig: IImageConfiguration,
            private config: IStreamConfiguration) {
            this.color = StreamUtility.getRandomNumber(config.colorMin, config.colorMax);
            this.height = Number(item.photo_height) / Number(item.photo_width) * imageConfig.width;
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
            return this.createImageTag({
                alt: this.item.title,
                src: this.item.photo_url,
                style: this.createStyleAttribute({
                    'background-color': 'rgb(' + this.color + ',' + this.color + ',' + this.color + ')',
                    height: this.height + 'px',
                    left: this.imageConfig.left + 'px',
                    top: this.imageConfig.top + 'px',
                    width: this.imageConfig.width + 'px',
                }),
            });
        }

        /**
         * @description Creates an image tag from a set of attributes
         * @param {Object} attributes
         * @returns {string}
         */
        private createImageTag(attributes: Object): string {
            let tag = '<img';

            for (let i in attributes) {
                tag += ' ' + i + '="' + (<any> attributes)[i] + '"';
            }

            return tag + '>';
        }

        /**
         * @description Creates a style attribute from a set of properties
         * @param {Object} properties
         * @returns {string}
         */
        private createStyleAttribute(properties: Object): string {
            let result = '';

            for (let i in properties) {
                result += i + ':' + (<any> properties)[i] + ';';
            }

            return result;
        }
    }
}
