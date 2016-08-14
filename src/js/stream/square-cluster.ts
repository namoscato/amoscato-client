/// <reference path="./utility.ts" />

namespace Amo.Client {

    interface IStreamSquareClusterConfiguration {
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
            columnWidth: number,
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

            let positionLeft = left;
            let positionTop = top;

            this.squares.sort((a, b) => {
                return b.size - a.size;
            });

            this.isHorizontal = false;

            this.squares.forEach((square, i) => {
                if (i === 0) {
                    left += (isLeft ? 1 : -1) * square.size;
                    top += (isTop ? -1 : 1 ) * square.size;
                } else if (this.isHorizontal) {
                    positionLeft = left;
                    positionTop = isTop ? config.columnTop : config.columnBottom;

                    left += (isLeft ? 1 : -1) * square.size;
                } else {
                    positionLeft = isLeft ? config.columnLeft : config.columnRight;
                    positionTop = top;

                    top += (isTop ? -1 : 1 ) * square.size;
                }

                if (!isLeft) {
                    positionLeft -= square.size;
                }

                if (!isTop) {
                    positionTop += square.size;
                }

                html += square.generateHtml(positionLeft, positionTop);

                this.isHorizontal = !this.isHorizontal;
            });

            return html;
        }
    }
}
