import { StreamUtility } from "./utility";

describe("StreamUtility", () => {
    let result: any;
    let target: StreamUtility;

    let getColorSpy: any;
    let getColorLightnessSpy: any;

    beforeEach(() => {
        target = StreamUtility;

        spyOn(target as any, "getRandomFloat");
        (target as any).getRandomFloat.and.returnValue(1);

        spyOn(target as any, "getColor");
        getColorSpy = jasmine.createSpyObj("streamUtility.getColor", [
            "lightness",
        ]);
        (target as any).getColor.and.returnValue(getColorSpy);

        getColorLightnessSpy = jasmine.createSpyObj(
            "streamUtility.getColor.lightness",
            ["hex"]
        );
        getColorLightnessSpy.hex.and.returnValue("color hex");
        getColorSpy.lightness.and.returnValue(getColorLightnessSpy);
    });

    /**
     * createTag
     */

    describe("When creating an image tag", () => {
        beforeEach(() => {
            result = StreamUtility.createTag("img", {
                attr1: "value1",
                attr2: "value2",
                attr3: null,
            });
        });

        it("should return image tag", () => {
            expect(result).toEqual('<img attr1="value1" attr2="value2">');
        });
    });

    /**
     * createStyleAttribute
     */

    describe("When creating a style attribute", () => {
        beforeEach(() => {
            result = StreamUtility.createStyleAttribute({
                key1: "val1",
                key2: "val2",
            });
        });

        it("should return style attribute", () => {
            expect(result).toEqual("key1:val1;key2:val2;");
        });
    });

    /**
     * getRandomColor
     */

    describe("When getting a random color", () => {
        beforeEach(() => {
            result = StreamUtility.getRandomColor("#color", 1, 2);
        });

        it("should generate random color", () => {
            expect(StreamUtility.getRandomFloat).toHaveBeenCalledWith(1, 2);
            expect(StreamUtility.getColor).toHaveBeenCalledWith("#color");
            expect(getColorSpy.lightness).toHaveBeenCalledWith(1, true);
            expect(result).toEqual("color hex");
        });
    });
});
