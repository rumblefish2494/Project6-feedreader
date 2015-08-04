/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* placing all of the tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */
    describe('RSS Feeds', function() {
        /* tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url defined and not empty string', function() {
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name defined and not empty string', function() {
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });
    /* new test suite named "The menu" */
    describe('the Menu', function() {
        /* test that ensures the menu element is
         * hidden by default.*/
        it('is hidden by default', function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });
         /* test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.*/
        it('displays when clicked and hides when unclicked', function() {
            //trigger click event on menu icon to simulate mouse click
            $('.menu-icon-link').click();
            //test for body class. '' indicates menu is not hidden
            expect($('body').attr('class')).not.toBe('menu-hidden');
            //trigger click event on menu icon to simulate mouse click
            $('.menu-icon-link').click();
            //test for body class 'menu-hidden' indicates menu is not visible
            expect($('body').attr('class')).toBe('menu-hidden');
        });
    });
    /* new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var entries = [];
        var feeds = $('.feed');
        beforeEach(function(done){
            feeds.empty();
            loadFeed(0, function() {
                done();
            });
        });
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/
        it('Should countain at least 1 .entry element within the .feed container', function(done) {
            //check for feeds children of class entry in DOM after loadFeed() is ran
            entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });
    /*new test suite named "New Feed Selection"*/
    describe('New Feed', function() {
        var feeds = $('.feed');
        var newEntries;
        var initialEntries;
        var feedList = $('.feed-list').find('a');
        var i = 1;

        beforeEach(function(done){
            //empty feeds
            //load initial feeds
            feeds.empty();
            loadFeed(0, function(){
                initialEntries = $('.feed').find('.entry');
                //load other feeds in array feedList for comparison
                //refactored thanks to https://discussions.udacity.com/t/last-test-suit-new-feed-selection-not-working/26375
                loadFeed(i, function() {
                    newEntries = $('.feed').find('.entry');
                    done();
                });
            });
        });
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * this iterates through all feeds and tests each one against the initial feed*/
        $(feedList).each(function(index) {
            if ( i <= index) {
                it('should change content when new feed is loadad', function(done) {
                    var initialContent = $(initialEntries[0]).text();
                    var newContent
                    //compare entries to newEntries. should not be the same
                    expect($(initialEntries[0]).text()).not.toContain($(newEntries[0]).text());
                    i++;
                    done();
                });
            };
        });
    });
}());
