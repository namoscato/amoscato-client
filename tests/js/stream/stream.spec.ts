describe('Stream', () => {
    let target: Amo.Client.IStream;

    let columnInstanceSpy: Amo.Client.IStreamColumn;
    let jQuerySpy: JQuery;
    let windowJQuery: any;

    let configMock: Object;

    beforeEach(() => {
        windowJQuery = window.$;
        window.$ = jasmine.createSpy('$');

        jQuerySpy = jasmine.createSpyObj('$', ['width']);
        window.$.and.returnValue(jQuerySpy);

        spyOn(Amo.Client, 'StreamColumn');

        columnInstanceSpy = Amo.Client.StreamColumn.prototype = jasmine.createSpyObj(
            'streamColumn',
            [
                'addPhoto',
                'getHtml',
                'getWidth',
            ]
        );

        columnInstanceSpy.addPhoto.and.returnValues(
            true,
            true,
            false,
            true,
            false,
            true,
            true
        );

        columnInstanceSpy.getHtml.and.returnValues(
            'c1',
            'c2'
        );

        columnInstanceSpy.getWidth.and.returnValues(
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
            expect(columnInstanceSpy.addPhoto.calls.allArgs()).toEqual(
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
