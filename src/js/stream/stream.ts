import StreamColumn from "./column";
import { IStreamConfiguration, IStreamItem } from "./interface";
import { StreamUtility } from "./utility";

const alignmentOptions = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
];

export class Stream {
    constructor(
        private items: IStreamItem[],
        private config: IStreamConfiguration
    ) {
        config.secondarySourceTypes.forEach((type) => {
            config.secondarySourceTypeMap[type] = true;
        });
    }

    /**
     * @description Returns the HTML for the initialized stream items
     * @returns {string}
     */
    public generateHtml(): string {
        let left = 0;
        let html = "";
        let item: IStreamItem;

        let column = this.createColumn(left);

        for (item of this.items) {
            if (column.addItem(item)) {
                continue;
            }

            html += column.generateHtml(
                (alignmentOptions as any)[StreamUtility.getRandomInteger(0, 3)]
            );
            left += column.getWidth();

            if (left > this.config.windowWidth) {
                break;
            }

            column = this.createColumn(left, item);
        }

        return html;
    }

    /**
     * @description Creates a column with the specified left offset
     * @param {number} left
     * @param {IStreamItem} [item]
     * @returns {StreamColumn}
     */
    private createColumn(left: number, item?: IStreamItem): StreamColumn {
        return new StreamColumn(left, this.config, item);
    }
}
