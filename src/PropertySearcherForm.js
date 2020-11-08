const PropertySearcherForm = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Submission handler ran with ${event}`);
    }
    return (
      <div className="PropertySearcherForm">
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                <tr>
                    <td><label htmlFor="loan_size">Loan Size</label></td>
                    <td><input name="loan_size"></input></td>
                    <td><label htmlFor="property_type">Property Type</label></td>
                    <td><select name="property_type">
                        <option value="SingleFamily">Single Family</option>
                        <option value="MultiFamily">Multi-Family</option>
                        <option value="Condo">Condo</option>
                        <option value="Townhouse">Townhouse</option>
                    </select></td>
                </tr>
                <tr>
                    <td><label htmlFor="credit_score">Credit Score</label></td>
                    <td><input name="credit_score"></input></td>
                    <td><label htmlFor="occupancy">Occupancy</label></td>
                    <td><select name="occupancy">
                        <option value="Primary">Primary</option>
                        <option value="Secondary">Secondary</option>
                        <option value="Investment">Investment</option>
                    </select></td>
                </tr>
                <tr>
                    <td colSpan="4"><input className="submit_button" type="submit" value="Quote Rates"/></td>
                </tr>
                </tbody>
            </table>
        </form>
      </div>
    );
  }
  
  export default PropertySearcherForm;