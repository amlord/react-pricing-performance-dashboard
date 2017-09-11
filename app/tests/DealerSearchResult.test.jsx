const React = require('react');
const renderer = require('react-test-renderer');

const DEALERS = require('../api/dealer-data');
const DealerSearchResult = require('../components/dealer-search/results/DealerSearchResult');

test('Snapshot: Dealer Search Result (basic)', () =>
{
    const RESULTS = renderer.create(
        <DealerSearchResult
            dealer={{
                link: "/Dealer/Impersonate/600000000",
                code: "ABA",
                name: "Abacus Office Direct",
                op: true,
                lat: 52.50276,
                lng: -0.6459,
                address: "Unit I, Lammas Courtyard, Weldon Industrial Estate, Corby, NN17 5EZ",
                url: "http://www.abacusofficedirect.co.uk/",
                tel: "0800 804 8533",
                email: "sales@abacusofficesupplies.co.uk"
            }}
            key="ABA"
            opacity="0.5"
            dealerInfo={false} />
    );

    let tree = RESULTS.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Snapshot: Dealer Search Result (information)', () =>
{
    const RESULTS = renderer.create(
        <DealerSearchResult
            dealer={{
                link: "/Dealer/Impersonate/600000000",
                code: "ABA",
                name: "Abacus Office Direct",
                op: true,
                lat: 52.50276,
                lng: -0.6459,
                address: "Unit I, Lammas Courtyard, Weldon Industrial Estate, Corby, NN17 5EZ",
                url: "http://www.abacusofficedirect.co.uk/",
                tel: "0800 804 8533",
                email: "sales@abacusofficesupplies.co.uk"
            }}
            key="ABA"
            opacity="0.5"
            dealerInfo={true} />
    );

    let tree = RESULTS.toJSON();
    expect(tree).toMatchSnapshot();
});
