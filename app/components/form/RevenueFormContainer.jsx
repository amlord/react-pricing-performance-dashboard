// redux
let { connect } = require('react-redux');

// user-defined app components
let {
    setStandardGmRev,
    setDiscountGmRev,
    setSegmentedGmRev,
    setContractGmRev,
    setPromotionalGmRev,
    setStandardGmCogs,
    setDiscountGmCogs,
    setSegmentedGmCogs,
    setContractGmCogs,
    setPromotionalGmCogs
} = require('../../api/redux/actions.js');
const { STANDARD, DISCOUNT, SEGMENTED, CONTRACT, PROMOTIONAL, TOTAL } = require('../../api/redux/actions.js');
let RevenueForm = require('./RevenueForm.jsx');

const mapStateToProps = state =>
{
  return {
    revStandard: state.data[STANDARD].revenue,
    revDiscount: state.data[DISCOUNT].revenue,
    revSegmented: state.data[SEGMENTED].revenue,
    revContract: state.data[CONTRACT].revenue,
    revPromotional: state.data[PROMOTIONAL].revenue,
    revTotal: state.data[TOTAL].revenue,

    cogStandard: state.data[STANDARD].cogs,
    cogDiscount: state.data[DISCOUNT].cogs,
    cogSegmented: state.data[SEGMENTED].cogs,
    cogContract: state.data[CONTRACT].cogs,
    cogPromotional: state.data[PROMOTIONAL].cogs,
    cogTotal: state.data[TOTAL].cogs,

    gmpStandard: state.data[STANDARD].gmPercent,
    gmpDiscount: state.data[DISCOUNT].gmPercent,
    gmpSegmented: state.data[SEGMENTED].gmPercent,
    gmpContract: state.data[CONTRACT].gmPercent,
    gmpPromotional: state.data[PROMOTIONAL].gmPercent,
    gmpTotal: state.data[TOTAL].gmPercent,

    subTitle: "Dealer Data"
  }
}

const mapDispatchToProps = dispatch =>
{
  return {
    onStandardGmRevUpdate: revStandard =>
    {
      dispatch( setStandardGmRev( revStandard ) )
    },
    onDiscountGmRevUpdate: revDiscount =>
    {
      dispatch( setDiscountGmRev( revDiscount ) )
    },
    onSegmentedGmRevUpdate: revDiscount =>
    {
      dispatch( setSegmentedGmRev( revDiscount ) )
    },
    onContractGmRevUpdate: revDiscount =>
    {
      dispatch( setContractGmRev( revDiscount ) )
    },
    onPromotionalGmRevUpdate: revPromotional =>
    {
      dispatch( setPromotionalGmRev( revPromotional ) )
    },

    onStandardGmCogUpdate: cogStandard =>
    {
      dispatch( setStandardGmCogs( cogStandard ) )
    },
    onDiscountGmCogUpdate: cogDiscount =>
    {
      dispatch( setDiscountGmCogs( cogDiscount ) )
    },
    onSegmentedGmCogUpdate: cogSegmented =>
    {
      dispatch( setSegmentedGmCogs( cogSegmented ) )
    },
    onContractGmCogUpdate: cogContract =>
    {
      dispatch( setContractGmCogs( cogContract ) )
    },
    onPromotionalGmCogUpdate: cogPromotional =>
    {
      dispatch( setPromotionalGmCogs( cogPromotional ) )
    }
  }
}

const RevenueFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueForm)

module.exports = RevenueFormContainer;