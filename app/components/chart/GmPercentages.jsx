let React = require('react');
let { connect } = require('react-redux');

let HelperFunctions = require('../../api/HelperFunctions.js');

class GmPercentages extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            data: props.data,
            revenueMix: props.revenueMix,
            target: props.target
        };
    }

    componentWillReceiveProps( nextProps )
    {
        let { data, revenueMix, target } = this.state;

        if( nextProps.data !== data )
        {
            this.setState({
                data: nextProps.data
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

    render()
    {console.log(this.state.data);
        let standard  = this.state.revenueMix.data[0],
            overall   = this.state.revenueMix.totals,
            customerRevenue = this.state.data.reduce( ( previous, current, index ) => {
                return previous + ( index === 0 || index === 5 ? 0 : parseFloat( current.revenue ) );
            }, 0),
            customerCogs = this.state.data.reduce( ( previous, current, index ) => {
                return previous + ( index === 0 || index === 5 ? 0 : parseFloat( current.cogs ) );
            }, 0),
            customerGm = ( ( customerRevenue - customerCogs ) / customerRevenue ) * 100,
            customer  = {
                gmPercent: parseFloat(Math.round(customerGm * 100) / 100).toFixed(1),
                revenue: this.state.revenueMix.data.reduce( ( previous, current, index ) => {
                    return index === 0 ? 0 : previous + parseFloat( current.revenue );
                }, 0)
            };

        return (
            <div className="row">
                <div className="col-md-4">
                    <section className="panel gmPercentage">
                        <div className="gmPercentage__value gmPercentage__value--standard">{standard.gmPercent}%</div>
                        <div className="gmPercentage__text">
                            <header><h1 className="gmPercentage__heading">Standard GM</h1></header>
                            <small className="gmPercentage__subtext">({ HelperFunctions.formatCurrency( standard.revenue ) } revenue)</small>
                        </div>
                    </section>
                </div>
                <div className="col-md-4">
                    <section className="panel gmPercentage">
                        <div className="gmPercentage__value">{customer.gmPercent}%</div>
                        <div className="gmPercentage__text">
                            <header><h1 className="gmPercentage__heading">Customer GM <small>(Discount / Contract / Segmented / Promo)</small></h1></header>
                            <small className="gmPercentage__subtext">({ HelperFunctions.formatCurrency( customer.revenue ) } revenue)</small>
                        </div>
                    </section>
                </div>
                <div className="col-md-4">
                    <section className="panel gmPercentage">
                        <div className={"gmPercentage__value gmPercentage__value--" + HelperFunctions.gmPercentColour( overall.gmPercent, this.state.target ) }>{overall.gmPercent}%</div>
                        <div className="gmPercentage__text">
                            <header><h1 className="gmPercentage__heading">Overall GM</h1></header>
                            <small className="gmPercentage__subtext">({ HelperFunctions.formatCurrency( overall.revenue ) } revenue)</small>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

module.exports = GmPercentages;



