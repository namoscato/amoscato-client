import { IStreamConfiguration } from "./interface";
import { StreamSquare } from "./square";
import {
    IStreamSquareClusterConfiguration,
    StreamSquareCluster,
} from "./square-cluster";

describe("StreamSquareCluster", () => {
    let result: any;
    let target: StreamSquareCluster;

    let squareSpy1: StreamSquare;
    let squareSpy2: StreamSquare;
    let squareSpy3: StreamSquare;
    let squareSpy4: StreamSquare;
    let squareSpyCount: number;

    const generateSquareSpy = (size: number) => {
        const spy = jasmine.createSpyObj("StreamSquare " + ++squareSpyCount, [
            "generateHtml",
        ]);

        spy.size = size;
        spy.generateHtml.and.returnValue("<s" + squareSpyCount + ">");

        return spy;
    };

    beforeEach(() => {
        squareSpyCount = 0;

        squareSpy1 = generateSquareSpy(10);
        squareSpy2 = generateSquareSpy(20);
        squareSpy3 = generateSquareSpy(30);
        squareSpy4 = generateSquareSpy(40);

        target = new StreamSquareCluster(100, {
            secondarySquareSizeMax: 0.5,
            secondarySquareSizeMin: 0.2,
        } as IStreamConfiguration);

        (target as any).squares = [
            squareSpy2,
            squareSpy1,
            squareSpy4,
            squareSpy3,
        ];
    });

    describe("When creating a square cluster", () => {
        it("should compute size bounds", () => {
            expect((target as any).sizeMax).toEqual(50);
            expect((target as any).sizeMin).toEqual(20);
        });
    });

    /**
     * generateHtml
     */

    describe("When generating HTML", () => {
        describe("for a top left cluster", () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: "top-left",
                    columnLeft: 0,
                    columnTop: 0,
                } as IStreamSquareClusterConfiguration);
            });

            it("should generate the square HTML", () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(0, 0);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(40, 0);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(0, -40);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(70, 0);
            });

            it("should return cluster HTML", () => {
                expect(result).toEqual("<s4><s3><s2><s1>");
            });
        });

        describe("for a top right cluster", () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: "top-right",
                    columnRight: 0,
                    columnTop: 0,
                } as IStreamSquareClusterConfiguration);
            });

            it("should generate the square HTML", () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(-40, 0);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(-70, 0);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(-20, -40);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(-80, 0);
            });
        });

        describe("for a bottom left cluster", () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: "bottom-left",
                    columnBottom: 0,
                    columnLeft: 0,
                } as IStreamSquareClusterConfiguration);
            });

            it("should generate the square HTML", () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(0, 40);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(40, 30);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(0, 60);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(70, 10);
            });
        });

        describe("for a bottom right cluster", () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: "bottom-right",
                    columnBottom: 0,
                    columnRight: 0,
                } as IStreamSquareClusterConfiguration);
            });

            it("should generate the square HTML", () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(-40, 40);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(-70, 30);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(-20, 60);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(-80, 10);
            });
        });
    });
});
