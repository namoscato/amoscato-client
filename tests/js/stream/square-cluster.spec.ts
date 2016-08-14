describe('StreamSquareCluster', () => {
    let result: any;
    let target: Amo.Client.StreamSquareCluster;

    let squareSpy1: Amo.Client.StreamSquare;
    let squareSpy2: Amo.Client.StreamSquare;
    let squareSpy3: Amo.Client.StreamSquare;
    let squareSpy4: Amo.Client.StreamSquare;
    let squareSpyCount: number;
    let streamUtilitySpy: Amo.Client.StreamUtility;

    const generateSquareSpy = (size: number) {
        const spy = jasmine.createSpyObj('StreamSquare ' + ++squareSpyCount, ['generateHtml']);

        spy.size = size;
        spy.generateHtml.and.returnValue('<s' + squareSpyCount + '>');

        return spy;
    };

    beforeEach(() => {
        spyOn(Amo.Client, 'StreamSquare');

        streamUtilitySpy = Amo.Client.StreamUtility;

        spyOn(streamUtilitySpy, 'getRandomInteger');
        streamUtilitySpy.getRandomInteger.and.returnValue(1);

        squareSpyCount = 0;

        squareSpy1 = generateSquareSpy(10);
        squareSpy2 = generateSquareSpy(20);
        squareSpy3 = generateSquareSpy(30);
        squareSpy4 = generateSquareSpy(40);

        target = new Amo.Client.StreamSquareCluster(
            100,
            {
                secondarySquareSizeMax: .5,
                secondarySquareSizeMin: .2,
            },
        );

        target.squares = [
            squareSpy2,
            squareSpy1,
            squareSpy4,
            squareSpy3,
        ];
    });

    describe('When creating a square cluster', () => {
        it('should compute size bounds', () => {
            expect(target.sizeMax).toEqual(50);
            expect(target.sizeMin).toEqual(20);
        });
    });

    /**
     * addItem
     */

    describe('When adding an item', () => {
        beforeEach(() => {
            target.sizeMin = 20;
            target.sizeMax = 50;

            result = target.addItem('ITEM');
        });

        it('should create and add square', () => {
            expect(streamUtilitySpy.getRandomInteger).toHaveBeenCalledWith(20, 50);
            expect(Amo.Client.StreamSquare).toHaveBeenCalledWith(1, 'ITEM', jasmine.any(Object));
        });

        it('should return true', () => {
            expect(result).toEqual(true);
        });
    });

    /**
     * generateHtml
     */

    describe('When generating HTML', () => {
        describe('for a top left cluster', () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: 'top-left',
                    columnLeft: 0,
                    columnTop: 0,
                });
            });

            it('should generate the square HTML', () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(0, 0);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(40, 0);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(0, -40);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(70, 0);
            });

            it('should return cluster HTML', () => {
                expect(result).toEqual('<s4><s3><s2><s1>');
            });
        });

        describe('for a top right cluster', () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: 'top-right',
                    columnRight: 0,
                    columnTop: 0,
                });
            });

            it('should generate the square HTML', () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(-40, 0);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(-70, 0);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(-20, -40);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(-80, 0);
            });
        });

        describe('for a bottom left cluster', () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: 'bottom-left',
                    columnBottom: 0,
                    columnLeft: 0,
                });
            });

            it('should generate the square HTML', () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(0, 40);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(40, 30);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(0, 60);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(70, 10);
            });
        });

        describe('for a bottom right cluster', () => {
            beforeEach(() => {
                result = target.generateHtml({
                    alignment: 'bottom-right',
                    columnBottom: 0,
                    columnRight: 0,
                });
            });

            it('should generate the square HTML', () => {
                expect(squareSpy4.generateHtml).toHaveBeenCalledWith(-40, 40);
                expect(squareSpy3.generateHtml).toHaveBeenCalledWith(-70, 30);
                expect(squareSpy2.generateHtml).toHaveBeenCalledWith(-20, 60);
                expect(squareSpy1.generateHtml).toHaveBeenCalledWith(-80, 10);
            });
        });
    });
});
