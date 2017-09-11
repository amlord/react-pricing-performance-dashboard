// redux
let { connect } = require('react-redux');

// user-defined app components
const {
    setIndustryStandardGmRev,
    setIndustryDiscountGmRev,
    setIndustrySegmentedGmRev,
    setIndustryContractGmRev,
    setIndustryPromotionalGmRev,
    setIndustryStandardGmCogs,
    setIndustryDiscountGmCogs,
    setIndustrySegmentedGmCogs,
    setIndustryContractGmCogs,
    setIndustryPromotionalGmCogs
} = require('../../api/redux/actions.js');
const { STANDARD, DISCOUNT, SEGMENTED, CONTRACT, PROMOTIONAL, TOTAL } = require('../../api/redux/actions.js');
let RevenueForm = require('./RevenueForm.jsx');

const mapStateToProps = state =>
{
  return {
    revStandard: state.industryData[STANDARD].revenue,
    revDiscount: state.industryData[DISCOUNT].revenue,
    revSegmented: state.industryData[SEGMENTED].revenue,
    revContract: state.industryData[CONTRACT].revenue,
    revPromotional: state.industryData[PROMOTIONAL].revenue,
    revTotal: state.industryData[TOTAL].revenue,

    cogStandard: state.industryData[STANDARD].cogs,
    cogDiscount: state.industryData[DISCOUNT].cogs,
    cogSegmented: state.industryData[SEGMENTED].cogs,
    cogContract: state.industryData[CONTRACT].cogs,
    cogPromotional: state.industryData[PROMOTIONAL].cogs,
    cogTotal: state.industryData[TOTAL].cogs,

    gmpStandard: state.industryData[STANDARD].gmPercent,
    gmpDiscount: state.industryData[DISCOUNT].gmPercent,
    gmpSegmented: state.industryData[SEGMENTED].gmPercent,
    gmpContract: state.industryData[CONTRACT].gmPercent,
    gmpPromotional: state.industryData[PROMOTIONAL].gmPercent,
    gmpTotal: state.industryData[TOTAL].gmPercent,

    subTitle: "Industry Data"
  }
}

const mapDispatchToProps = dispatch =>
{
  return {
    onStandardGmRevUpdate: revStandard =>
    {
      dispatch( setIndustryStandardGmRev( revStandard ) )
    },
    onDiscountGmRevUpdate: revDiscount =>
    {
      dispatch( setIndustryDiscountGmRev( revDiscount ) )
    },
    onSegmentedGmRevUpdate: revDiscount =>
    {
      dispatch( setIndustrySegmentedGmRev( revDiscount ) )
    },
    onContractGmRevUpdate: revDiscount =>
    {
      dispatch( setIndustryContractGmRev( revDiscount ) )
    },
    onPromotionalGmRevUpdate: revPromotional =>
    {
      dispatch( setIndustryPromotionalGmRev( revPromotional ) )
    },

    onStandardGmCogUpdate: cogStandard =>
    {
      dispatch( setIndustryStandardGmCogs( cogStandard ) )
    },
    onDiscountGmCogUpdate: cogDiscount =>
    {
      dispatch( setIndustryDiscountGmCogs( cogDiscount ) )
    },
    onSegmentedGmCogUpdate: cogSegmented =>
    {
      dispatch( setIndustrySegmentedGmCogs( cogSegmented ) )
    },
    onContractGmCogUpdate: cogContract =>
    {
      dispatch( setIndustryContractGmCogs( cogContract ) )
    },
    onPromotionalGmCogUpdate: cogPromotional =>
    {
      dispatch( setIndustryPromotionalGmCogs( cogPromotional ) )
    }
  }
}

const RevenueFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueForm)

module.exports = RevenueFormContainer;