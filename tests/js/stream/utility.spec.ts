describe('StreamUtility', () => {
    let result: any;
    let target: Amo.Client.StreamUtility;

    let getColorSpy: any;
    let getColorLightnessSpy: any;

    beforeEach(() => {
        target = Amo.Client.StreamUtility;

        spyOn(target, 'getRandomFloat');
        target.getRandomFloat.and.returnValue(1);

        spyOn(target, 'getColor');
        getColorSpy = jasmine.createSpyObj('streamUtility.getColor', ['lightness']);
        target.getColor.and.returnValue(getColorSpy);

        getColorLightnessSpy = jasmine.createSpyObj('streamUtility.getColor.lightness', ['hex']);
        getColorLightnessSpy.hex.and.returnValue('color hex');
        getColorSpy.lightness.and.returnValue(getColorLightnessSpy);
    });

    /**
     * createTag
     */

    describe('When creating an image tag', () => {
        beforeEach(() => {
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
            result = target.createStyleAttribute({
                key1: 'val1',
                key2: 'val2',
            });
        });

        it('should return style attribute', () => {
            expect(result).toEqual('key1:val1;key2:val2;');
        });
    });

    /**
     * getRandomColor
     */

    describe('When getting a random color', () => {
        beforeEach(() => {
            result = target.getRandomColor('#color', 1, 2);
        });

        it('should generate random color', () => {
            expect(target.getRandomFloat).toHaveBeenCalledWith(1, 2);
            expect(target.getColor).toHaveBeenCalledWith('#color');
            expect(getColorSpy.lightness).toHaveBeenCalledWith(1, true);
            expect(result).toEqual('color hex');
        });
    });
});
