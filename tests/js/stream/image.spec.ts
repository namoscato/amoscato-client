describe('StreamImage', () => {
    let result: any;
    let target: Amo.Client.StreamImage;

    let image: Object;
    let streamUtilitySpy: Amo.Client.StreamUtility;

    beforeEach(() => {
        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'createStyleAttribute');
        streamUtilitySpy.createStyleAttribute.and.returnValue('STYLE');

        spyOn(streamUtilitySpy, 'createTag');
        streamUtilitySpy.createTag.and.returnValues(
            '<a>',
            '<img>',
        );

        spyOn(streamUtilitySpy, 'getRandomColor');
        streamUtilitySpy.getRandomColor.and.returnValue('color hex');

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
                expect(streamUtilitySpy.getRandomColor).toHaveBeenCalledWith('#color', 1, 2);
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

                result = target.getHtml();
            });

            it('should create hyperlink tag', () => {
                expect(streamUtilitySpy.createTag).toHaveBeenCalledWith(
                    'a',
                    {
                        class: 'stream-item stream-item-photo',
                        href: 'URL',
                        style: 'STYLE',
                        target: '_blank',
                        title: 'TITLE',
                    },
                );
            });

            it('should create style attrbute', () => {
                expect(streamUtilitySpy.createStyleAttribute).toHaveBeenCalledWith({
                    'background-color': 'COLOR',
                    'font-size': '0.6px',
                    'height': '1px',
                    'left': '2px',
                    'top': '3px',
                    'width': '4px',
                });
            });

            it('should create image tag', () => {
                expect(streamUtilitySpy.createTag).toHaveBeenCalledWith(
                    'img',
                    {
                        src: 'PHOTO URL',
                    },
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
                expect(streamUtilitySpy.createTag).toHaveBeenCalledWith(
                    'a',
                    jasmine.objectContaining({
                        class: 'stream-item stream-item-text',
                    }),
                );
            });

            it('should return HTML', () => {
                expect(result).toEqual('<a><span class="stream-title">TITLE</span></a>');
            });
        });
    });
});
