describe('StreamSquare', () => {
    let result: any;
    let target: Amo.Client.StreamSquare;

    let streamUtilitySpy: Amo.Client.StreamUtility;

    beforeEach(() => {
        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'createStyleAttribute');
        streamUtilitySpy.createStyleAttribute.and.returnValue('STYLE');

        spyOn(streamUtilitySpy, 'createTag');
        streamUtilitySpy.createTag.and.returnValue('<a>');

        spyOn(streamUtilitySpy, 'getRandomColor');
        streamUtilitySpy.getRandomColor.and.returnValue('color hex');

        target = new Amo.Client.StreamSquare(
            5,
            {
                title: 'TITLE',
                type: 'TYPE',
                url: 'URL',
            },
            {
                colorBrightnessMax: 2,
                colorBrightnessMin: 1,
                typeColorMap: {
                    TYPE: '#color',
                },
            },
        );
    });

    describe('When creating a square', () => {
        it('should generate random color', () => {
            expect(streamUtilitySpy.getRandomColor).toHaveBeenCalledWith('#color', 1, 2);
            expect(target.color).toEqual('color hex');
        });
    });

    /**
     * generateHtml
     */

    describe('When generating the HTML', () => {
        beforeEach(() => {
            result = target.generateHtml(10, 20);
        });

        it('should create style attribute', () => {
            expect(streamUtilitySpy.createStyleAttribute).toHaveBeenCalledWith({
                'background-color': 'color hex',
                'height': '5px',
                'left': '10px',
                'top': '15px',
                'width': '5px',
            });
        });

        it('should create hyperlink tag', () => {
            expect(streamUtilitySpy.createTag).toHaveBeenCalledWith(
                'a',
                {
                    class: 'stream-item stream-item-text',
                    href: 'URL',
                    style: 'STYLE',
                    target: '_blank',
                    title: 'TITLE',
                },
            );
        });

        it('should return tag HTML', () => {
            expect(result).toEqual('<a>');
        });
    });
});
