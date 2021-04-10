import StreamColumn from "./column";
import { Stream } from "./stream";

describe("Stream", () => {
    let result: any;
    let target: Stream;

    let column1Spy: StreamColumn;
    let column2Spy: StreamColumn;

    const createColumnSpy = (identifier: number) => {
        const spy = jasmine.createSpyObj(`StreamColumn${identifier}`, [
            "addItem",
            "generateHtml",
            "getWidth",
        ]);

        spy.generateHtml.and.returnValue(`c${identifier}`);

        return spy;
    };

    beforeEach(() => {
        target = new Stream(
            [
                "p1" as any,
                "p2" as any,
                "p3" as any,
                "p4" as any,
                "p5" as any,
                "p6" as any,
            ],
            {
                secondarySourceTypes: [],
                windowWidth: 100,
            } as any
        );

        column1Spy = createColumnSpy(1);

        (column1Spy.addItem as jasmine.Spy).and.returnValues(true, true, false);

        (column1Spy.getWidth as jasmine.Spy).and.returnValue(50);

        column2Spy = createColumnSpy(2);

        (column2Spy.addItem as jasmine.Spy).and.returnValues(true, false);

        (column2Spy.getWidth as jasmine.Spy).and.returnValue(51);

        spyOn(target as any, "createColumn");
        ((target as any).createColumn as jasmine.Spy).and.returnValues(
            column1Spy,
            column2Spy
        );
    });

    describe("When generating the HTML", () => {
        beforeEach(() => {
            result = target.generateHtml();
        });

        it("should create columns", () => {
            expect((target as any).createColumn).toHaveBeenCalledWith(0);
            expect((target as any).createColumn).toHaveBeenCalledWith(50, "p3");
        });

        it("should add photos to columns", () => {
            expect(
                (column1Spy.addItem as jasmine.Spy).calls.allArgs()
            ).toEqual([["p1"], ["p2"], ["p3"]]);
            expect(
                (column2Spy.addItem as jasmine.Spy).calls.allArgs()
            ).toEqual([["p4"], ["p5"]]);
        });

        it("should generate HTML", () => {
            expect(result).toEqual("c1c2");
        });
    });
});
