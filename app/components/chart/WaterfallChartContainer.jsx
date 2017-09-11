// redux
let { connect } = require('react-redux');

// user-defined app components
let WaterfallChart = require('./WaterfallChart.jsx');

const mapStateToProps = state =>
{
  return {
    waterfall: state.waterfall,
    target: state.target
  }
}

const mapDispatchToProps = dispatch =>
{
  return {};
}

const WaterfallChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WaterfallChart)

module.exports = WaterfallChartContainer;