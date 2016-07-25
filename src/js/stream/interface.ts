namespace Amo.Client {
    export interface ICoordinateFunction {
        (x: number): number;
    }

    export interface IStreamConfiguration {
        colorMax: number;
        colorMin: number;
        getColumnHeightMax: ICoordinateFunction;
        getColumnHeightMin: ICoordinateFunction;
        getOffset: ICoordinateFunction;
        photoWidthMax: number;
        photoWidthMin: number;
        windowWidth?: number;
    }

    export interface IStreamItem {
        photo_height: number;
        photo_url: string;
        photo_width: number;
        title: string;
        url: string;
    }
}
