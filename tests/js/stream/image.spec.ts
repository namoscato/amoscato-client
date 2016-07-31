describe('StreamImage', () => {
    let result: any;
    let target: Amo.Client.StreamImage;

    let image: Object;
    let streamUtilitySpy: Amo.Client.StreamUtility;
    let streamUtilityGetColorSpy: any;
    let streamUtilityGetColorLightnessSpy: any;

    beforeEach(() => {
        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'getRandomFloat');
        streamUtilitySpy.getRandomFloat.and.returnValue(1);

        spyOn(streamUtilitySpy, 'getColor');
        streamUtilityGetColorSpy = jasmine.createSpyObj('streamUtility.getColor', ['lightness']);
        streamUtilitySpy.getColor.and.returnValue(streamUtilityGetColorSpy);

        streamUtilityGetColorLightnessSpy = jasmine.createSpyObj('streamUtility.getColor.lightness', ['hex']);
        streamUtilityGetColorLightnessSpy.hex.and.returnValue('color hex');
        streamUtilityGetColorSpy.lightness.and.returnValue(streamUtilityGetColorLightnessSpy);

        image = {
            photo_height: 100,
            photo_width: 50,
            type: 'TYPE',
        };
    });

    const construct = () => {
        target = new Amo.Client.StreamImage(
            image,
            {
                width: 3,
            },
            {
                colorBrightnessMax: 2,
                colorBrightnessMin: 1,
                typeColorMap: {
                    TYPE: '#color',
                },
            },
        );
    };

    describe('When creating an image', () => {
        describe('with a photo URL', () => {
            beforeEach(() => {
                image.photo_url = 'URL';

                construct();
            });

            it('should generate random color', () => {
                expect(streamUtilitySpy.getRandomFloat).toHaveBeenCalledWith(1, 2);
                expect(streamUtilitySpy.getColor).toHaveBeenCalledWith('#color');
                expect(streamUtilityGetColorSpy.lightness).toHaveBeenCalledWith(1, true);
                expect(target.color).toEqual('color hex');
            });

            it('should compute image height', () => {
                expect(target.height).toEqual(6);
            });
        });

        describe('without a photo URL', () => {
            beforeEach(() => {
                construct();
            });

            it('should compute image height', () => {
                expect(target.height).toEqual(3);
            });
        });
    });

    /**
     * getHtml
     */

    describe('When getting the HTML', () => {
        beforeEach(() => {
            spyOn(target, 'createTag');
            target.createTag.and.returnValues(
                '<a>',
                '<img>'
            );
        });

        describe('with a photo URL', () => {
            beforeEach(() => {
                target.item = {
                    photo_url: 'PHOTO URL',
                    title: 'TITLE',
                    url: 'URL',
                };

                target.color = 'COLOR';
                target.height = 1;
                target.imageConfig = {
                    left: 2,
                    top: 3,
                    width: 4,
                };

                spyOn(target, 'createStyleAttribute');
                target.createStyleAttribute.and.returnValue('STYLE');

                result = target.getHtml();
            });

            it('should create hyperlink tag', () => {
                expect(target.createTag).toHaveBeenCalledWith(
                    'a',
                    {
                        class: 'stream-item stream-item-photo',
                        href: 'URL',
                        style: 'STYLE',
                        target: '_blank',
                        title: 'TITLE',
                    }
                );
            });

            it('should create style attrbute', () => {
                expect(target.createStyleAttribute).toHaveBeenCalledWith({
                    'background-color': 'COLOR',
                    'font-size': '0.6px',
                    height: '1px',
                    left: '2px',
                    top: '3px',
                    width: '4px',
                });
            });

            it('should create image tag', () => {
                expect(target.createTag).toHaveBeenCalledWith(
                    'img',
                    {
                        alt: 'TITLE',
                        src: 'PHOTO URL',
                    }
                );
            });

            it('should return HTML', () => {
                expect(result).toEqual('<a><span class="stream-title">TITLE</span><img></a>');
            });
        });

        describe('without a photo URL', () => {
            beforeEach(() => {
                target.item = {
                    title: 'TITLE',
                };

                result = target.getHtml();
            });

            it('should create hyperlink tag', () => {
                expect(target.createTag).toHaveBeenCalledWith(
                    'a',
                    jasmine.objectContaining({
                        class: 'stream-item stream-item-text',
                    })
                );
            });

            it('should return HTML', () => {
                expect(result).toEqual('<a><span class="stream-title">TITLE</span></a>');
            });
        });
    });

    /**
     * createTag
     */

    describe('When creating an image tag', () => {
        beforeEach(() => {
            construct();

            result = target.createTag(
                'img',
                {
                    attr1: 'value1',
                    attr2: 'value2',
                }
            );
        });

        it('should return image tag', () => {
            expect(result).toEqual('<img attr1="value1" attr2="value2">');
        });
    });

    /**
     * createStyleAttribute
     */

    describe('When creating a style attribute', () => {
        beforeEach(() => {
            construct();

            result = target.createStyleAttribute({
                key1: 'val1',
                key2: 'val2',
            });
        });

        it('should return style attribute', () => {
            expect(result).toEqual('key1:val1;key2:val2;');
        });
    });
});
