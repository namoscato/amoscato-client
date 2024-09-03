import CurrentList from "..";

describe("CurrentList", () => {
    let target: CurrentList;

    let formatDate: any;
    let formatDateSpy: any;

    beforeEach(() => {
        formatDate = (CurrentList as any).prototype.formatDate;

        jest.spyOn(
            (CurrentList as any).prototype,
            "formatDate",
        ).mockImplementation();
        formatDateSpy = (CurrentList as any).prototype.formatDate;
        formatDateSpy.mockImplementation((date: string) => {
            return `formatted ${date}`;
        });
    });

    afterEach(() => {
        (CurrentList as any).prototype.formatDate = formatDate;
    });

    describe("When generating the HTML for a", () => {
        describe("book", () => {
            beforeEach(() => {
                target = new CurrentList(["book"], {
                    book: {
                        author: "book author",
                        date: "book date",
                        title: "book title",
                        url: "book url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toEqual(
                    '<li class="homepage-current-list-item" title="by book author, started formatted book date">reading <a href="book url" target="_blank">&ldquo;book title&rdquo;</a></li>',
                );
            });
        });

        describe("bike ride", () => {
            beforeEach(() => {
                target = new CurrentList(["athleticActivity"], {
                    athleticActivity: {
                        date: "activity date",
                        miles: 1.235,
                        minutes: 30.1,
                        type: "Ride",
                        url: "strava url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toEqual(
                    '<li class="homepage-current-list-item" title="in 31 minutes, formatted activity date">biking <a href="strava url" target="_blank">1.23 miles</a></li>',
                );
            });
        });

        describe("run", () => {
            beforeEach(() => {
                target = new CurrentList(["athleticActivity"], {
                    athleticActivity: {
                        date: "activity date",
                        miles: 1.235,
                        minutes: 30.1,
                        type: "Run",
                        url: "strava url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toContain(">running <");
            });
        });

        describe("unexpected athletic activity", () => {
            beforeEach(() => {
                target = new CurrentList(["athleticActivity"], {
                    athleticActivity: {
                        date: "activity date",
                        miles: 1.235,
                        minutes: 30.1,
                        type: "Swim",
                        url: "strava url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toEqual("");
            });
        });

        describe("drink", () => {
            beforeEach(() => {
                target = new CurrentList(["drink"], {
                    drink: {
                        brewery: "drink brewery",
                        date: "drink date",
                        name: "drink name",
                        url: "drink url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toEqual(
                    '<li class="homepage-current-list-item" title="by drink brewery, formatted drink date">drinking <a href="drink url" target="_blank">drink name</a></li>',
                );
            });
        });

        describe("journal", () => {
            beforeEach(() => {
                target = new CurrentList(["journal"], {
                    journal: {
                        date: "journal date",
                        title: "journal title",
                        url: "journal url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toEqual(
                    '<li class="homepage-current-list-item" title="formatted journal date">writing <a href="journal url" target="_self">&ldquo;journal title&rdquo;</a></li>',
                );
            });
        });

        describe("song", () => {
            beforeEach(() => {
                target = new CurrentList(["music"], {
                    music: {
                        album: "music album",
                        artist: "music artist",
                        date: "music date",
                        name: "music name",
                        url: "music url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toEqual(
                    '<li class="homepage-current-list-item" title="&ldquo;music name&rdquo; on music album, formatted music date">listening to <a href="music url" target="_blank">music artist</a></li>',
                );
            });
        });

        describe("video", () => {
            beforeEach(() => {
                target = new CurrentList(["video"], {
                    video: {
                        date: "video date",
                        title: "video title",
                        url: "video url",
                    },
                });
            });

            it("should generate HTML", () => {
                expect(target.getHtml()).toEqual(
                    '<li class="homepage-current-list-item" title="formatted video date">watching <a href="video url" target="_blank">&ldquo;video title&rdquo;</a></li>',
                );
            });
        });
    });
});
