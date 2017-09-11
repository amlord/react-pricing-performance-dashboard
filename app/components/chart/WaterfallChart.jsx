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
            target: props.target
        };

        this.drawWaterfallChart = this.drawWaterfallChart.bind(this);
    }

    componentWillReceiveProps( nextProps )
    {
        let { waterfall, target } = this.state;

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
            this.state.target
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