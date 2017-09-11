let React = require('react');
let { connect } = require('react-redux');

class GmErosionForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            revStandard: props.revStandard,
            revDiscount: props.revDiscount,
            revSegmented: props.revSegmented,
            revContract: props.revContract,
            revPromotional: props.revPromotional,
            revTotal: props.revTotal,

            cogStandard: props.cogStandard,
            cogDiscount: props.cogDiscount,
            cogSegmented: props.cogSegmented,
            cogContract: props.cogContract,
            cogPromotional: props.cogPromotional,
            cogTotal: props.cogTotal,

            gmpStandard: props.gmpStandard,
            gmpDiscount: props.gmpDiscount,
            gmpSegmented: props.gmpSegmented,
            gmpContract: props.gmpContract,
            gmpPromotional: props.gmpPromotional,
            gmpTotal: props.gmpTotal,

            subTitle: props.subTitle
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

        switch (name) {
            case 'revStandard':
                this.setState(
                    { revStandard: value },
                    () => { this.props.onStandardGmRevUpdate( value ); }
                );
                break;
            case 'revDiscount':
                this.setState(
                    { revDiscount: value },
                    () => { this.props.onDiscountGmRevUpdate( value ); }
                );
                break;
            case 'revSegmented':
                this.setState(
                    { revSegmented: value },
                    () => { this.props.onSegmentedGmRevUpdate( value ); }
                );
                break;
            case 'revContract':
                this.setState(
                    { revContract: value },
                    () => { this.props.onContractGmRevUpdate( value ); }
                );
                break;
            case 'revPromotional':
                this.setState(
                    { revPromotional: value },
                    () => { this.props.onPromotionalGmRevUpdate( value ); }
                );
                break;
            case 'cogStandard':
                this.setState(
                    { cogStandard: value },
                    () => { this.props.onStandardGmCogUpdate( value ); }
                );
                break;
            case 'cogDiscount':
                this.setState(
                    { cogDiscount: value },
                    () => { this.props.onDiscountGmCogUpdate( value ); }
                );
                break;
            case 'cogSegmented':
                this.setState(
                    { cogSegmented: value },
                    () => { this.props.onSegmentedGmCogUpdate( value ); }
                );
                break;
            case 'cogContract':
                this.setState(
                    { cogContract: value },
                    () => { this.props.onContractGmCogUpdate( value ); }
                );
                break;
            case 'cogPromotional':
                this.setState(
                    { cogPromotional: value },
                    () => { this.props.onPromotionalGmCogUpdate( value ); }
                );
                break;
        }
    }

    componentWillReceiveProps( nextProps )
    {
        let { revTotal, cogTotal, gmpStandard, gmpDiscount, gmpSegmented, gmpContract, gmpPromotional, gmpTotal } = this.state;

        if( nextProps.revTotal !== revTotal )
        {
            this.setState({
                revTotal: nextProps.revTotal
            });
        }

        if( nextProps.cogTotal !== cogTotal )
        {
            this.setState({
                cogTotal: nextProps.cogTotal
            });
        }

        if( nextProps.gmpStandard !== gmpStandard )
        {
            this.setState({
                gmpStandard: nextProps.gmpStandard
            });
        }

        if( nextProps.gmpDiscount !== gmpDiscount )
        {
            this.setState({
                gmpDiscount: nextProps.gmpDiscount
            });
        }

        if( nextProps.gmpSegmented !== gmpSegmented )
        {
            this.setState({
                gmpSegmented: nextProps.gmpSegmented
            });
        }

        if( nextProps.gmpContract !== gmpContract )
        {
            this.setState({
                gmpContract: nextProps.gmpContract
            });
        }

        if( nextProps.gmpPromotional !== gmpPromotional )
        {
            this.setState({
                gmpPromotional: nextProps.gmpPromotional
            });
        }

        if( nextProps.gmpTotal !== gmpTotal )
        {
            this.setState({
                gmpTotal: nextProps.gmpTotal
            });
        }
    }

    render()
    {
        return (
            <div className="panel">
                <header className="panelHeader panelHeader--info">
                    <h1>Revenue &amp; Cost of Goods <small>({this.state.subTitle})</small></h1>
                </header>
                <div className="panelBody">
                    <form>
                        <table className="table table--full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Standard</th>
                                    <th>Discount</th>
                                    <th>Segmented</th>
                                    <th>Contract</th>
                                    <th>Promo</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Revenue</td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="revStandard"
                                                value={this.state.revStandard}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="revDiscount"
                                                value={this.state.revDiscount}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="revSegmented"
                                                value={this.state.revSegmented}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="revContract"
                                                value={this.state.revContract}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="revPromotional"
                                                value={this.state.revPromotional}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                name="revTotal"
                                                value={this.state.revTotal}
                                                readOnly />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><abbr title="Cost of Goods">COGs</abbr></td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="cogStandard"
                                                value={this.state.cogStandard}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="cogDiscount"
                                                value={this.state.cogDiscount}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="cogSegmented"
                                                value={this.state.cogSegmented}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="cogContract"
                                                value={this.state.cogContract}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input 
                                                name="cogPromotional"
                                                value={this.state.cogPromotional}
                                                onChange={this.handleChange}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                name="cogTotal"
                                                value={this.state.cogTotal}
                                                readOnly />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><abbr title="Gross Margin">GM</abbr>%</td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                value={this.state.gmpStandard}
                                                readOnly />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                value={this.state.gmpDiscount}
                                                readOnly />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                value={this.state.gmpSegmented}
                                                readOnly />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                value={this.state.gmpContract}
                                                readOnly />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                value={this.state.gmpPromotional}
                                                readOnly />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fieldContainer">
                                            <input
                                                value={this.state.gmpTotal}
                                                readOnly />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}

module.exports = GmErosionForm;