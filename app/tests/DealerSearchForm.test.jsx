const React = require('react');
const renderer = require('react-test-renderer');

const DEALERS = require('../api/dealer-data');
const DealerSearchForm = require('../components/dealer-search/form/DealerSearchForm');

test('Snapshot: Dealer Search Form', () =>
{
    const SEARCH_FORM = renderer.create(
        <DealerSearchForm
            searchTerm="ABC" />
    );

    let tree = SEARCH_FORM.toJSON();
    expect(tree).toMatchSnapshot();
});