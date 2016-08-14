describe('StreamColumn', () => {
    let result: any;
    let target: Amo.Client.StreamColumn;

    let configSpy: Amo.Client.IStreamConfiguration;
    let image: Amo.Client.StreamImage;
    let imageSpy: Amo.Client.StreamImage;
    let streamUtilitySpy: Amo.Client.StreamUtility;

    beforeEach(() => {
        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'getRandomInteger');
        streamUtilitySpy.getRandomInteger.and.returnValue(1);

        configSpy = jasmine.createSpyObj('config', ['getColumnHeightMax', 'getColumnHeightMin', 'getOffset']);
        configSpy.getColumnHeightMax.and.returnValue(13);
        configSpy.getColumnHeightMin.and.returnValue(12);
        configSpy.getOffset.and.returnValue(14);
        configSpy.photoWidthMax = 11;
        configSpy.photoWidthMin = 10;
        configSpy.secondarySourceTypeMap = {};
        configSpy.windowWidth = 500;

        spyOn(Amo.Client, 'StreamImage');

        image = Amo.Client.StreamImage.prototype;
        imageSpy = Amo.Client.StreamImage.prototype = jasmine.createSpyObj(
            'StreamImage',
            [
                'getHeight',
                'getHtml',
            ]
        );
    });

    afterEach(() => {
        Amo.Client.StreamImage.prototype = image;
    });

    describe('When creating a column', () => {
        beforeEach(() => {
            spyOn(Amo.Client.StreamColumn.prototype, 'addItem');
        });

        describe('without a photo', () => {
            beforeEach(() => {
                target = new Amo.Client.StreamColumn(
                    500,
                    configSpy
                );
            });

            it('should get max column height', () => {
                expect(configSpy.getColumnHeightMax).toHaveBeenCalledWith(250);
            });

            it('should get random width', () => {
                expect(streamUtilitySpy.getRandomInteger).toHaveBeenCalledWith(10, 11);
                expect(target.width).toEqual(1);
            });

            it('should get random height', () => {
                expect(streamUtilitySpy.getRandomInteger).toHaveBeenCalledWith(12, 13);
                expect(target.height).toEqual(1);
            });

            it('should get offset', () => {
                expect(configSpy.getOffset).toHaveBeenCalledWith(250);
                expect(target.offset).toEqual(14);
            });

            it('should get random top', () => {
                expect(streamUtilitySpy.getRandomInteger).toHaveBeenCalledWith(14, 26);
            });

            it('should not add photo', () => {
                expect(target.addItem).not.toHaveBeenCalled();
            });
        });

        describe('with a photo', () => {
            beforeEach(() => {
                target = new Amo.Client.StreamColumn(
                    500,
                    configSpy,
                    'ITEM'
                );
            });

            it('should add photo', () => {
                expect(target.addItem).toHaveBeenCalledWith('ITEM');
            });
        });
    });

    /**
     * addItem
     */

    describe('When adding a photo', () => {
        beforeEach(() => {
            target = new Amo.Client.StreamColumn(
                500,
                configSpy
            );

            target.streamConfig = {
                secondarySourceTypeMap: {},
            };
            target.height = 100;
            target.left = 1;
            target.offset = 50;
            target.bottom = 2;
            target.width = 3;

            imageSpy.getHtml.and.returnValue('i1');
            imageSpy.getHeight.and.returnValue(10);

            result = target.addItem('ITEM');
        });

        it('should create image', () => {
            expect(Amo.Client.StreamImage).toHaveBeenCalledWith(
                'ITEM',
                {
                    left: 1,
                    top: 2,
                    width: 3,
                },
                {
                    secondarySourceTypeMap: {},
                },
            );
        });

        it('should update HTML', () => {
            expect(target.html).toEqual('i1');
        });

        it('should update bottom', () => {
            expect(target.bottom).toEqual(12);
        });

        it('should return true', () => {
            expect(result).toEqual(true);
        });

        describe('and adding another photo that fits', () => {
            beforeEach(() => {
                imageSpy.getHtml.and.returnValue('i2');
                imageSpy.getHeight.and.returnValue(138);

                result = target.addItem('ITEM');
            });

            it('should update HTML', () => {
                expect(target.html).toEqual('i1i2');
            });

            it('should update bottom', () => {
                expect(target.bottom).toEqual(150);
            });

            it('should return true', () => {
                expect(result).toEqual(true);
            });

            describe('and adding another photo that does not fit', () => {
                beforeEach(() => {
                    imageSpy.getHtml.and.returnValue('i3');
                    imageSpy.getHeight.and.returnValue(1);

                    result = target.addItem('ITEM');
                });

                it('should return false', () => {
                    expect(result).toEqual(false);
                });

                it('should not update HTML', () => {
                    expect(target.html).toEqual('i1i2');
                });
            });
        });
    });
});
