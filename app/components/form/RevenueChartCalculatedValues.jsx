let React = require('react');
let { connect } = require('react-redux');

class CalculatedValues extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            revenueMix: props.revenueMix,
            gmTarget: props.target
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange( event )
    {
        let value = parseInt( event.target.value );
        let name = event.target.name;

        if( isNaN( value ) )
        {
            value = 0;
        }

        this.setState(
            { gmTarget: value },
            () => { this.props.onTargetGmUpdate( value ); }
        );
    }

    componentWillReceiveProps( nextProps )
    {
        let { revenueMix, target } = this.state;

        if( nextProps.revenueMix !== revenueMix )
        {
            this.setState({
                revenueMix: nextProps.revenueMix
            });
        }

        if( nextProps.target !== target )
        {
            this.setState({
                gmTarget: nextProps.target
            });
        }
    }

    render()
    {
        return (
            <div className="panel">
                <header className="panelHeader panelHeader--info">
                    <h1>Revenue Mix <small>(Chart Values for Plotting)</small></h1>
                </header>
                <div className="panelBody">
                    <table className="table table--full">
                        <thead>
                            <tr>
                                <th></th>
                                {this.state.revenueMix.map((cell, index) => {
                                    return (
                                        <CalculatedValuesHeaderCell 
                                            name={cell.name}
                                            key={index}
                                        />
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="revenueData">
                                <td>Mix %ge</td>
                                {this.state.revenueMix.map((cell, index) => {
                                    return (
                                        <CalculatedValuesCell 
                                            index={index}
                                            value={cell.revenuePercent}
                                            key={index}
                                        />
                                    )
                                })}
                            </tr>
                            <tr className="revenueData">
                                <td>Average</td>
                                {this.state.revenueMix.map((cell, index) => {
                                    return (
                                        <CalculatedValuesCell 
                                            index={index}
                                            value={cell.industryRevenuePercent}
                                            key={index}
                                        />
                                    )
                                })}
                            </tr>
                            <tr className="revenueData">
                                <td>Target GM%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div className="fieldContainer">
                                        <input
                                            name="gmTarget"
                                            value={this.state.gmTarget}
                                            onChange={this.handleChange} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class CalculatedValuesHeaderCell extends React.Component
{
    render()
    {
        return (
            <th>{this.props.name}</th>
        )
    }
}

class CalculatedValuesCell extends React.Component
{
    render()
    {
        return (
            <td>
                <div className="fieldContainer">
                    <input
                        value={this.props.value}
                        readOnly />
                </div>
            </td>
        )
    }
}


module.exports = CalculatedValues;