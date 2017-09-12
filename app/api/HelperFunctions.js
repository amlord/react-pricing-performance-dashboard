// ----- PRIVATE FUNCTIONS ----------------------------------------------
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

// function to format a floating point number to x decimal places
function _formatFloat( amount, decimalPlaces )
{
    return parseFloat(Math.round(amount * 100) / 100).toFixed(decimalPlaces)
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

// ***** PUBLIC FUNCTIONS ****************************************************
const HelperFunctions =
{
    gmPercentColour: function( gmPercent, target )
    {
        return _gmPercentColour( gmPercent, target );
    },
    formatGM: function( amount )
    {
        return _formatGM( amount );
    },
    formatFloat: function( amount, decimalPlaces )
    {
        return _formatFloat( amount, decimalPlaces );
    },
    formatCurrency: function( amount )
    {
        return _formatCurrency( amount );
    }
};

module.exports = HelperFunctions;