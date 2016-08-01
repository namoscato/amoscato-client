namespace Amo.Client {
    export interface ICoordinateFunction {
        (x: number): number;
    }

    export interface IStreamConfiguration {
        colorBrightnessMax: number;
        colorBrightnessMin: number;
        getColumnHeightMax: ICoordinateFunction;
        getColumnHeightMin: ICoordinateFunction;
        getOffset: ICoordinateFunction;
        photoWidthMax: number;
        photoWidthMin: number;
        typeColorMap: Object;
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
}
