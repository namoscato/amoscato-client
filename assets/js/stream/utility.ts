export class StreamUtility {
    /**
     * @description Creates a style attribute from a set of properties
     * @param {Object} properties
     * @returns {string}
     */
    public static createStyleAttribute(
        properties: Record<string, string>,
    ): string {
        let result = "";

        for (const i in properties) {
            result += i + ":" + properties[i] + ";";
        }

        return result;
    }

    /**
     * @description Creates an HTML tag from a set of attributes
     * @param {String} tag
     * @param {Object} attributes
     * @returns {string}
     */
    public static createTag(
        tag: string,
        attributes: Record<string, string | null>,
    ): string {
        tag = `<${tag}`;

        for (const attribute in attributes) {
            if (
                !Object.prototype.hasOwnProperty.call(attributes, attribute) ||
                !attributes[attribute]
            ) {
                continue;
            }

            tag += ` ${attribute}="${(attributes as any)[attribute]}"`;
        }

        return `${tag}>`;
    }

    /**
     * @description Returns a color object from the specified hex value
     * @param {string} hex
     * @returns {Object}
     */
    public static getColor(hex: string): any {
        return one.color(hex);
    }

    /**
     * @description Returns a random color within the specified brightness range
     * @param {string} color
     * @param {number} colorBrightnessMin
     * @param {number} colorBrightnessMax
     * @returns {string}
     */
    public static getRandomColor(
        color: string,
        colorBrightnessMin: number,
        colorBrightnessMax: number,
    ): string {
        return this.getColor(color)
            .lightness(
                this.getRandomFloat(colorBrightnessMin, colorBrightnessMax),
                true,
            )
            .hex();
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
     * @description Returns a random integer between the specified min and max
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    public static getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
