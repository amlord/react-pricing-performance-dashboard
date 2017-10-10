// helper functions
let HelperFunctions = require('./HelperFunctions.js');

// ----- PRIVATE FUNCTIONS ----------------------------------------------
function _waterfallBarSelect(d)
{
    // blank out all charts
    d3.selectAll(".waterfallChart__bar")
        .classed("waterfallChart__bar--blank", true);

    // highlight the hovered chart
    d3.selectAll(".waterfallChart__bar--" + d.name.toLowerCase())
        .classed("waterfallChart__bar--blank", false)
        .classed("waterfallChart__bar--hover", true);
}

function _waterfallBarClear()
{
    // blank out all charts
    d3.selectAll(".waterfallChart__bar")
        .classed("waterfallChart__bar--blank", false)
        .classed("waterfallChart__bar--hover", false);
}


function _revenueMixArcSelect(d)
{
    d3.selectAll(".revenueChart__arc")
        .classed("revenueChart__arc--blank", true);

    d3.selectAll(".revenueChart__arc--" + d.name.toLowerCase())
        .classed("revenueChart__arc--blank", false)
        .classed("revenueChart__arc--hover", true);

    d3.select(".revenueChartLabel__type").text( d.displayName );

    d3.select(".revenueChartLabel__revenueValue").text( HelperFunctions.formatCurrency( d.revenue ) );

    d3.select(".revenueChartLabel__gmBg").attr( "class", "revenueChartLabel__gmBg");

    d3.select(".revenueChartLabel__revenueMix")
        .classed("revenueChartLabel__revenueMix--hover", true)
        .text( "(" + d.revenueMix + "% of total mix)" );

    d3.selectAll(".revenueChart__segmentLabel")
        .classed("revenueChart__segmentLabel--blank", true);

    d3.selectAll(".revenueChart__segmentLabel--" + d.name.toLowerCase())
        .classed("revenueChart__segmentLabel--blank", false);

    d3.selectAll(".revenueChart__targetArc--" + d.name.toLowerCase())
        .classed("revenueChart__targetArc--visible", true);

    d3.selectAll(".revenueChart__averageLabelRevenueText")
        .text(d.industryRevenuePercent + "%");

    d3.selectAll(".revenueChart__averageLabel")
        .attr("display", "block");
}

function _revenueMixArcClear(d, totals, targetGM)
{
    d3.selectAll(".revenueChart__arc")
        .classed("revenueChart__arc--blank", false)
        .classed("revenueChart__arc--hover", false);

    d3.select(".revenueChartLabel__type").text( totals.displayName );

    d3.select(".revenueChartLabel__revenueValue").text( HelperFunctions.formatCurrency( totals.revenue ) );

    d3.select(".revenueChartLabel__gmBg")
        .attr( "class", "revenueChartLabel__gmBg revenueChartLabel__gmBg--" + HelperFunctions.gmPercentColour( totals.gmPercent, targetGM ) );

    d3.select(".revenueChartLabel__revenueMix")
        .classed("revenueChartLabel__revenueMix--hover", false)
        .text( "(100% of total mix)" );
        
    d3.selectAll(".revenueChart__segmentLabel")
        .classed("revenueChart__segmentLabel--blank", false);

    d3.selectAll(".revenueChart__targetArc--" + d.name.toLowerCase())
        .classed("revenueChart__targetArc--visible", false);

    d3.selectAll(".revenueChart__averageLabel")
        .attr("display", "none");
}

function _pricingTypeSelect( type )
{
    d3.selectAll(".pricingType--" + type.toLowerCase())
        .classed("pricingType--current", true);
}

function _pricingTypeClear( )
{
    d3.selectAll(".pricingType")
        .classed("pricingType--current", false);
}

function _revenueMixValue(revenue, totalRevenue)
{
    return HelperFunctions.formatFloat( ( revenue / totalRevenue ) * 100, 1 );
}

// ***** PUBLIC FUNCTIONS ****************************************************
const PricingOverviewInteraction =
{
    highlight: function(
        highlight = false,
        segmentName = "STANDARD",
        segmentDisplayName = "Standard",
        gmPercent = 0,
        revenue = 0,
        industryRevenuePercent = 0,
        totals = {
            revenue: 0,
            gmPercent: 0,
            displayName: "Overview"
        },
        targetGM = 0
    )
    {
        if( highlight && segmentName !== "Overall" )
        {
            // highlight the relevant pricing type panel
            _pricingTypeSelect( segmentName );

            // highlight the selected 'GM waterfall erosion' bar
            _waterfallBarSelect({ name: segmentName });

            // highlight the selected 'revenue mix' arc
            _revenueMixArcSelect({
                name: segmentName,
                displayName: segmentDisplayName,
                revenue: revenue,
                revenueMix: _revenueMixValue(revenue, totals.revenue),
                gmPercent: gmPercent,
                industryRevenuePercent: industryRevenuePercent
            });
        }
        else
        {
            // clear any highlighted pricing types
            _pricingTypeClear();

            // clear any selected 'GM waterfall erosion' bars
            _waterfallBarClear();

            // clear any highlighted 'revenue mix' arcs
            _revenueMixArcClear(
                {
                    name: segmentName
                },
                totals,
                targetGM
            );
        }
    }
};

module.exports = PricingOverviewInteraction;