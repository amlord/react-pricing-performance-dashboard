// redux
let { connect } = require('react-redux');

// user-defined app components
let GmWaterfallCalculatedValues = require('./GmWaterfallCalculatedValues.jsx');
let { setTargetGm } = require('../../api/redux/actions.js');

const mapStateToProps = state =>
{
  return {
    waterfall: state.waterfall,
    target: state.target
  }
}

const mapDispatchToProps = dispatch =>
{
  return {
    onTargetGmUpdate: targetGm =>
    {
      dispatch( setTargetGm( targetGm ) )
    }
  };
}

const GmWaterfallCalculatedValuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GmWaterfallCalculatedValues)

module.exports = GmWaterfallCalculatedValuesContainer;