describe('Stream', () => {
    let result: any;
    let target: Amo.Client.IStream;

    let column: Amo.Client.StreamColumn;
    let columnSpy: Amo.Client.StreamColumn;
    let jQuerySpy: JQuery;
    let windowJQuery: any;

    beforeEach(() => {
        windowJQuery = window.$;
        window.$ = jasmine.createSpy('$');

        jQuerySpy = jasmine.createSpyObj('$', ['width']);
        window.$.and.returnValue(jQuerySpy);

        spyOn(Amo.Client, 'StreamColumn');

        column = Amo.Client.StreamColumn.prototype;
        columnSpy = Amo.Client.StreamColumn.prototype = jasmine.createSpyObj(
            'StreamColumn',
            [
                'addItem',
                'generateHtml',
                'getWidth',
            ],
        );

        columnSpy.addItem.and.returnValues(
            true,
            true,
            false,
            true,
            false,
            true,
            true,
        );

        columnSpy.generateHtml.and.returnValues(
            'c1',
            'c2',
        );

        columnSpy.getWidth.and.returnValues(
            50,
            51,
        );

        jQuerySpy.width.and.returnValue(100);

        target = new Amo.Client.Stream(
            [
                'p1',
                'p2',
                'p3',
                'p4',
                'p5',
                'p6',
            ],
            {
                secondarySourceTypes: [],
                windowWidth: 100,
            },
        );
    });

    afterEach(() => {
        Amo.Client.StreamColumn.prototype = column;
        window.$ = windowJQuery;
    });

    describe('When generating the HTML', () => {
        beforeEach(() => {
            result = target.generateHtml();
        });

        it('should create columns', () => {
            expect(Amo.Client.StreamColumn.calls.allArgs()).toEqual(
                [
                    [
                        0,
                        {
                            secondarySourceTypeMap: {},
                            secondarySourceTypes: [],
                            windowWidth: 100,
                        },
                        undefined,
                    ],
                    [
                        50,
                        {
                            secondarySourceTypeMap: {},
                            secondarySourceTypes: [],
                            windowWidth: 100,
                        },
                        'p3',
                    ],
                ],
            );
        });

        it('should add photos to columns', () => {
            expect(columnSpy.addItem.calls.allArgs()).toEqual(
                [
                    [
                        'p1',
                    ],
                    [
                        'p2',
                    ],
                    [
                        'p3',
                    ],
                    [
                        'p4',
                    ],
                    [
                        'p5',
                    ],
                ],
            );
        });

        it('should generate HTML', () => {
            expect(result).toEqual('c1c2');
        });
    });
});
