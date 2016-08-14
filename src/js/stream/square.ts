/// <reference path="./utility.ts" />

namespace Amo.Client {

    interface IConfiguration {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    }

    export class StreamSquare {
        private color: string;

        constructor(
            public size: number,
            private item: IStreamItem,
            streamConfig: IStreamConfiguration) {
            const colorBrightnessDelta = StreamUtility.getRandomFloat(streamConfig.colorBrightnessMin, streamConfig.colorBrightnessMax);

            this.color = StreamUtility.getColor((<any> streamConfig.typeColorMap)[item.type]).lightness(colorBrightnessDelta, true).hex();
        }

        /**
         * @description Returns the image HTML
         * @returns {string}
         */
        public generateHtml(config: IConfiguration): string {
            return this.createTag(
                'a',
                {
                    class: 'stream-item stream-item-text',
                    href: this.item.url,
                    style: this.createStyleAttribute({
                        'background-color': this.color,
                        height: this.size + 'px',
                        left: config.left + 'px',
                        top: config.top - this.size + 'px',
                        width: this.size + 'px',
                    }),
                    target: '_blank',
                    title: this.item.title,
                }
            );
        }

        /**
         * @description Creates an HTML tag from a set of attributes
         * @param {String} tag
         * @param {Object} attributes
         * @returns {string}
         */
        private createTag(tag: string, attributes: Object): string {
            tag = '<' + tag;

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
