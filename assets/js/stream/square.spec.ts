import { IStreamConfiguration, IStreamItem } from "./interface";
import { StreamSquare } from "./square";
import { StreamUtility } from "./utility";

describe("StreamSquare", () => {
    let result: any;
    let target: StreamSquare;

    let streamUtilitySpy: any;

    beforeEach(() => {
        streamUtilitySpy = StreamUtility;

        spyOn(streamUtilitySpy, "createStyleAttribute");
        streamUtilitySpy.createStyleAttribute.and.returnValue("STYLE");

        spyOn(streamUtilitySpy, "createTag");
        streamUtilitySpy.createTag.and.returnValue("<a>");

        spyOn(streamUtilitySpy, "getRandomColor");
        streamUtilitySpy.getRandomColor.and.returnValue("color hex");

        target = new StreamSquare(
            5,
            {
                title: "TITLE",
                type: "TYPE",
                url: "URL",
            } as IStreamItem,
            {
                colorBrightnessMax: 2,
                colorBrightnessMin: 1,
                typeColorMap: {
                    TYPE: "#color",
                },
            } as IStreamConfiguration
        );
    });

    describe("When creating a square", () => {
        it("should generate random color", () => {
            expect(streamUtilitySpy.getRandomColor).toHaveBeenCalledWith(
                "#color",
                1,
                2
            );
            expect((target as any).color).toEqual("color hex");
        });
    });

    /**
     * generateHtml
     */

    describe("When generating the HTML", () => {
        describe("with a title", () => {
            beforeEach(() => {
                result = target.generateHtml(10, 20);
            });

            it("should create style attribute", () => {
                expect(
                    streamUtilitySpy.createStyleAttribute
                ).toHaveBeenCalledWith({
                    "background-color": "color hex",
                    height: "5px",
                    left: "10px",
                    top: "15px",
                    width: "5px",
                });
            });

            it("should create hyperlink tag", () => {
                expect(streamUtilitySpy.createTag).toHaveBeenCalledWith("a", {
                    class: "stream-item stream-item-text",
                    href: "URL",
                    style: "STYLE",
                    target: "_blank",
                    title: "TITLE",
                });
            });

            it("should return tag HTML", () => {
                expect(result).toEqual("<a>");
            });
        });

        describe("without a title", () => {
            beforeEach(() => {
                (target as any).item.title = null;

                result = target.generateHtml(10, 20);
            });

            it("should create hyperlink tag", () => {
                expect(streamUtilitySpy.createTag).toHaveBeenCalledWith(
                    "a",
                    jasmine.objectContaining({ title: null })
                );
            });
        });
    });
});
