describe('Stream', () => {
    let result;
    let target;

    let streamUtilitySpy;

    beforeEach(() => {
        let createImageTagCount = 0;
        let createStyleAttributeCount = 0;
        let getImageHeightCount = 0;

        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'createImageTag');
        streamUtilitySpy.createImageTag.and.callFake(() => {
            return `<img${++createImageTagCount}>`;
        });

        spyOn(streamUtilitySpy, 'createStyleAttribute');
        streamUtilitySpy.createStyleAttribute.and.callFake(() => {
            return `style${++createStyleAttributeCount}`;
        });

        spyOn(streamUtilitySpy, 'getImageHeight');
        spyOn(streamUtilitySpy, 'getRandomNumber');

        target = new Amo.Client.Stream(
            [
                {
                    title: 'photo1',
                    url: 'url1'
                },
                {
                    title: 'photo2',
                    url: 'url2'
                },
            ],
            {}
        );
    });
    
    /**
     * generateHtml
     */
    
    describe('When generating HTML', () => {
        beforeEach(() => {
            result = target.generateHtml();
        });

        it('should create image tags', () => {
            expect(streamUtilitySpy.createImageTag.calls.allArgs()).toEqual(
                [
                    [
                        {
                            alt: 'photo1',
                            src: 'url1',
                            style: 'style1'
                        }
                    ],
                    [
                        {
                            alt: 'photo2',
                            src: 'url2',
                            style: 'style2'
                        }
                    ],
                ]
            );
        });

        it('should return image tag', () => {
            expect(result).toEqual('<img1><img2>');
        });
    });
});
