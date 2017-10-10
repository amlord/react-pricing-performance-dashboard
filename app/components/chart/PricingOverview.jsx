// redux
let { connect } = require('react-redux');

// user-defined app components
let PricingTypes = require('./PricingTypes.jsx');

const mapStateToProps = state =>
{
  return {
    waterfall: state.waterfall,
    revenueMix: state.revenueMix,
    target: state.target
  }
}

const mapDispatchToProps = dispatch =>
{
  return {};
}

const PricingOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(PricingTypes)

module.exports = PricingOverview;
                                    