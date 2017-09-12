// redux
let { connect } = require('react-redux');

// user-defined app components
let GmPercentages = require('./GmPercentages.jsx');

const mapStateToProps = state =>
{
  return {
    data: state.data,
    revenueMix: state.revenueMix,
    target: state.target
  }
}

const mapDispatchToProps = dispatch =>
{
  return {};
}

const GmPercentagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GmPercentages)

module.exports = GmPercentagesContainer;
                                    