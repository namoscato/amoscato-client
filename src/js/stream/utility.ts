namespace Amo.Client {

    export class StreamUtility {

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
