import { IStreamConfiguration, IStreamItem } from "./interface";
import { StreamSquare } from "./square";
import { StreamUtility } from "./utility";

export interface IStreamSquareClusterConfiguration {
    alignment: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    columnBottom: number;
    columnLeft: number;
    columnRight: number;
    columnTop: number;
}

export class StreamSquareCluster {
    private squares: StreamSquare[] = [];
    private sizeMax: number;
    private sizeMin: number;

    constructor(
        columnWidth: number,
        private streamConfig: IStreamConfiguration
    ) {
        this.sizeMax = columnWidth * streamConfig.secondarySquareSizeMax;
        this.sizeMin = columnWidth * streamConfig.secondarySquareSizeMin;
    }

    /**
     * @description Adds the specified stream item to the square cluster
     * @param {IStreamItem} item
     * @returns {boolean}
     */
    public addItem(item: IStreamItem): boolean {
        this.squares.push(
            new StreamSquare(
                StreamUtility.getRandomInteger(this.sizeMin, this.sizeMax),
                item,
                this.streamConfig
            )
        );

        return true;
    }

    /**
     * @description Returns the image HTML
     * @returns {string}
     */
    public generateHtml(config: IStreamSquareClusterConfiguration): string {
        const isLeft = config.alignment.substr(-4) === "left";
        const isTop = config.alignment.substr(0, 3) === "top";

        let html = "";
        let left = isLeft ? config.columnLeft : config.columnRight;
        let top = isTop ? config.columnTop : config.columnBottom;

        let isHorizontal = false;
        let positionLeft = left;
        let positionTop = top;

        this.squares.sort((a, b) => {
            return b.size - a.size;
        });

        this.squares.forEach((square, i) => {
            if (i === 0) {
                left += (isLeft ? 1 : -1) * square.size;
                top += (isTop ? -1 : 1) * square.size;
            } else if (isHorizontal) {
                positionLeft = left;
                positionTop = isTop ? config.columnTop : config.columnBottom;

                left += (isLeft ? 1 : -1) * square.size;
            } else {
                positionLeft = isLeft ? config.columnLeft : config.columnRight;
                positionTop = top;

                top += (isTop ? -1 : 1) * square.size;
            }

            if (!isLeft) {
                positionLeft -= square.size;
            }

            if (!isTop) {
                positionTop += square.size;
            }

            html += square.generateHtml(positionLeft, positionTop);

            isHorizontal = !isHorizontal;
        });

        return html;
    }
}
