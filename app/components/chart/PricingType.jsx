let React = require('react');

class PricingType extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            type: props.type,
            title: props.title,
            revenue: props.revenue,
            gm: props.gm,
            over: false
        };

        // This binding is necessary to make `this` work in the callback
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    
    handleMouseEnter( type )
    {
        // call toggle function on the pricing table
        this.props.onMouseEnter( type );
    }

    handleMouseLeave( type )
    {
        // call toggle function on the pricing table
        this.props.onMouseLeave( type );
    }

    render()
    {
        let { type, title, revenue, gm } = this.state;

        return (
            <section className={"pricingType pricingType--" + type.toLowerCase()} onMouseEnter={ this.handleMouseEnter.bind(this, type) }  onMouseLeave={ this.handleMouseLeave.bind(this, type) }>
                <header><h1>{title}</h1></header>
                <div className="pricingType__body">
                    <table>
                        <tbody>
                            <tr>
                                <td>Revenue:</td>
                                <td><strong>{revenue}</strong></td>
                            </tr>
                            <tr>
                                <td>Gross Margin:</td>
                                <td><strong>{gm}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
}

module.exports = PricingType;



