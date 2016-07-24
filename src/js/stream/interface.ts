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

    export interface IStreamFlickrPhoto {
        height: number;
        title: string;
        url: string;
        width: number;
    }
}
