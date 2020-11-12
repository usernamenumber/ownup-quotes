import './PropertySearcherResultsList.css';
import { connect } from 'react-redux'
import utils from './utils';

const PropertySearcherResultsList = (props) => {
    console.log("results rendering");
    console.log(props);
    const output_rows = props.quotes.map( (quotedata) => {
        const {lenderName, loanType, interestRate, closingCosts, monthlyPayment, apr} = quotedata;
        const key = `${lenderName}::${loanType}`;
        return (
            <tr key={key}>
                <td className='lenderName'>{lenderName}</td>
                <td className='loanType'>{loanType}</td>
                <td className='interestRate'>{Number.parseFloat(interestRate).toFixed(3)}</td>
                <td className='closingCosts'>{Number.parseFloat(closingCosts).toFixed(0)}</td>
                <td className='monthlyPayment'>{Number.parseFloat(monthlyPayment).toFixed(2)}</td>
                <td className='apr'>{Number.parseFloat(apr).toFixed(3)}</td>
            </tr>
        );
    }); 
    return (
        <div className="PropertySearcherResultsList">
            <table cellspacing="0">
                <thead>
                    <tr>
                        <th>Lender</th>
                        <th>Product</th>
                        <th>Rate</th>
                        <th>Closing Costs</th>
                        <th>Monthly Payment</th>
                        <th>APR</th>
                    </tr>
                </thead>
                <tbody>
                    {output_rows}
                </tbody>
            </table>
        </div>
    )
}

export default connect(
    (state) => ({
        quotes: state.quotes,
    }),
    null
)(PropertySearcherResultsList);