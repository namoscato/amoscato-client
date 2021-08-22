import StreamImage from "./image";
import { IStreamConfiguration, IStreamItem } from "./interface";
import { StreamSquareCluster } from "./square-cluster";
import { StreamUtility } from "./utility";

export default class StreamColumn {
    private bottom: number;
    private height: number;
    private width: number;
    private html = "";
    private offset: number;
    private squareCluster: StreamSquareCluster;
    private top: number;

    constructor(
        private left: number,
        private streamConfig: IStreamConfiguration,
        item?: IStreamItem
    ) {
        const xCoordinate = left - streamConfig.windowWidth / 2;
        const heightMax = streamConfig.getColumnHeightMax(xCoordinate);

        this.width = StreamUtility.getRandomInteger(
            streamConfig.photoWidthMin,
            streamConfig.photoWidthMax
        );
        this.height = StreamUtility.getRandomInteger(
            streamConfig.getColumnHeightMin(xCoordinate),
            heightMax
        );

        this.offset = streamConfig.getOffset(xCoordinate);
        this.top = StreamUtility.getRandomInteger(
            this.offset,
            heightMax - this.height + this.offset
        );
        this.bottom = this.top;

        this.squareCluster = new StreamSquareCluster(
            this.getWidth(),
            this.streamConfig
        );

        if (item) {
            this.addItem(item);
        }
    }

    /**
     * @description Adds the specified item to the stream column
     * @param {IStreamItem} item
     * @returns {boolean} Whether or not the item could be added
     */
    public addItem(item: IStreamItem): boolean {
        if (
            typeof this.streamConfig.secondarySourceTypeMap[item.type] !==
            "undefined"
        ) {
            return this.squareCluster.addItem(item);
        }

        const image = new StreamImage(
            item,
            {
                left: this.left,
                top: this.bottom,
                width: this.width,
            },
            this.streamConfig
        );

        if (this.bottom + image.getHeight() > this.height + this.offset) {
            return false;
        }

        this.html += image.getHtml();
        this.bottom += image.getHeight();

        return true;
    }

    /**
     * @description Generates the column HTML
     * @param {string} squareClusterAlignment
     * @returns {string}
     */
    public generateHtml(
        squareClusterAlignment:
            | "top-left"
            | "top-right"
            | "bottom-left"
            | "bottom-right"
    ): string {
        return (
            this.html +
            this.squareCluster.generateHtml({
                alignment: squareClusterAlignment,
                columnBottom: this.bottom,
                columnLeft: this.left,
                columnRight: this.left + this.getWidth(),
                columnTop: this.top,
            })
        );
    }

    /**
     * @description Returns the column width
     * @returns {number}
     */
    public getWidth(): number {
        return this.width;
    }
}
