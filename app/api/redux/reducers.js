let HelperFunctions = require('../HelperFunctions.js');

/* CONSTANTS */
const {
  STANDARD,
  DISCOUNT,
  SEGMENTED,
  CONTRACT,
  PROMOTIONAL,
  TOTAL,
  INIT,
  SET_STANDARD_REVENUE,
  SET_DISCOUNT_REVENUE,
  SET_SEGMENTED_REVENUE,
  SET_CONTRACT_REVENUE,
  SET_PROMOTIONAL_REVENUE,
  SET_STANDARD_COGS,
  SET_DISCOUNT_COGS,
  SET_SEGMENTED_COGS,
  SET_CONTRACT_COGS,
  SET_PROMOTIONAL_COGS,
  SET_INDUSTRY_STANDARD_REVENUE,
  SET_INDUSTRY_DISCOUNT_REVENUE,
  SET_INDUSTRY_SEGMENTED_REVENUE,
  SET_INDUSTRY_CONTRACT_REVENUE,
  SET_INDUSTRY_PROMOTIONAL_REVENUE,
  SET_INDUSTRY_STANDARD_COGS,
  SET_INDUSTRY_DISCOUNT_COGS,
  SET_INDUSTRY_SEGMENTED_COGS,
  SET_INDUSTRY_CONTRACT_COGS,
  SET_INDUSTRY_PROMOTIONAL_COGS,
  SET_TARGET_GM
} = require('./actions');

export const INITIAL_STATE = {
  data: [
    {
      name: 'STANDARD',
      displayName: 'Standard',
      revenue: 399895,
      cogs: 202740
    },{
      name: 'BASKET',
      displayName: 'Basket',
      revenue: 380779,
      cogs: 247323
    },{
      name: 'SEGMENT',
      displayName: 'Segment',
      revenue: 6434,
      cogs: 4166
    },{
      name: 'CUSTOMER',
      displayName: 'Customer',
      revenue: 204490,
      cogs: 148697
    },{
      name: 'PROMOTION',
      displayName: 'Promotion',
      revenue: 9032,
      cogs: 8619
    }
  ],
  industryData: [
    {
      name: 'STANDARD',
      displayName: 'Standard',
      revenue: 3892347,
      cogs: 1969636
    },{
      name: 'BASKET',
      displayName: 'Basket',
      revenue: 2311451,
      cogs: 1518352
    },{
      name: 'SEGMENT',
      displayName: 'Segment',
      revenue: 264930,
      cogs: 153170
    },{
      name: 'CUSTOMER',
      displayName: 'Customer',
      revenue: 1659665,
      cogs: 1102715
    },{
      name: 'PROMOTION',
      displayName: 'Promotion',
      revenue: 91053,
      cogs: 70113
    }
  ],
  target: 43
};

/* REDUCERS */
export function gmRevenueMixApp( state = initialState, action )
{
  let data = state.data,
      industryData = state.industryData,
      target = state.target;

  switch( action.type )
  {
    // initialisation
    case INIT:
      data = initData( state.data );
      industryData = initData( state.industryData );
      break;
    
    // dealer actions
    case SET_STANDARD_REVENUE:
      data = setDataRevenue( data, STANDARD, action.revenue );
      break;
    case SET_DISCOUNT_REVENUE:
      data = setDataRevenue( data, DISCOUNT, action.revenue );
      break;
    case SET_SEGMENTED_REVENUE:
      data = setDataRevenue( data, SEGMENTED, action.revenue );
      break;
    case SET_CONTRACT_REVENUE:
      data = setDataRevenue( data, CONTRACT, action.revenue );
      break;
    case SET_PROMOTIONAL_REVENUE:
      data = setDataRevenue( data, PROMOTIONAL, action.revenue );
      break;
    case SET_STANDARD_COGS:
      data = setDataCogs( data, STANDARD, action.cogs );
      break;
    case SET_DISCOUNT_COGS:
      data = setDataCogs( data, DISCOUNT, action.cogs );
      break;
    case SET_SEGMENTED_COGS:
      data = setDataCogs( data, SEGMENTED, action.cogs );
      break;
    case SET_CONTRACT_COGS:
      data = setDataCogs( data, CONTRACT, action.cogs );
      break;
    case SET_PROMOTIONAL_COGS:
      data = setDataCogs( data, PROMOTIONAL, action.cogs );
      break;
    
    // industry actions
    case SET_INDUSTRY_STANDARD_REVENUE:
      industryData = setDataRevenue( industryData, STANDARD, action.revenue );
      break;
    case SET_INDUSTRY_DISCOUNT_REVENUE:
      industryData = setDataRevenue( industryData, DISCOUNT, action.revenue );
      break;
    case SET_INDUSTRY_SEGMENTED_REVENUE:
      industryData = setDataRevenue( industryData, SEGMENTED, action.revenue );
      break;
    case SET_INDUSTRY_CONTRACT_REVENUE:
      industryData = setDataRevenue( industryData, CONTRACT, action.revenue );
      break;
    case SET_INDUSTRY_PROMOTIONAL_REVENUE:
      industryData = setDataRevenue( industryData, PROMOTIONAL, action.revenue );
      break;
    case SET_INDUSTRY_STANDARD_COGS:
      industryData = setDataCogs( industryData, STANDARD, action.cogs );
      break;
    case SET_INDUSTRY_DISCOUNT_COGS:
      industryData = setDataCogs( industryData, DISCOUNT, action.cogs );
      break;
    case SET_INDUSTRY_SEGMENTED_COGS:
      industryData = setDataCogs( industryData, SEGMENTED, action.cogs );
      break;
    case SET_INDUSTRY_CONTRACT_COGS:
      industryData = setDataCogs( industryData, CONTRACT, action.cogs );
      break;
    case SET_INDUSTRY_PROMOTIONAL_COGS:
      industryData = setDataCogs( industryData, PROMOTIONAL, action.cogs );
      break;
    
    // target GM%
    case SET_TARGET_GM:
      target = parseFloat(action.target);
      break;
  }

  return Object.assign( {}, state, {
    data: data,
    industryData: industryData,
    revenueMix: calcRevenueMixChartValues( data, industryData ),
    waterfall: calcWaterfallChartValues(data),
    target: target
  } );
}

