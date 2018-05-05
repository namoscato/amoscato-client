describe('CurrentList', () => {
    let target: Amo.Client.CurrentList;

    let formatDate: any;
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

    describe('When generating the HTML for a', () => {
        describe('book', () => {
            beforeEach(() => {
                target = new Amo.Client.CurrentList(
                    [
                        'book',
                    ],
                    {
                        book: {
                            author: 'book author',
                            date: 'book date',
                            title: 'book title',
                            url: 'book url',
                        },
                    },
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="by book author, started formatted book date">reading <a href="book url" target="_blank">&ldquo;book title&rdquo;</a></li>');
            });
        });

        describe('drink', () => {
            beforeEach(() => {
                target = new Amo.Client.CurrentList(
                    [
                        'drink',
                    ],
                    {
                        drink: {
                            brewery: 'drink brewery',
                            date: 'drink date',
                            name: 'drink name',
                            url: 'drink url',
                        },
                    },
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="by drink brewery, formatted drink date">drinking <a href="drink url" target="_blank">drink name</a></li>');
            });
        });

        describe('journal', () => {
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
                    },
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="formatted journal date">writing <a href="journal url" target="_self">&ldquo;journal title&rdquo;</a></li>');
            });
        });

        describe('song', () => {
            beforeEach(() => {
                target = new Amo.Client.CurrentList(
                    [
                        'music',
                    ],
                    {
                        music: {
                            album: 'music album',
                            artist: 'music artist',
                            date: 'music date',
                            name: 'music name',
                            url: 'music url',
                        },
                    },
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="&ldquo;music name&rdquo; on music album, formatted music date">listening to <a href="music url" target="_blank">music artist</a></li>');
            });
        });

        describe('video', () => {
            beforeEach(() => {
                target = new Amo.Client.CurrentList(
                    [
                        'video',
                    ],
                    {
                        video: {
                            date: 'video date',
                            title: 'video title',
                            url: 'video url',
                        },
                    },
                );
            });

            it('should generate HTML', () => {
                expect(target.getHtml()).toEqual('<li class="homepage-current-list-item" title="formatted video date">watching <a href="video url" target="_blank">&ldquo;video title&rdquo;</a></li>');
            });
        });
    });
});
