namespace Amo.Client {

    declare var one: any;

    export class StreamUtility {

        /**
         * @description Returns a random integer between the specified min and max
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        public static getRandomInteger(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        /**
         * @description Returns a random float between the specified min and max
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        public static getRandomFloat(min: number, max: number): number {
            return Math.random() * (max - min) + min;
        }

        /**
         * @description Returns a color object from the specified hex value
         * @param {string} hex
         * @returns {Object}
         */
        public static getColor(hex: string) {
            return one.color(hex);
        }
    }
}
