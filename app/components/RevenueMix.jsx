let React = require('react');
let { connect } = require('react-redux');

// user-defined app components
let RevenueFormContainer = require('./form/RevenueFormContainer.jsx');
let IndustryRevenueFormContainer = require('./form/IndustryRevenueFormContainer.jsx');
let RevenueChartCalculatedValuesContainer = require('./form/RevenueChartCalculatedValuesContainer.jsx');
let GmWaterfallCalculatedValuesContainer = require('./form/GmWaterfallCalculatedValuesContainer.jsx');

let RevenueChartChartContainer = require('./chart/RevenueChartContainer.jsx');
let WaterfallChartContainer = require('./chart/WaterfallChartContainer.jsx');
let PricingOverview = require('./chart/PricingOverview.jsx');

class RevenueMix extends React.Component
{
    render()
    {
        return (
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <section className="panel">
                                <header className="panelHeader">
                                    <h1>Pricing Overview <small>(Last 12 Months)</small></h1>
                                </header>
                                <div className="panelBody panelBody--container">
                                    <PricingOverview />
                                    <div className="pricingOverviewCharts">
                                        <div className="pricingOverviewChart">
                                            <WaterfallChartContainer />
                                        </div>
                                        <div className="pricingOverviewChart">
                                            <RevenueChartChartContainer />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="container pricingOverviewForms">
                    <div className="row">
                        <div className="col-md-6">
                            <GmWaterfallCalculatedValuesContainer />
                        </div>
                        <div className="col-md-6">
                            <RevenueChartCalculatedValuesContainer />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <RevenueFormContainer />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <IndustryRevenueFormContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = RevenueMix;