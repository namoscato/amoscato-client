describe('CurrentList', () => {
    let target: Amo.Client.CurrentList;

    let formatDate: Function;
    let formatDateSpy: any;

    beforeEach(() => {
        formatDate = Amo.Client.CurrentList.prototype.formatDate;

        spyOn(Amo.Client.CurrentList.prototype, 'formatDate');
        formatDateSpy = Amo.Client.CurrentList.prototype.formatDate;
        formatDateSpy.and.callFake((date: string) => {
            return `formatted ${date}`;
        });
    });

    afterEach(() => {
        Amo.Client.CurrentList.prototype.formatDate = formatDate;
    });

    describe('When generating the HTML for', () => {
        describe('Goodreads', () => {
            beforeEach(() => {
                target = new Amo.Client.CurrentList(
                    [
                        'goodreads',
                    ],
                    {
                        goodreads: {
                            author: 'goodreads author',
                            date: 'goodreads date',
                            title: 'goodreads title',
                            url: 'goodreads url',
                        },
                    }
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="by goodreads author, started formatted goodreads date">reading <a href="goodreads url" target="_default">&ldquo;goodreads title&rdquo;</a></li>');
            });
        });

        describe('a journal', () => {
            beforeEach(() => {
                target = new Amo.Client.CurrentList(
                    [
                        'journal',
                    ],
                    {
                        journal: {
                            date: 'journal date',
                            title: 'journal title',
                            url: 'journal url',
                        },
                    }
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="formatted journal date">writing <a href="journal url" target="_default">&ldquo;journal title&rdquo;</a></li>');
            });
        });

        describe('Last.fm', () => {
            beforeEach(() => {
                target = new Amo.Client.CurrentList(
                    [
                        'lastfm',
                    ],
                    {
                        lastfm: {
                            album: 'lastfm album',
                            artist: 'lastfm artist',
                            date: 'lastfm date',
                            name: 'lastfm name',
                            url: 'lastfm url',
                        },
                    }
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="&ldquo;lastfm name&rdquo; on lastfm album, formatted lastfm date">listening to <a href="lastfm url" target="_default">lastfm artist</a></li>');
            });
        });
    });
});
