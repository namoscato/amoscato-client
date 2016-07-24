describe('StreamUtility', () => {
    let result;
    let target;

    beforeEach(() => {
        target = Amo.Client.StreamUtility;
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

    /**
     * getImageHeight
     */

    describe('When getting the image height', () => {
        beforeEach(() => {
            result = target.getImageHeight(
                {
                    height: 100,
                    width: 50,
                },
                20
            );
        });

        it('should return height', () => {
            expect(result).toEqual(40);
        });
    });
});
