import StreamColumn from './column';
import StreamImage from './image';
import { IStreamConfiguration } from './interface';
import { StreamSquareCluster } from './square-cluster';
import { StreamUtility } from './utility';

describe('StreamColumn', () => {
    let result: any;
    let target: StreamColumn;

    let configSpy: IStreamConfiguration;
    let image: StreamImage;
    let squareCluster: StreamSquareCluster;
    let squareClusterSpy: StreamSquareCluster;

    beforeEach(() => {
        spyOn(StreamUtility, 'getRandomInteger');
        (StreamUtility.getRandomInteger as jasmine.Spy).and.returnValue(1);

        configSpy = jasmine.createSpyObj('config', ['getColumnHeightMax', 'getColumnHeightMin', 'getOffset']);
        (configSpy.getColumnHeightMax as jasmine.Spy).and.returnValue(13);
        (configSpy.getColumnHeightMin as jasmine.Spy).and.returnValue(12);
        (configSpy.getOffset as jasmine.Spy).and.returnValue(14);
        configSpy.photoWidthMax = 11;
        configSpy.photoWidthMin = 10;
        configSpy.secondarySourceTypeMap = {};
        configSpy.windowWidth = 500;

        image = StreamImage.prototype;
        StreamImage.prototype = jasmine.createSpyObj(
            'StreamImage',
            [
                'getHeight',
                'getHtml',
            ],
        );

        squareCluster = StreamSquareCluster.prototype;
        squareClusterSpy = StreamSquareCluster.prototype = jasmine.createSpyObj(
            'StreamSquareCluster',
            [
                'addItem',
                'generateHtml',
            ],
        );
    });

    afterEach(() => {
        StreamImage.prototype = image;
        StreamSquareCluster.prototype = squareCluster;
    });

    describe('When creating a column', () => {
        beforeEach(() => {
            spyOn(StreamColumn.prototype, 'addItem');
        });

        describe('without a photo', () => {
            beforeEach(() => {
                target = new StreamColumn(
                    500,
                    configSpy,
                );
            });

            it('should get max column height', () => {
                expect(configSpy.getColumnHeightMax).toHaveBeenCalledWith(250);
            });

            it('should get random width', () => {
                expect(StreamUtility.getRandomInteger).toHaveBeenCalledWith(10, 11);
                expect((target as any).width).toEqual(1);
            });

            it('should get random height', () => {
                expect(StreamUtility.getRandomInteger).toHaveBeenCalledWith(12, 13);
                expect((target as any).height).toEqual(1);
            });

            it('should get offset', () => {
                expect(configSpy.getOffset).toHaveBeenCalledWith(250);
                expect((target as any).offset).toEqual(14);
            });

            it('should get random top', () => {
                expect(StreamUtility.getRandomInteger).toHaveBeenCalledWith(14, 26);
            });

            it('should create square cluster', () => {
                expect((target as any).squareCluster).toEqual(jasmine.any(Object));
            });

            it('should not add photo', () => {
                expect(target.addItem).not.toHaveBeenCalled();
            });
        });

        describe('with a photo', () => {
            beforeEach(() => {
                target = new StreamColumn(
                    500,
                    configSpy,
                    'ITEM' as any,
                );
            });

            it('should add photo', () => {
                expect(target.addItem).toHaveBeenCalledWith('ITEM' as any);
            });
        });
    });

    /**
     * generateHtml
     */

    describe('When generating the column HTML', () => {
        beforeEach(() => {
            target = new StreamColumn(
                500,
                configSpy,
            );

            (target as any).html = 'HTML';
            (target as any).bottom = 1;
            (target as any).left = 2;
            (target as any).top = 3;

            (squareClusterSpy.generateHtml as jasmine.Spy).and.returnValue('SQ');

            spyOn(target, 'getWidth');
            (target.getWidth as jasmine.Spy).and.returnValue(4);

            result = target.generateHtml('top-left');
        });

        it('should generate square cluster HTML', () => {
            expect(squareClusterSpy.generateHtml).toHaveBeenCalledWith({
                alignment: 'top-left',
                columnBottom: 1,
                columnLeft: 2,
                columnRight: 6,
                columnTop: 3,
            });
        });

        it('should return HTML', () => {
            expect(result).toEqual('HTMLSQ');
        });
    });
});
