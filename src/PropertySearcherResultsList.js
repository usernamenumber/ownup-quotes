import { connect } from 'react-redux'

const PropertySearcherResultsList = (props) => {
    console.log("results rendering");
    console.log(props);
    const output_rows = props.quotes.map( (quotedata) => {
        const {lenderName, loanType, interestRate, closingCosts, monthlyPayment, apr} = quotedata;
        const key = `${lenderName}::${loanType}`;
        return (
            <tr key={key}>
                <td>{lenderName}</td>
                <td>{loanType}</td>
                <td>{interestRate}</td>
                <td>{closingCosts}</td>
                <td>{monthlyPayment}</td>
                <td>{apr}</td>
            </tr>
        );
    }); 
    return (
        <div className="PropertySearcherResultsList">
            <table>
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