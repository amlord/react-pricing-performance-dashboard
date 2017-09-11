const Redux = require('redux');

// create a data store
const { createStore } = Redux;

// user-defined app components
const DEALERS = require('../api/dealer-data');
const { setSearchText } = require('../api/redux/actions');
const { dealerMapApp } = require('../api/redux/reducers');

let store;

test('Redux Store: Initial Dealers Load', () =>
{
    // define Redux data store
    store = createStore( dealerMapApp, {
        dealers: DEALERS,
        searchText: ""
    } );

    // get the current state
    let state = store.getState();

    // check search text is still blank
    expect(state.searchText).toBe("");

    // check all dealers have been loaded
    expect(state.dealers.length).toBe(36);

    // check all dealers have been loaded
    expect(visibleDealers(state.dealers)).toBe(36);
});

test('Redux Store: "AB" dealers search', () =>
{
    // update the search text
    store.dispatch(setSearchText('AB'))

    // get the current state
    let state = store.getState();

    // check search text has been updated
    expect(state.searchText).toBe("ab");

    // check all dealers are still loaded
    expect(state.dealers.length).toBe(36);

    // check all dealers have been loaded
    expect(visibleDealers(state.dealers)).toBe(2);
});

test('Redux Store: "ABA" dealers search', () =>
{
    // update the search text
    store.dispatch(setSearchText('ABA'))

    // get the current state
    let state = store.getState();

    // check search text has been updated
    expect(state.searchText).toBe("aba");

    // check all dealers are still loaded
    expect(state.dealers.length).toBe(36);

    // check all dealers have been loaded
    expect(visibleDealers(state.dealers)).toBe(1);
});

test('Redux Store: "" dealers search', () =>
{
    // update the search text
    store.dispatch(setSearchText(''))

    // get the current state
    let state = store.getState();

    // check search text has been updated
    expect(state.searchText).toBe("");

    // check all dealers are still loaded
    expect(state.dealers.length).toBe(36);

    // check all dealers have been loaded
    expect(visibleDealers(state.dealers)).toBe(36);
});

// ***** HELPER FUNCTIONS *****
var visibleDealers = function(dealers)
{
    return dealers.reduce(function(sum, dealer)
    {
        return dealer.show !== false ? ++sum : sum;
    }, 0);
};