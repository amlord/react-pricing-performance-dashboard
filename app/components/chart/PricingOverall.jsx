let React = require('react');

class PricingOverall extends React.Component
{
    render()
    {
        let { revenue, gm, target, targetStatus } = this.props;

        return (
            <section className="pricingOverall">
                <header>
                    <h1>Overview</h1>
                </header>
                <div className={"pricingOverall__gm pricingOverall__gm--" + targetStatus}>
                    <small>Gross Margin</small>
                    <strong>{gm}</strong>
                    <small>(Target: {target})</small>
                </div>
                <div className="pricingOverall__revenue">
                    <small>Revenue:</small>
                    <strong>{revenue}</strong>
                </div>
            </section>
        );
    }
}

module.exports = PricingOverall;



