import Axios from 'axios';
import { useState } from 'react';
import config from './config.js';

const PropertySearcherForm = (props) => {
    const [formData, setFormData] = useState({
        loanSize:     null,
        propertyType: 'SingleFamily',
        creditScore:  null,
        occupancy:    'Primary'
    });
    
    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const {api_url, api_key} = config.ownup;
        const payload = {
            headers: {
                authorization: `OU-AUTH ${api_key}`,
            },
            params: formData,
        };
        Axios.get(api_url, payload)
        .catch((error) => {
            console.log(error);
        })
        .then((response) => {
            console.log(response);
        })
        console.log(`Submission handler ran with ${payload}`);
    }

    return (
      <div className="PropertySearcherForm">
        <form onSubmit={onSubmitHandler}>
            <table>
                <tbody>
                <tr>
                    <td><label htmlFor="loanSize">Loan Size</label></td>
                    <td><input id="loanSize" name="loanSize" onChange = {onChangeHandler}></input></td>
                    <td><label htmlFor="propertyType">Property Type</label></td>
                    <td><select id="propertyType" name="propertyType" onChange = {onChangeHandler}>
                        <option value="SingleFamily">Single Family</option>
                        <option value="MultiFamily">Multi-Family</option>
                        <option value="Condo">Condo</option>
                        <option value="Townhouse">Townhouse</option>
                    </select></td>
                </tr>
                <tr>
                    <td><label htmlFor="creditScore">Credit Score</label></td>
                    <td><input id="creditScore" name="creditScore" onChange = {onChangeHandler}></input></td>
                    <td><label htmlFor="occupancy">Occupancy</label></td>
                    <td><select id="occupancy" name="occupancy" onChange = {onChangeHandler}>
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