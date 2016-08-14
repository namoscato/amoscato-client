/// <reference path="./utility.ts" />

namespace Amo.Client {

    export interface IStreamSquareClusterConfiguration {
        alignment: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
        columnBottom: number;
        columnLeft: number;
        columnRight: number;
        columnTop: number;
    }

    export class StreamSquareCluster {
        private isHorizontal: boolean;
        private squares: Array<StreamSquare> = [];
        private sizeMax: number;
        private sizeMin: number;

        constructor(
            private columnWidth: number,
            private streamConfig: IStreamConfiguration) {
            this.sizeMax = columnWidth * streamConfig.secondarySquareSizeMax;
            this.sizeMin = columnWidth * streamConfig.secondarySquareSizeMin;
        }

        public addItem(item: IStreamItem) {
            this.squares.push(
                new StreamSquare(
                    StreamUtility.getRandomInteger(this.sizeMin, this.sizeMax),
                    item,
                    this.streamConfig
                )
            );
        }

        /**
         * @description Returns the image HTML
         * @returns {string}
         */
        public generateHtml(config: IStreamSquareClusterConfiguration): string {
            const isLeft = config.alignment.substr(-4) === 'left';
            const isTop = config.alignment.substr(0, 3) === 'top';

            let html = '';
            let left = isLeft ? config.columnLeft : config.columnRight;
            let top = isTop ? config.columnTop : config.columnBottom;

            const position = {
                left: left,
                top: top,
            };

            this.squares.sort((a, b) => {
                return b.size - a.size;
            });

            this.isHorizontal = false;

            this.squares.forEach((square, i) => {
                if (i === 0) {
                    left += (isLeft ? 1 : -1) * square.size;
                    top += (isTop ? -1 : 1 ) * square.size;
                } else if (this.isHorizontal) {
                    position.left = left;
                    position.top = isTop ? config.columnTop : config.columnBottom;

                    left += (isLeft ? 1 : -1) * square.size;
                } else {
                    position.left = isLeft ? config.columnLeft : config.columnRight;
                    position.top = top;

                    top += (isTop ? -1 : 1 ) * square.size;
                }

                if (!isLeft) {
                    position.left -= square.size;
                }

                if (!isTop) {
                    position.top += square.size;
                }

                html += square.generateHtml(position);

                this.isHorizontal = !this.isHorizontal;
            });

            return html;
        }
    }
}
