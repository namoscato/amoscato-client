namespace Amo.Client {
    export interface ICoordinateFunction {
        (x: number): number;
    }

    export interface IStreamConfiguration {
        colorMax: number;
        colorMin: number;
        columnHeightMaxFunction: ICoordinateFunction;
        columnHeightMinFunction: ICoordinateFunction;
        offsetFunction: ICoordinateFunction;
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
