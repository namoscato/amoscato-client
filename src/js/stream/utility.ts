namespace Amo.Client {

    export class StreamUtility {

        /**
         * @description Creates an image tag from a set of attributes
         * @param {Object} attributes
         * @returns {string}
         */
        public static createImageTag(attributes: Object): string {
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
        public static createStyleAttribute(properties: Object): string {
            let result = '';

            for (let i in properties) {
                result += i + ':' + (<any> properties)[i] + ';';
            }

            return result;
        }

        /**
         * @description Returns the height of the image for the specified width
         * @param {IStreamFlickrPhoto} photo
         * @param {number} width
         */
        public static getImageHeight(photo: IStreamFlickrPhoto, width: number): number {
            return Number(photo.height) / Number(photo.width) * width;
        }

        /**
         * @description Returns a random integer between the specified min and max
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        public static getRandomNumber(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }
}
