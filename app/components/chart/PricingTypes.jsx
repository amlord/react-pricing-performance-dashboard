let React = require('react');
let { connect } = require('react-redux');

// user-defined app components
let PricingType = require('./PricingType.jsx');
let PricingOverall = require('./PricingOverall.jsx');
let HelperFunctions = require('../../api/HelperFunctions.js');

let PricingOverviewInteraction = require('../../api/PricingOverviewInteraction.js');

class PricingTypes extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            waterfall: props.waterfall,
            revenueMix: props.revenueMix,
            target: props.target
        };

        // This binding is necessary to make `this` work in the callback
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentWillReceiveProps( nextProps )
    {
        let { data, revenueMix, target } = this.state;

        if( nextProps.waterfall !== waterfall )
        {
            this.setState({
                waterfall: nextProps.waterfall
            });
        }

        if( nextProps.revenueMix !== revenueMix )
        {
            this.setState({
                revenueMix: nextProps.revenueMix
            });
        }

        if( nextProps.target !== target )
        {
            this.setState({
                target: nextProps.target
            });
        }
    }

    handleMouseOver( type )
    {
        let { revenueMix, target } = this.state;

        let selected = revenueMix.data.find(element => 
        {
            return element.name === type;
        });

        PricingOverviewInteraction.highlight(
            true,
            type,
            selected.displayName,
            selected.gmPercent,
            selected.revenue,
            selected.industryRevenuePercent,
            { revenue: revenueMix.totals.revenue, gmPercent: revenueMix.totals.gmPercent },
            target
        );
    }

    handleMouseOut( type )
    {
        let { revenueMix, target } = this.state;

        PricingOverviewInteraction.highlight(
            false,
            type,
            revenueMix.totals.displayName,
            revenueMix.totals.gmPercent,
            revenueMix.totals.revenue,
            0,
            { revenue: revenueMix.totals.revenue, gmPercent: revenueMix.totals.gmPercent, displayName: "Overview" },
            target
        );
    }

    renderPricingTypes()
    {
        let waterfall = this.state.waterfall.slice();

        // remove last element (totals) from array
        waterfall.pop();

        return (
           waterfall.map( (row, index) => {
                return (
                    <PricingType
                        key={index}
                        type={row.name}
                        title={row.displayName}
                        revenue={HelperFunctions.formatCurrency( row.revenue )}
                        gm={row.gmPercent + "%"}
                        onMouseEnter={ this.handleMouseOver }
                        onMouseLeave={ this.handleMouseOut } />
                )
            }, this)
        );
    }

    render()
    {
        let { target, revenueMix } = this.state,
            overallRevenue = HelperFunctions.formatCurrency( revenueMix.totals.revenue ),
            overallGm = revenueMix.totals.gmPercent,
            targetStatus = HelperFunctions.gmPercentColour(overallGm, target);

        return (
            <div className="pricingOverview">
                <section className="pricingTypes">
                    { this.renderPricingTypes() }
                </section>
                <PricingOverall revenue={overallRevenue} gm={overallGm + "%"} target={target + "%"} targetStatus={targetStatus} />
            </div>
        );
    }
}

module.exports = PricingTypes;



