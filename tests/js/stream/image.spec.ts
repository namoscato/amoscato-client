describe('StreamImage', () => {
    let result: any;
    let target: Amo.Client.StreamImage;

    let streamUtilitySpy: Amo.Client.StreamUtility;

    beforeEach(() => {
        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'getRandomNumber');
        streamUtilitySpy.getRandomNumber.and.returnValue(1);

        target = new Amo.Client.StreamImage(
            {
                photo_height: 100,
                photo_width: 50,
            },
            {
                width: 3,
            },
            {
                colorMax: 2,
                colorMin: 1,
            },
        );
    });

    it('should generate random color', () => {
        expect(streamUtilitySpy.getRandomNumber).toHaveBeenCalledWith(1, 2);
        expect(target.color).toEqual(1);
    });

    it('should compute image height', () => {
        expect(target.height).toEqual(6);
    });

    /**
     * getHtml
     */

    describe('When getting the HTML', () => {
        beforeEach(() => {
            target.item = {
                photo_url: 'URL',
                title: 'TITLE',
            };

            target.color = 'C';
            target.height = 1;
            target.imageConfig = {
                left: 2,
                top: 3,
                width: 4,
            };

            spyOn(target, 'createImageTag');
            target.createImageTag.and.returnValue('HTML');

            spyOn(target, 'createStyleAttribute');
            target.createStyleAttribute.and.returnValue('STYLE');

            result = target.getHtml();
        });

        it('should create image tag', () => {
            expect(target.createImageTag).toHaveBeenCalledWith({
                alt: 'TITLE',
                src: 'URL',
                style: 'STYLE',
            });
        });

        it('should create style attrbute', () => {
            expect(target.createStyleAttribute).toHaveBeenCalledWith({
                'background-color': 'rgb(C,C,C)',
                height: '1px',
                left: '2px',
                top: '3px',
                width: '4px',
            });
        });

        it('should return HTML', () => {
            expect(result).toEqual('HTML');
        });
    });

    /**
     * createImageTag
     */

    describe('When creating an image tag', () => {
        beforeEach(() => {
            result = target.createImageTag({
                attr1: 'value1',
                attr2: 'value2',
            });
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
