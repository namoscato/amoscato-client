import StreamImage, { IImageConfiguration } from "./image";
import { IStreamConfiguration, IStreamItem } from "./interface";
import { StreamUtility } from "./utility";

describe("StreamImage", () => {
    let result: any;
    let target: StreamImage;

    let image: any;
    let streamUtilitySpy: StreamUtility;

    beforeEach(() => {
        streamUtilitySpy = StreamUtility;

        spyOn(streamUtilitySpy as any, "createStyleAttribute");
        (streamUtilitySpy as any).createStyleAttribute.and.returnValue("STYLE");

        spyOn(streamUtilitySpy as any, "createTag");
        (streamUtilitySpy as any).createTag.and.returnValues("<a>", "<img>");

        spyOn(streamUtilitySpy as any, "getRandomColor");
        (streamUtilitySpy as any).getRandomColor.and.returnValue("color hex");

        image = {
            photo_height: 100,
            photo_width: 50,
            type: "TYPE",
        };
    });

    const construct = () => {
        target = new StreamImage(
            image as IStreamItem,
            {
                width: 3,
            } as IImageConfiguration,
            {
                colorBrightnessMax: 2,
                colorBrightnessMin: 1,
                typeColorMap: {
                    TYPE: "#color",
                },
            } as IStreamConfiguration
        );
    };

    describe("When creating an image", () => {
        describe("with a photo URL", () => {
            beforeEach(() => {
                image.photo_url = "URL";

                construct();
            });

            it("should generate random color", () => {
                expect(
                    (streamUtilitySpy as any).getRandomColor
                ).toHaveBeenCalledWith("#color", 1, 2);
                expect((target as any).color).toEqual("color hex");
            });

            it("should compute image height", () => {
                expect((target as any).height).toEqual(6);
            });
        });

        describe("without a photo URL", () => {
            beforeEach(() => {
                construct();
            });

            it("should compute image height", () => {
                expect((target as any).height).toEqual(3);
            });
        });
    });

    /**
     * getHtml
     */

    describe("When getting the HTML", () => {
        beforeEach(() => {
            construct();
        });

        describe("with a photo URL", () => {
            beforeEach(() => {
                (target as any).item = {
                    photo_url: "PHOTO URL",
                    title: "TITLE",
                    url: "URL",
                };

                (target as any).color = "COLOR";
                (target as any).height = 1;
                (target as any).imageConfig = {
                    left: 2,
                    top: 3,
                    width: 4,
                };

                result = target.getHtml();
            });

            it("should create hyperlink tag", () => {
                expect(
                    (streamUtilitySpy as any).createTag
                ).toHaveBeenCalledWith("a", {
                    class: "stream-item stream-item-photo",
                    href: "URL",
                    style: "STYLE",
                    target: "_blank",
                    title: "TITLE",
                });
            });

            it("should create style attrbute", () => {
                expect(
                    (streamUtilitySpy as any).createStyleAttribute
                ).toHaveBeenCalledWith({
                    "background-color": "COLOR",
                    "font-size": "0.6px",
                    height: "1px",
                    left: "2px",
                    top: "3px",
                    width: "4px",
                });
            });

            it("should create image tag", () => {
                expect(
                    (streamUtilitySpy as any).createTag
                ).toHaveBeenCalledWith("img", {
                    src: "PHOTO URL",
                });
            });

            it("should return HTML", () => {
                expect(result).toEqual(
                    '<a><span class="stream-title">TITLE</span><img></a>'
                );
            });
        });

        describe("without a photo URL", () => {
            beforeEach(() => {
                (target as any).item = {
                    title: "TITLE",
                };

                result = target.getHtml();
            });

            it("should create hyperlink tag", () => {
                expect(
                    (streamUtilitySpy as any).createTag
                ).toHaveBeenCalledWith(
                    "a",
                    jasmine.objectContaining({
                        class: "stream-item stream-item-text",
                    })
                );
            });

            it("should return HTML", () => {
                expect(result).toEqual(
                    '<a><span class="stream-title">TITLE</span></a>'
                );
            });
        });

        describe("without a title", () => {
            beforeEach(() => {
                (target as any).item = {
                    title: null,
                };

                result = target.getHtml();
            });

            it("should return HTML", () => {
                expect(result).toEqual("<a></a>");
            });
        });
    });
});
