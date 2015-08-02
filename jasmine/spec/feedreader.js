/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has url defined and not empty string', function() {
            for (var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
            }
         });


        /* TODO: Write a test that loops through each feed
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

    /* TODO: Write a new test suite named "The menu" */
    describe('the Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays when clicked and hides when unclicked', function() {
            //trigger click event on menu icon to simulate mouse click
            $('.menu-icon-link').trigger('click');
            //test for body class. '' indicates menu is not hidden
            expect($('body').attr('class')).toBe('');
            //trigger click event on menu icon to simulate mouse click
            $('.menu-icon-link').trigger('click');
            //test for body class 'menu-hidden' indicates menu is not visible
            expect($('body').attr('class')).toBe('menu-hidden');

        });




    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var entries = [];
        beforeEach(function(done){
            setTimeout(function() {
                done();
            },1000);

        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         it('Should countain at least 1 .entry element within the .feed container', function(done) {
            //check for feeds children of class entry in DOM after loadFeed() is ran
            entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
         });


    });
    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed', function() {
        var newEntries;
        var feeds = allFeeds;
        var feedList = $('.feed-list').find('a');
        var feedNumber = 1;
        var entries;

        beforeEach(function(done){
            setTimeout(function() {
                done();
            },1000);
        });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.*/

        it('After loading initial content', function(done) {
            //load first feed (feed[0]) into entries variable to compare
            entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);
            //trigger click event on next feed in feedList
            $(feedList[1]).trigger('click');
            done();
        });

        it('should change content when new feed is loadad', function(done) {
            //load 2nd feed into newEntries variable
            newEntries = $('.feed').find('.entry');
            //compare entries to newEntries. should not be the same
            expect(entries[0]).not.toBe(newEntries[0]);
            //onsole.log(entries);
            //console.log(newEntries);
            done();
         });

    });

}());
