/// <reference path="./utility.ts" />

namespace Amo.Client {

    interface ICurrent {
        color?: number;
        columnHeight?: number;
        columnHeightMax?: number;
        columnWidth?: number;
        imageHeight?: number;
        left: number;
        offset?: number;
        photo?: IStreamPhoto;
        rowIndex: number;
        top?: number;
        xCoordinate?: number;
    }

    interface ICoordinateFunction {
        (x: number): number;
    }

    interface IStreamConfiguration {
        colorMax: number;
        colorMin: number;
        columnHeightMaxFunction: ICoordinateFunction;
        columnHeightMinFunction: ICoordinateFunction;
        offsetFunction: ICoordinateFunction;
        photoWidthMax: number;
        photoWidthMin: number;
    }

    export class Stream {
        private windowWidth: number;

        constructor(
            private photos: Array<IStreamPhoto>,
            private config: IStreamConfiguration) {
            this.windowWidth = $(window).width();
        }

        /**
         * @description Generates the HTML for the initialized photos
         * @returns {string}
         */
        public generateHtml(): string {
            const current: ICurrent = {
                left: 0,
                rowIndex: 0,
            };
            let html = '';
            let potentialHeight: number;

            for (current.photo of this.photos) {
                if (current.left + current.columnWidth > this.windowWidth) {
                    break;
                }

                potentialHeight = current.top + StreamUtility.getImageHeight(current.photo, current.columnWidth);

                if (typeof current.columnHeight !== 'undefined' && potentialHeight > current.columnHeight - current.offset) {
                    current.left += current.columnWidth;
                    current.rowIndex = 0;
                }

                if (++current.rowIndex === 1) {
                    current.xCoordinate = current.left - this.windowWidth / 2;

                    current.columnHeightMax = this.config.columnHeightMaxFunction(current.xCoordinate);

                    current.columnHeight = StreamUtility.getRandomNumber(
                        this.config.columnHeightMinFunction(current.xCoordinate),
                        current.columnHeightMax
                    );

                    current.columnWidth = StreamUtility.getRandomNumber(this.config.photoWidthMin, this.config.photoWidthMax);

                    current.offset = this.config.offsetFunction(current.xCoordinate);

                    current.top = StreamUtility.getRandomNumber(
                        -current.offset,
                        current.columnHeightMax - current.columnHeight - current.offset
                    );
                }

                current.color = StreamUtility.getRandomNumber(this.config.colorMin, this.config.colorMax);
                current.imageHeight = StreamUtility.getImageHeight(current.photo, current.columnWidth);

                html += StreamUtility.createImageTag({
                    alt: current.photo.title,
                    src: current.photo.url,
                    style: StreamUtility.createStyleAttribute({
                        'background-color': 'rgb(' + current.color + ',' + current.color + ',' + current.color + ')',
                        height: current.imageHeight + 'px',
                        left: current.left + 'px',
                        top: current.top + 'px',
                        width: current.columnWidth + 'px',
                    }),
                });

                current.top += current.imageHeight;
            }

            return html;
        }
    }
}
