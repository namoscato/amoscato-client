export type ICoordinateFunction = (x: number) => number;

interface ISecondarySourceTypeMap {
    [key: string]: boolean;
}

export interface IStreamConfiguration {
    colorBrightnessMax: number;
    colorBrightnessMin: number;
    getColumnHeightMax: ICoordinateFunction;
    getColumnHeightMin: ICoordinateFunction;
    getOffset: ICoordinateFunction;
    photoWidthMax: number;
    photoWidthMin: number;
    secondarySourceTypes: string[];
    secondarySourceTypeMap: ISecondarySourceTypeMap;
    secondarySquareSizeMax: number;
    secondarySquareSizeMin: number;
    typeColorMap: Record<string, string>;
    windowWidth: number;
}

export interface IStreamItem {
    photo_height: number;
    photo_url: string;
    photo_width: number;
    title: string;
    type: string;
    url: string;
}
