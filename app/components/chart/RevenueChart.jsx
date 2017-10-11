let React = require('react');
let { connect } = require('react-redux');

// custom d3 chart api
var RevenueMixChart = require('../../api/RevenueMixChart.js');

class revenueChart extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            revenueMix: props.revenueMix,
            target: props.target
        };

        this.drawRevenueChart = this.drawRevenueChart.bind(this);
    }

    componentWillMount()
    {
        window.addEventListener("resize", this.drawRevenueChart);
    }

    componentWillReceiveProps( nextProps )
    {
        let { revenueMix, target } = this.state;

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

    componentDidMount()
    {
        this.drawRevenueChart();
    }

    componentDidUpdate()
    {
        this.drawRevenueChart();
    }

    drawRevenueChart()
    {
        RevenueMixChart.draw(
            this.state.revenueMix.data,
            this.state.revenueMix.totals,
            this.state.target
        );
    }

    render()
    {
        return (
            <section className="panel">
                <header className="panelHeader panelHeader--inner">
                    <h1>Revenue Mix <small>(Last 12 Months)</small></h1>
                </header>
                <div className="panelBody">
                    <div className="revenueChart"></div>
                </div>
            </section>
        );
    }
}

Number.prototype.format = function(n, x, s, c)
{
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

module.exports = revenueChart;