/* HELPER FUNCTIONS */
function initData( data )
{
  data[STANDARD].gmPercent = calcGmPercent( data, STANDARD );
  data[DISCOUNT].gmPercent = calcGmPercent( data, DISCOUNT );
  data[SEGMENTED].gmPercent = calcGmPercent( data, SEGMENTED );
  data[CONTRACT].gmPercent = calcGmPercent( data, CONTRACT );
  data[PROMOTIONAL].gmPercent = calcGmPercent( data, PROMOTIONAL );

  data[TOTAL] = {
    name: "TOTAL",
    displayName: "Overall",
    revenue: calcDataTotalRevenue( data ),
    cogs: calcDataTotalCogs( data )
  };

  data[TOTAL].gmPercent = calcGmPercent( data, TOTAL );

  return data
}

function setDataRevenue( data, dataId, revenue )
{
  data[dataId].revenue = parseInt( revenue );
  data[dataId].gmPercent = calcGmPercent( data, dataId );

  data[TOTAL].revenue = calcDataTotalRevenue( data );
  data[TOTAL].gmPercent = calcGmPercent( data, TOTAL );

  return data;
}

function setDataCogs( data, dataId, cogs )
{
  data[dataId].cogs = parseInt( cogs );
  data[dataId].gmPercent = calcGmPercent( data, dataId );

  data[TOTAL].cogs = calcDataTotalCogs( data );
  data[TOTAL].gmPercent = calcGmPercent( data, TOTAL );

  return data;
}

function calcDataTotalRevenue( data )
{
  return data.reduce((sum, value) =>
  {
    return ( value.name.toUpperCase() !== "TOTAL" ) ? ( sum + value.revenue ) : sum;
  }, 0);
}

function calcDataTotalCogs( data )
{
  return data.reduce((sum, value) =>
  {
    return (value.name.toUpperCase() !== "TOTAL") ? (sum + value.cogs) : sum;
  }, 0);
}

function calcGmPercent( data, rowId )
{
  let gmPercent = ( ( data[rowId].revenue - data[rowId].cogs ) / data[rowId].revenue ) * 100;

  return HelperFunctions.formatFloat(gmPercent, 1);
}

function calcRevenueMixChartValues( data, industryData )
{
  let chartValues = [],
      activeData = data.slice();

  // remove totals
  const TOTAL = activeData.splice( activeData.length - 1, 1 )[0];

  // create the revenue mix chart data
  for (var i = 0; i < activeData.length; i++)
  {
    let revenuePercent = ( activeData[i].revenue / TOTAL.revenue ) * 100;
    let industryRevenuePercent = ( industryData[i].revenue / industryData[industryData.length-1].revenue ) * 100;

    // add chart data to the array
    chartValues.push({
      name: activeData[i].name,
      displayName: activeData[i].displayName,
      gmPercent: activeData[i].gmPercent,
      revenue: activeData[i].revenue,
      revenuePercent: revenuePercent.toFixed(1),
      industryRevenue: industryData[i].revenue,
      industryRevenuePercent: industryRevenuePercent.toFixed(1)
    });
  }

  // order array by revenue Percentage value
  chartValues.sort((a, b) =>
  {
    if(parseFloat(a.revenuePercent) < parseFloat(b.revenuePercent))
    {
      return 1;
    }
    if(parseFloat(a.revenuePercent) > parseFloat(b.revenuePercent))
    {
      return -1;
    }
    return 0;
  });

  return {
    data: chartValues,
    totals: TOTAL
  };
}

