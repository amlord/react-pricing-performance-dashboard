let React = require('react');

class PricingOverall extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            revenue: props.revenue,
            gm: props.gm,
            target: props.target,
            targetStatus: props.targetStatus
        };
    }

    render()
    {
        let { revenue, gm, target, targetStatus } = this.state;

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



