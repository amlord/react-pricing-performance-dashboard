// custom d3 chart api for cross-chart interaction
let PricingOverviewInteraction = require('./PricingOverviewInteraction.js');
let HelperFunctions = require('./HelperFunctions.js');

// constants
const GOLDEN_RATIO = 1.61803398875;


// ----- PRIVATE FUNCTIONS ----------------------------------------------
function _drawRevenueMixChart( data, totals, targetGM )
{
    // get min & max data values
    let dMax = d3.max(data, d => {
        return d.gmPercent;
    });

    // calculate height & width (using golden ratio)
    const width = document.querySelector('.revenueChart').offsetWidth,
        height = width / GOLDEN_RATIO;
    const margin = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const targetRadiusGap = 12;
    const targetRadius = ( Math.min(innerWidth, innerHeight) / 2 );
    const radius = targetRadius - targetRadiusGap;

    d3.select(".revenueChart svg").remove();

    let svg = d3.select(".revenueChart").append("svg")
                .classed("revenueChart__canvas", true)
                // responsive SVG needs these 2 attributes and no width and height attr
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + width + " " + height);
    
    let targetChart = svg.append("g")
                    .classed("revenueChart__targetArcs", true)
                    .attr("transform", "translate(" + ( width / 2 ) + "," + ( height / 2 ) + ")");

    let targetPieBg = svg.append("circle")
                    .classed("revenueChart__targetPieBg", true)
                    .attr("cx", width / 2 )
                    .attr("cy", height / 2 )
                    .attr("r", targetRadius - ( targetRadiusGap / 2 ) );
                    
    let pieBg = svg.append("circle")
                    .classed("revenueChart__pieBg", true)
                    .attr("cx", width / 2 )
                    .attr("cy", height / 2 )
                    .attr("r", radius );
    
    let chart = svg.append("g")
                    .classed("revenueChart__arcs", true)
                    .attr("transform", "translate(" + ( width / 2 ) + "," + ( height / 2 ) + ")");
    
    let pieFg = svg.append("g")
                    .classed("revenueChart__pieFg", true);
    
    let segmentLabels = svg.append("g")
                    .classed("revenueChart__segmentLabels", true);
    
    let averageLabel = svg.append("g")
                    .classed("revenueChart__averageLabel", true)
                    .attr("display", "none");

    // add pie arcs to the chart
    let pie = d3.pie()
        .sort(null)
        .value(d => { return d.revenue; });

    let path = d3.arc()
        .outerRadius( radius )
        .innerRadius(0);

    let dealerPieData = pie( data );

    let arc = chart.selectAll(".revenueChart__arc")
        .data( dealerPieData )
        .enter()
            .append("g")
            .attr("class", d => { return "revenueChart__arc revenueChart__arc--" + d.data.name.toLowerCase() })
            .on("mouseover", function(d,i){
                // highlight the selected revenue mix piechart segment & gm waterfall bar
                PricingOverviewInteraction.highlight(
                    true,
                    d.data.name,
                    d.data.displayName,
                    d.data.gmPercent,
                    d.data.revenue,
                    d.data.industryRevenuePercent,
                    totals,
                    targetGM
                );
            })
            .on("mouseout", function(d,i){
                // clear the highlighted revenue mix piechart segments & gm waterfall bars
                PricingOverviewInteraction.highlight(
                    false,
                    d.data.name,
                    d.data.displayName,
                    d.data.gmPercent,
                    d.data.revenue,
                    d.data.industryRevenuePercent,
                    totals,
                    targetGM
                );
            });

    arc.append("path")
        .attr("d", path);

    // add industry average target pie arcs to the chart
    let targetPie = d3.pie()
        .sort(null)
        .value(d => { return d.industryRevenue; });

    let targetPath = d3.arc()
        .outerRadius( targetRadius )
        .innerRadius(0);

    let industryPieData = targetPie( data );

    let targetArc = targetChart.selectAll(".revenueChart__targetArc")
        .data( industryPieData.map( (d,i) =>
        {
            const angleSize = d.endAngle - d.startAngle;

            d.startAngle = dealerPieData[i].startAngle;
            d.endAngle = d.startAngle + angleSize;

            return d;
        } ) )
        .enter()
            .append("g")
            .attr("class", d => { return "revenueChart__targetArc revenueChart__targetArc--" + d.data.name.toLowerCase() });

    targetArc.append("path")
        .attr("d", targetPath);

    // add foreground data circle
    pieFg.append("circle")
        .classed("revenueChart__pieFg", true)
        .attr("cx", width / 2 )
        .attr("cy", height / 2 )
        .attr("r", radius / GOLDEN_RATIO );

    // revenue type label
    pieFg.append("text")
        .classed("revenueChartLabel__type", true)
        .text( totals.displayName )
        .attr("dx", width / 2 )
        .attr("dy", ( height / 2 ) - 30 );

    // revenue value
    pieFg.append("text")
        .classed("revenueChartLabel__revenueValue", true)
        .text( HelperFunctions.formatCurrency( totals.revenue ) )
        .attr("dx", width / 2 )
        .attr("dy", ( height / 2 ) + 2 );

    // revenue mix text
    pieFg.append("text")
        .attr("class", "revenueChartLabel__revenueMix")
        .text( "(100% of total mix)" )
        .attr("dx", width / 2 )
        .attr("dy", ( height / 2 ) + 30 );

    // add pie chart segment labels
    let segmentLabel = segmentLabels.selectAll(".revenueChart__segmentLabel")
        .data( dealerPieData )
        .enter()
            .append("g")
                .attr("class", d => { return "revenueChart__segmentLabel revenueChart__segmentLabel--" + d.data.name.toLowerCase() } );

    segmentLabel
        .append("rect")
        .attr("class", d => { return "revenueChart__segmentLabelKey revenueChart__segmentLabelKey--" + d.data.name.toLowerCase() })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("x", 0)
        .attr("y", (d,i) => 40 * i );

    segmentLabel
        .append("text")
        .classed("revenueChart__segmentLabelTitleText", true)
        .text( d => d.data.displayName )
        .attr("x", 38)
        .attr("y", (d,i) => 40 * i )
        .attr("dy", 10);
        
    segmentLabel
        .append("rect")
        .classed("revenueChart__segmentLabelOverlay", true)
        .attr("x", 0)
        .attr("y", (d,i) => 40 * i )
        .on("mouseover", function(d,i){
            // highlight the selected revenue mix piechart segment & gm waterfall bar
            PricingOverviewInteraction.highlight(
                true,
                d.data.name,
                d.data.displayName,
                d.data.gmPercent,
                d.data.revenue,
                d.data.industryRevenuePercent,
                totals,
                targetGM
            );
        })
        .on("mouseout", function(d,i){
            // clear the highlighted revenue mix piechart segments & gm waterfall bars
            PricingOverviewInteraction.highlight(
                false,
                d.data.name,
                d.data.displayName,
                d.data.gmPercent,
                d.data.revenue,
                d.data.industryRevenuePercent,
                totals,
                targetGM
            );
        });
    
    // add industry average label
    let xPositon = width - 32;

    averageLabel
        .append("rect")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("x", xPositon)
        .attr("y", 0);

    averageLabel
        .append("text")
        .classed("revenueChart__averageLabelTitleText", true)
        .text( "Office Power Average Mix" )
        .attr("x", xPositon - 6)
        .attr("y", 0 )
        .attr("dy", 3);

    averageLabel
        .append("text")
        .classed("revenueChart__averageLabelRevenueText", true)
        .text( "Revenue Mix" )
        .attr("x", xPositon - 6)
        .attr("y", 0 )
        .attr("dy", 17);
}

// ***** PUBLIC FUNCTIONS ****************************************************
const RevenueMixChart =
{
    draw: function( data, totals, targetGm )
    {
        // draw the revenue mix interactive pie chart
        _drawRevenueMixChart( data, totals, targetGm );
    }
};

module.exports = RevenueMixChart;