describe('StreamColumn', () => {
    let result: any;
    let target: Amo.Client.StreamColumn;

    let configSpy: Amo.Client.IStreamConfiguration;
    let image: Amo.Client.StreamImage;
    let imageSpy: Amo.Client.StreamImage;
    let streamUtilitySpy: Amo.Client.StreamUtility;

    beforeEach(() => {
        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'getRandomNumber');
        streamUtilitySpy.getRandomNumber.and.returnValue(1);

        configSpy = jasmine.createSpyObj('config', ['getColumnHeightMax', 'getColumnHeightMin', 'getOffset']);
        configSpy.getColumnHeightMax.and.returnValue(13);
        configSpy.getColumnHeightMin.and.returnValue(12);
        configSpy.getOffset.and.returnValue(14);
        configSpy.photoWidthMax = 11;
        configSpy.photoWidthMin = 10;
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
            spyOn(Amo.Client.StreamColumn.prototype, 'addPhoto');
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
                expect(streamUtilitySpy.getRandomNumber).toHaveBeenCalledWith(10, 11);
                expect(target.width).toEqual(1);
            });

            it('should get random height', () => {
                expect(streamUtilitySpy.getRandomNumber).toHaveBeenCalledWith(12, 13);
                expect(target.height).toEqual(1);
            });

            it('should get offset', () => {
                expect(configSpy.getOffset).toHaveBeenCalledWith(250);
                expect(target.offset).toEqual(14);
            });

            it('should get random top', () => {
                expect(streamUtilitySpy.getRandomNumber).toHaveBeenCalledWith(-14, -2);
            });

            it('should not add photo', () => {
                expect(target.addPhoto).not.toHaveBeenCalled();
            });
        });

        describe('with a photo', () => {
            beforeEach(() => {
                target = new Amo.Client.StreamColumn(
                    500,
                    configSpy,
                    'PHOTO'
                );
            });

            it('should add photo', () => {
                expect(target.addPhoto).toHaveBeenCalledWith('PHOTO');
            });
        });
    });

    /**
     * addPhoto
     */

    describe('When adding a photo', () => {
        beforeEach(() => {
            target = new Amo.Client.StreamColumn(
                500,
                configSpy
            );

            target.config = 'CONFIG';
            target.height = 100;
            target.left = 1;
            target.offset = 50;
            target.top = 2;
            target.width = 3;

            imageSpy.getHtml.and.returnValue('i1');
            imageSpy.getHeight.and.returnValue(10);

            result = target.addPhoto('PHOTO');
        });

        it('should create image', () => {
            expect(Amo.Client.StreamImage).toHaveBeenCalledWith(
                'PHOTO',
                {
                    left: 1,
                    top: 2,
                    width: 3,
                },
                'CONFIG'
            );
        });

        it('should update HTML', () => {
            expect(target.html).toEqual('i1');
        });

        it('should update top', () => {
            expect(target.top).toEqual(12);
        });

        it('should return true', () => {
            expect(result).toEqual(true);
        });

        describe('and adding another photo that fits', () => {
            beforeEach(() => {
                imageSpy.getHtml.and.returnValue('i2');
                imageSpy.getHeight.and.returnValue(38);

                result = target.addPhoto('PHOTO');
            });

            it('should update HTML', () => {
                expect(target.html).toEqual('i1i2');
            });

            it('should update top', () => {
                expect(target.top).toEqual(50);
            });

            it('should return true', () => {
                expect(result).toEqual(true);
            });

            describe('and adding another photo that does not fit', () => {
                beforeEach(() => {
                    imageSpy.getHtml.and.returnValue('i3');
                    imageSpy.getHeight.and.returnValue(1);

                    result = target.addPhoto('PHOTO');
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
