describe('Stream', () => {
    let target: Amo.Client.IStream;

    let column: Amo.Client.StreamColumn;
    let columnSpy: Amo.Client.StreamColumn;
    let jQuerySpy: JQuery;
    let windowJQuery: any;

    let configMock: Object;

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
                'addPhoto',
                'getHtml',
                'getWidth',
            ]
        );

        columnSpy.addPhoto.and.returnValues(
            true,
            true,
            false,
            true,
            false,
            true,
            true
        );

        columnSpy.getHtml.and.returnValues(
            'c1',
            'c2'
        );

        columnSpy.getWidth.and.returnValues(
            50,
            51
        );

        configMock = {};

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
            configMock
        );
    });

    afterEach(() => {
        Amo.Client.StreamColumn.prototype = column;
        window.$ = windowJQuery;
    });

    describe('When creating a stream', () => {
        it('should get window object', () => {
            expect(window.$).toHaveBeenCalledWith(window);
        });

        it('should create columns', () => {
            expect(Amo.Client.StreamColumn.calls.allArgs()).toEqual(
                [
                    [
                        0,
                        {
                            windowWidth: 100,
                        },
                        undefined,
                    ],
                    [
                        50,
                        {
                            windowWidth: 100,
                        },
                        'p3',
                    ],
                ]
            );
        });

        it('should add photos to columns', () => {
            expect(columnSpy.addPhoto.calls.allArgs()).toEqual(
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
                ]
            );
        });

        it('should generate HTML', () => {
            expect(target.getHtml()).toEqual('c1c2');
        });
    });
});
