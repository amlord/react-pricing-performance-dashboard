// custom d3 chart api for the revenue mix chart
let PricingOverviewInteraction = require('./PricingOverviewInteraction.js');
let HelperFunctions = require('./HelperFunctions.js');

// constants
const GOLDEN_RATIO = 1.61803398875;

// ----- PRIVATE FUNCTIONS ----------------------------------------------
function _drawGmWaterfallChart( data, targetGm, revenueMix )
{
    const dataRange  = data.map( d => {
        return d.cumalative.gm;
    } );

    dataRange.push( targetGm );

    // get min & max data values
    let dExtent = d3.extent( dataRange );

    // calculate height & width (using golden ratio)
    let width = document.querySelector('.waterfallChart').offsetWidth;
    let height = width / GOLDEN_RATIO;
    
    let margin = {
        top: 10,
        bottom: 25,
        left: 50,
        right: 10
    };
    let innerWidth = width - margin.left - margin.right;
    let innerHeight = height - margin.top - margin.bottom;

    d3.select(".waterfallChart svg").remove();

    let svg = d3.select(".waterfallChart").append("svg")
                // responsive SVG needs these 2 attributes and no width and height attr
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", "0 0 " + width + " " + height);
    
    let chart = svg.append("g")
                    .classed("waterfallChart__bars", true)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let xAxisGroup = svg.append("g")
                    .classed("waterfallChart__axis waterfallChart__axis--x", true)
                    .attr("transform", "translate(" + margin.left + "," + ( height - margin.bottom ) + ")");

    let yAxisGroup = svg.append("g")
                    .classed("waterfallChart__axis waterfallChart__axis--y", true)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    yAxisGroup.append("text")
        .classed("waterfallChart__axisLabel waterfallChart__axisLabel--y", true)
        .text("Gross Margin %")
        .attr("x", ( innerHeight / 2 ) * -1 )
        .attr("y", -40 )
        .attr("transform", "rotate(270)" );
    
    let target = svg.append("g")
                    .classed("waterfallChart__targetGm", true)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let y = d3.scaleLinear()
        .domain([dExtent[0] - 3, dExtent[1]])
        .range([innerHeight, 0]);

    let x = d3.scaleBand()
        .domain(data.map(d =>
        {
            return d.displayName;
        }))
        .range([0, innerWidth]);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    let yPos = [];

    // add bars to the chart
    chart.selectAll(".waterfallChart__bar")
        .data(data)
        .enter()
            .append("rect")
            .attr("class", (d,i) => {
                let classes = "waterfallChart__bar waterfallChart__bar--" + d.name.toLowerCase();

                if( i !== ( data.length - 1 ) )
                {
                    return classes;
                }

                return classes + " waterfallChart__bar--" + HelperFunctions.gmPercentColour( d.gmDiff, targetGm );
            })
            .attr("x", (d, i) =>
            {
                return x(d.displayName) + ( x.bandwidth() * 0.125 );
            })
            .attr("y", (d, i) =>
            {
                // first & last bars
                if(i === 0 || i === ( data.length - 1 ) )
                {
                    return y(d.gmDiff);
                }

                /* bars 'eroding' first bar value (+ve / -ve 
                    depending on cumalative GM% effect) */
                return ( data[i].cumalative.gm > data[i-1].cumalative.gm ) ?
                    y( parseFloat( data[i].cumalative.gm ) ) :
                    y( parseFloat( data[i-1].cumalative.gm ) );
            })
            .attr("width", x.bandwidth() - ( x.bandwidth() * 0.25 ) )
            .attr("height", (d, i) =>
            {
                let basicBarHeight = y( Math.abs( d.cumalative.gm ) ),
                    previousBarHeight = y( Math.abs( d.cumalative.gm ) + Math.abs(d.gmDiff) );

                if( i === 0 || i === ( data.length - 1 ) )
                {
                    return  innerHeight - y(Math.abs(d.gmDiff));
                }

                const barHeight = Math.abs( previousBarHeight - basicBarHeight );

                // make sure the bar is always visible
                return barHeight !== 0 ? barHeight : 1;
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .on("mouseover", function(d,i){
                let selectedItem = revenueMix.data.find(item => {
                    return item.name === d.name;
                });

                if( !selectedItem ) {
                    return;
                }

                // highlight the selected revenue mix piechart segment & gm waterfall bar
                PricingOverviewInteraction.highlight(
                    true,
                    d.name,
                    d.displayName,
                    d.gmPercent,
                    selectedItem.revenue,
                    selectedItem.industryRevenuePercent,
                    { revenue: revenueMix.totals.revenue, gmPercent: revenueMix.totals.gmPercent },
                    targetGm
                );
            })
            .on("mouseout", function(d,i){
                // clear the highlighted revenue mix piechart segments & gm waterfall bars
                PricingOverviewInteraction.highlight(
                    false,
                    d.name,
                    d.displayName,
                    d.gmPercent,
                    0,
                    0,
                    {
                        revenue: revenueMix.totals.revenue,
                        gmPercent: revenueMix.totals.gmPercent,
                        displayName: revenueMix.totals.displayName
                    },
                    targetGm
                );
            });;

    chart.append("rect")
        .attr("class", () => {
            return  "waterfallChart__bar waterfallChart__bar--" + data[0].name.toLowerCase();
        })
        .attr("height", 4)
        .attr("width", x.bandwidth() - ( x.bandwidth() * 0.25 ) )
        .attr("x", () =>
        {
            return x(data[0].displayName) + ( x.bandwidth() * 0.125 );
        })
        .attr("y", () =>
        {
            return innerHeight - 4;
        });

    chart.append("rect")
        .attr("class", () => {
            let classes = "waterfallChart__bar waterfallChart__bar--" + data[data.length-1].name.toLowerCase();

            return classes + " waterfallChart__bar--" + HelperFunctions.gmPercentColour( data[data.length-1].gmDiff, targetGm );
        })
        .attr("height", 4)
        .attr("width", x.bandwidth() - ( x.bandwidth() * 0.25 ) )
        .attr("x", () =>
        {
            return x(data[data.length-1].displayName) + ( x.bandwidth() * 0.125 );
        })
        .attr("y", () =>
        {
            return innerHeight - 4;
        });

    // add dotted to the chart
    chart.selectAll(".waterfallChart__dottedLines")
        .data(data)
        .enter()
            .append("line")
            .classed("waterfallChart__dottedLine", true)
            .attr("x1", (d, i) =>
            {
                return x(d.displayName) - ( x.bandwidth() * 0.125 ) + 3;
            })
            .attr("x2", (d, i) =>
            {
                return x(d.displayName) + ( x.bandwidth() * 0.125 ) - 3;
            })
            .attr("y1", (d, i) =>
            {
                return y( _dottedLineY( d, i, data ) );
            })
            .attr("y2", (d, i) =>
            {
                return y( _dottedLineY( d, i, data ) );
            });

    // add the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // add target GM% to the chart
    target
        .append("rect")
        .classed("waterfallChart__targetGmLine", true)
        .attr("x", 0)
        .attr("y", y(targetGm))
        .attr("width", innerWidth )
        .attr("height", 1);
    
    const targetBox = {
        width: 54,
        height: 16
    };

    target
        .append("rect")
        .classed("waterfallChart__targetGmBox", true)
        .attr("x", (innerWidth / 2) - (targetBox.width / 2) )
        .attr("y", y(targetGm) - (targetBox.height / 2) + 1 )
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("height", targetBox.height)
        .attr("width", targetBox.width);
    
    target
        .append("text")
        .classed("waterfallChart__targetGmText", true)
        .text("GM Target")
        .attr("x", (innerWidth / 2) )
        .attr("y", y(targetGm) + 4 );
}

// function to format revenue value consistently
function _dottedLineY( d, i, data )
{
    // first & last bars
    if( i === 0 || i === ( data.length - 1 ) )
    {
        return d.gmDiff;
    }

    // line at top or bottom of bar, depentant upon +ve / -ve effect
    return ( data[i].cumalative.gm <= data[i-1].cumalative.gm || d.gmDiff < 0 ) ?
        parseFloat( data[i-1].cumalative.gm ) :
        parseFloat( data[i].cumalative.gm );
}

// ***** PUBLIC FUNCTIONS ****************************************************
const GmWaterfallChart =
{
    draw: function( data, targetGm, revenueMix )
    {
        // draw the GM Waterfall chart
        _drawGmWaterfallChart( data, targetGm, revenueMix );
    },
    highlight: function( highlight = false, segmentName = "Standard" )
    {
        // find the selected item data
        let selectedItem = chartData.data.find(item => {
            return item.name === segmentName;
        });

        if( highlight && selectedItem && segmentName !== "Overall" )
        {
            // highlight the selected arc
            _sectionSelect({ name: segmentName });
        }
        else
        {
            // clear any highlighted arcs
            _sectionClear();
        }
    }
};

module.exports = GmWaterfallChart;