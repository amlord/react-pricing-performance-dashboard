let React = require('react');
let { connect } = require('react-redux');

// custom d3 chart api
var GmWaterfallChart = require('../../api/GmWaterfallChart.js');

class WaterfallChart extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            waterfall: props.waterfall,
            target: props.target,
            revenueMix: props.revenueMix
        };

        this.drawWaterfallChart = this.drawWaterfallChart.bind(this);
    }

    componentWillReceiveProps( nextProps )
    {
        let { waterfall, target, revenueMix } = this.state;

        if( nextProps.waterfall !== waterfall )
        {
            this.setState({
                waterfall: nextProps.waterfall
            });
        }

        if( nextProps.target !== target )
        {
            this.setState({
                target: nextProps.target
            });
        }

        if( nextProps.revenueMix !== revenueMix )
        {
            this.setState({
                revenueMix: nextProps.revenueMix
            });
        }
    }

    componentDidMount()
    {
        this.drawWaterfallChart();
    }

    componentDidUpdate()
    {
        this.drawWaterfallChart();
    }

    drawWaterfallChart()
    {
        // draw the waterfall chart using d3.js
        GmWaterfallChart.draw(
            this.state.waterfall,
            this.state.target,
            this.state.revenueMix
        );
    }

    render()
    {
        return (
            <section className="panel">
                <header className="panelHeader panelHeader--inner">
                    <h1>Gross Margin Erosion <small>(Last 12 Months)</small></h1>
                </header>
                <div className="panelBody">
                    <div className="waterfallChart"></div>
                </div>
            </section>
        );
    }
}

module.exports = WaterfallChart;