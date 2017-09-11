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

    let pieBg = svg.append("circle")
                    .classed("revenueChart__pieBg", true)
                    .attr("cx", width / 2 )
                    .attr("cy", height / 2 )
                    .attr("r", radius );
    
    let targetChart = svg.append("g")
                    .classed("revenueChart__targetArcs", true)
                    .attr("transform", "translate(" + ( width / 2 ) + "," + ( height / 2 ) + ")");

    let targetPieBg = svg.append("circle")
                    .classed("revenueChart__targetPieBg", true)
                    .attr("cx", width / 2 )
                    .attr("cy", height / 2 )
                    .attr("r", targetRadius - ( targetRadiusGap / 2 ) );
    
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
                _sectionSelect(d);
            })
            .on("mouseout", function(d,i){
                _sectionClear(d, totals, targetGM);
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

    targetArc.append("line")
        .classed("revenueChart__targetLineEnd", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", d => { return (targetRadius + 5) * Math.sin(d.endAngle); })
        .attr("y2", d => { return (targetRadius + 5) * Math.cos(d.endAngle) * -1; });

    targetArc.append("text")
        .classed("revenueChart__industryAverageText", true)
        .text( d => { return d.data.industryRevenuePercent + "%"; } )
        .attr("x", function(d) {
            const width = this.getBBox().width;
            const targetTickEnd = (targetRadius + 5) * Math.sin(d.endAngle);

            if( Math.sin(d.endAngle) < 0 )
            {
                return targetTickEnd - width;
            }

            return targetTickEnd;
        })
        .attr("y", function(d) {
            const height = this.getBBox().height;
            const targetTickEnd = (targetRadius + 5) * Math.cos(d.endAngle) * -1;

            if( Math.cos(d.endAngle) < 0 )
            {
                return targetTickEnd + height;
            }
            
            return targetTickEnd - (height / 2);
        });

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
        .attr("dy", ( height / 2 ) - 33 );

    // revenue value
    pieFg.append("text")
        .classed("revenueChartLabel__revenueValue", true)
        .text( _formatCurrency( totals.revenue ) )
        .attr("dx", width / 2 )
        .attr("dy", ( height / 2 ) - 8 );

    let gmPercentPanel = {
        height: 30,
        width: 80
    };

    // gm percent text background
    pieFg.append("rect")
        .attr("class", "revenueChartLabel__gmBg revenueChartLabel__gmBg--" + _gmPercentColour( totals.gmPercent, targetGM ))
        .attr("height", gmPercentPanel.height )
        .attr("width", gmPercentPanel.width )
        .attr("x", ( width / 2 ) - ( gmPercentPanel.width / 2 ) )
        .attr("y", ( height / 2 ) + 11 )
        .attr("rx", 4 )
        .attr("ry", 4 )
        .attr("fill", _gmPercentColour( totals.gmPercent, targetGM ));

    // gm percent text
    pieFg.append("text")
        .attr("class", "revenueChartLabel__gmPercent revenueChartLabel__gmPercent--" + _gmPercentColour( totals.gmPercent, targetGM ))
        .text( _formatGM( totals.gmPercent ) )
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
        .text( d => d.data.name )
        .attr("x", 38)
        .attr("y", (d,i) => 40 * i )
        .attr("dy", 3);

    segmentLabel
        .append("text")
        .classed("revenueChart__segmentLabelRevenueText", true)
        .text( d => _formatCurrency( d.data.revenue ) )
        .attr("x", 38)
        .attr("y", (d,i) => 40 * i )
        .attr("dy", 17);
        
    segmentLabel
        .append("rect")
        .classed("revenueChart__segmentLabelOverlay", true)
        .attr("x", 0)
        .attr("y", (d,i) => 40 * i )
        .on("mouseover", function(d,i){
            _sectionSelect(d);
        })
        .on("mouseout", function(d,i){
            _sectionClear(d, totals, targetGM);
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
        .text( "Industry average" )
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

// function to format revenue value consistently
function _formatCurrency( amount )
{
    return "£" + amount.format(0, 3, ',', '.');
}

// function to format GM% value consistently
function _formatGM( amount )
{
    return amount + "% GM";
}

// function to format GM% colour consistently
function _gmPercentColour( gmPercent, target )
{
    if( gmPercent >= target )
    {
        return "ok";
    }

    if( ( gmPercent >= ( target - 3 ) ) )
    {
        return "caution";
    }

    return "warning";
}

function _sectionSelect(d)
{
    d3.selectAll(".revenueChart__arc")
        .classed("revenueChart__arc--blank", true);

    d3.selectAll(".revenueChart__arc--" + d.data.name.toLowerCase())
        .classed("revenueChart__arc--blank", false)
        .classed("revenueChart__arc--hover", true);

    d3.select(".revenueChartLabel__type").text( d.data.name );

    d3.select(".revenueChartLabel__revenueValue").text( _formatCurrency( d.data.revenue ) );

    d3.select(".revenueChartLabel__gmBg").attr( "class", "revenueChartLabel__gmBg");

    d3.select(".revenueChartLabel__gmPercent")
        .classed("revenueChartLabel__gmPercent--hover", true)
        .text( _formatGM( d.data.gmPercent ) );

    d3.selectAll(".revenueChart__segmentLabel")
        .classed("revenueChart__segmentLabel--blank", true);

    d3.selectAll(".revenueChart__segmentLabel--" + d.data.name.toLowerCase())
        .classed("revenueChart__segmentLabel--blank", false);

    d3.selectAll(".revenueChart__targetArc--" + d.data.name.toLowerCase())
        .classed("revenueChart__targetArc--visible", true);

    d3.selectAll(".revenueChart__averageLabelRevenueText")
        .text(d.data.industryRevenuePercent + "%");

    d3.selectAll(".revenueChart__averageLabel")
        .attr("display", "block");
}

function _sectionClear(d, totals, targetGM)
{
    d3.selectAll(".revenueChart__arc")
        .classed("revenueChart__arc--blank", false)
        .classed("revenueChart__arc--hover", false);

    d3.select(".revenueChartLabel__type").text( totals.displayName );

    d3.select(".revenueChartLabel__revenueValue").text( _formatCurrency( totals.revenue ) );

    d3.select(".revenueChartLabel__gmBg")
        .attr( "class", "revenueChartLabel__gmBg revenueChartLabel__gmBg--" + _gmPercentColour( totals.gmPercent, targetGM ) );

    d3.select(".revenueChartLabel__gmPercent")
        .classed("revenueChartLabel__gmPercent--hover", false)
        .text( _formatGM( totals.gmPercent ) );
        
    d3.selectAll(".revenueChart__segmentLabel")
        .classed("revenueChart__segmentLabel--blank", false);

    d3.selectAll(".revenueChart__targetArc--" + d.data.name.toLowerCase())
        .classed("revenueChart__targetArc--visible", false);

    d3.selectAll(".revenueChart__averageLabel")
        .attr("display", "none");
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