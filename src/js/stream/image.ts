/// <reference path="./utility.ts" />

namespace Amo.Client {

    interface IImageConfiguration {
        left: number;
        top: number;
        width: number;
    }

    export class StreamImage {
        private color: string;
        private height: number;

        constructor(
            private item: IStreamItem,
            private imageConfig: IImageConfiguration,
            private config: IStreamConfiguration) {
            const height = item.photo_url ? item.photo_height : imageConfig.width;
            const width = item.photo_url ? item.photo_width : imageConfig.width;

            this.color = StreamUtility.getRandomColor((<any> config.typeColorMap)[item.type], config.colorBrightnessMin, config.colorBrightnessMax);
            this.height = Number(height) / Number(width) * imageConfig.width;
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
            const title = this.item.title.replace(/"/g, '&quot;');

            let html = this.createTag(
                'a',
                {
                    class: 'stream-item stream-item-' + (this.item.photo_url ? 'photo' : 'text'),
                    href: this.item.url,
                    style: this.createStyleAttribute({
                        'background-color': this.color,
                        'font-size': this.imageConfig.width * 0.15 + 'px',
                        height: this.height + 'px',
                        left: this.imageConfig.left + 'px',
                        top: this.imageConfig.top + 'px',
                        width: this.imageConfig.width + 'px',
                    }),
                    target: '_blank',
                    title: title,
                }
            );

            html += `<span class="stream-title">${title}</span>`;

            if (this.item.photo_url) {
                html += this.createTag(
                    'img',
                    {
                        alt: title,
                        src: this.item.photo_url,
                    }
                );
            }

            return html + '</a>';
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
