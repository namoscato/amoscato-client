/// <reference path="./utility.ts" />

namespace Amo.Client {

    export class StreamSquare {
        private color: string;

        constructor(
            public size: number,
            private item: IStreamItem,
            streamConfig: IStreamConfiguration) {
            this.color = StreamUtility.getRandomColor(
                (<any> streamConfig.typeColorMap)[item.type],
                streamConfig.colorBrightnessMin,
                streamConfig.colorBrightnessMax
            );
        }

        /**
         * @description Generates the square cluster HTML
         * @param {number} left
         * @param {number} top
         * @returns {string}
         */
        public generateHtml(left: number, top: number): string {
            return StreamUtility.createTag(
                'a',
                {
                    class: 'stream-item stream-item-text',
                    href: this.item.url,
                    style: StreamUtility.createStyleAttribute({
                        'background-color': this.color,
                        height: this.size + 'px',
                        left: left + 'px',
                        top: top - this.size + 'px',
                        width: this.size + 'px',
                    }),
                    target: '_blank',
                    title: this.item.title.replace(/"/g, '&quot;'),
                }
            );
        }
    }
}
