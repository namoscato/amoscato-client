import StreamImage, { IImageConfiguration } from "../image";
import { IStreamItem } from "../interface";
import { StreamUtility } from "../utility";

describe("StreamImage", () => {
    let target: StreamImage;

    let image: any;
    let streamUtilitySpy: StreamUtility;

    beforeEach(() => {
        streamUtilitySpy = StreamUtility;

        jest.spyOn(
            streamUtilitySpy as any,
            "getRandomColor"
        ).mockImplementation();
        (streamUtilitySpy as any).getRandomColor.mockReturnValue("color hex");

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
            } as any
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
});