function calcFormattedGmPercent( revenue, cogs, decimalPlaces = null )
{
    // calulate GM%ge
    let gmPercent = ( ( revenue - cogs ) / revenue ) * 100;

    // format gmPercent, where required
    gmPercent = decimalPlaces !== null ? 
        parseFloat( gmPercent ).toFixed( decimalPlaces ) :
        gmPercent;

    return gmPercent;
}

function calcGmErosion( gmErosion, remainingTypes )
{
    while( remainingTypes.length )
    {
        let nextStep = nextErosionStep( gmErosion[gmErosion.length-1].cumalative, remainingTypes );

        // add next step to gmErosion array
        gmErosion.push( ...remainingTypes.filter( pricingType =>
        {
            return pricingType.name === nextStep;
        } ) );

        // add GM% calculations for next step
        gmErosion = calcLastErosionStepGm( gmErosion );

        // remove current step from remainingTypes
        remainingTypes = remainingTypes.filter( pricingType =>
        {
            return pricingType.name !== nextStep;
        } );
    }

    return gmErosion;
}

function nextErosionStep( currentState, remainingTypes )
{
    let negativeDiff = false;

    let nextBestGm = remainingTypes.reduce( ( sum, pricingType ) =>
    {
        let combinedGm = calcFormattedGmPercent(
                ( pricingType.revenue + currentState.revenue ),
                ( pricingType.cogs + currentState.cogs )
            ),
            combinedGmDiff = currentState.gm - combinedGm;

        // are we dealing with a -ve diff? (should go first)
        if( combinedGmDiff < 0 )
        {
            negativeDiff = true;
        }

        // best GM result so far?
        if( ( sum.gmDiff === null ) || // first result
            ( negativeDiff && combinedGmDiff < sum.gmDiff ) ||  // -ve diff, and largest -ve
            ( !negativeDiff && combinedGmDiff > sum.gmDiff ) )  // +ve diff, and largest +ve
        {
            return {
                type: pricingType.name,
                gmDiff: combinedGmDiff
            };
        }
    
        return sum;
    },{ 
        type: null,
        gmDiff: null
    });

    return nextBestGm.type;
}

function calcLastErosionStepGm( gmErosion )
{
    let last = gmErosion.length - 1;

    // calc GM% on last erosion step
    gmErosion[last].gm = calcFormattedGmPercent( gmErosion[last].revenue, gmErosion[last].cogs );

    // calc cumalative values
    gmErosion[last].cumalative = gmErosion.reduce( ( sum, pricingType ) =>
    {
        let revenue = sum.revenue + pricingType.revenue,
            cogs = sum.cogs + pricingType.cogs,
            gm = calcFormattedGmPercent( revenue, cogs, 1 );

        return {
            revenue,
            cogs,
            gm
        };
    },{
        revenue: 0,
        cogs: 0,
        gm: 0
    });
    
    // calc erosion from previous step
    gmErosion[ last ].gmDiff = gmErosion.length !== 1 ?
        gmErosion[ last - 1 ].cumalative.gm - gmErosion[ last ].cumalative.gm : 
        gmErosion[ last ].cumalative.gm; // first step, diff is GM%

    return gmErosion;
}

function calcWaterfallChartValues( data )
{
  // variables
  let remainingTypes = data.slice(); // copy full dataset
  let standard = remainingTypes.shift(); // remove "STANDARD" from full dataset
  let total = remainingTypes.pop(); // remove "TOTAL" from full dataset

  let gmErosion = calcLastErosionStepGm( [ standard ] ); // calc GM% values for the standard pricing type

  // calculate GM%ge erosion
  gmErosion = calcGmErosion( gmErosion, remainingTypes );

  // add the 'Total' column
  gmErosion.push({
    name: "TOTAL",
    displayName: total.displayName,
    revenue: 0,
    cogs: 0,
    gmPercent: total.gmPercent,
    cumalative: {
      revenue: 0,
      cogs: 0,
      gm: total.gmPercent
    },
    gm: 0,
    gmDiff: total.gmPercent
  });

  // results
  return gmErosion;
}