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
            config: IStreamConfiguration) {
            const height = item.photo_url ? item.photo_height : imageConfig.width;
            const width = item.photo_url ? item.photo_width : imageConfig.width;

            this.color = StreamUtility.getRandomColor((config.typeColorMap as any)[item.type], config.colorBrightnessMin, config.colorBrightnessMax);
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

            let html = StreamUtility.createTag(
                'a',
                {
                    class: 'stream-item stream-item-' + (this.item.photo_url ? 'photo' : 'text'),
                    href: this.item.url,
                    style: StreamUtility.createStyleAttribute({
                        'background-color': this.color,
                        'font-size': this.imageConfig.width * 0.15 + 'px',
                        'height': this.height + 'px',
                        'left': this.imageConfig.left + 'px',
                        'top': this.imageConfig.top + 'px',
                        'width': this.imageConfig.width + 'px',
                    }),
                    target: '_blank',
                    title,
                },
            );

            html += `<span class="stream-title">${title}</span>`;

            if (this.item.photo_url) {
                html += StreamUtility.createTag(
                    'img',
                    {
                        src: this.item.photo_url,
                    },
                );
            }

            return html + '</a>';
        }
    }
}
