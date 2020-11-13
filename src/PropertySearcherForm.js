import Axios from 'axios';
import config from './config.js';
import './PropertySearcherForm.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import redux_actions from './redux/actions';

const PropertySearcherForm = (props) => {
    const [formData, setFormData] = useState({
        loanSize:     '',
        propertyType: 'SingleFamily',
        creditScore:  '',
        occupancy:    'Primary'
    });

    const [errors, setErrors] = useState({});
    
    const validateField = (name, value) => {
        console.log(`checking ${name} '${value}'`);
        let errmsg;
        switch (name) {
            case 'loanSize':
                if (value === '' || isNaN(value)) {
                    errmsg = 'Loan size must be a number';
                } 
                break;
            case 'creditScore':
                if (value === '' || (isNaN(value) || value < 300 || value > 800)) {
                    errmsg = 'Credit score must be a number between 300 and 800';
                } 
                break;
            default:
                break;
        }
        setErrors({...errors, name: errmsg});
        console.log(`returning '${errmsg}`);
        return errmsg;
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        validateField(name, value);
        setFormData({...formData, [name]: value});
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        // TODO: this is reeeally hacky, but the setError()s
        // run in validateField() aren't triggering an update
        // of the errors list in this context (works in onChange)
        let _errors = {};
        for (let field in formData) {
            const value = formData[field];
            const msg = validateField(field, value);
            if (typeof(msg) !== 'undefined') {
                _errors[field] = msg;
            }
        }
        if (Object.keys(_errors).length > 0) {
            setErrors({...errors, ..._errors})
            return;
        }

        const {api_url, api_key} = config.ownup;
        const payload = {
            headers: {
                authorization: `OU-AUTH ${api_key}`,
            },
            params: formData,
        };
        console.log('Fetching quotes...');
        props.quoteUpdateStart();
        Axios.get(api_url, payload)
        .then((response) => {
            console.log('Loading quotes into store');
            console.log(response);
            props.updateQuotes(response.data.rateQuotes);
        })
        .catch((error) => {
            setErrors(error);
            console.error(error);
        })
        .then(() => {
            props.quoteUpdateFinish();
        })
    }

    const errorList = () => Object.keys(errors).map( (field) => (
        <div key={field} className='error'>{errors[field]}</div>
    ));

    return (
      <div className="PropertySearcherForm">
        <form onSubmit={onSubmitHandler}>
            <table>
                <tbody>
                <tr>
                    <td><label htmlFor="loanSize">Loan Size</label></td>
                    <td><input id="loanSize" name="loanSize" onChange = {onChangeHandler} value={formData.loanSize}></input></td>
                    <td><label htmlFor="propertyType">Property Type</label></td>
                    <td><select id="propertyType" name="propertyType" onChange = {onChangeHandler} value={formData.propertyType}>
                        <option value="SingleFamily">Single Family</option>
                        <option value="MultiFamily">Multi-Family</option>
                        <option value="Condo">Condo</option>
                        <option value="Townhouse">Townhouse</option>
                    </select></td>
                </tr>
                <tr>
                    <td><label htmlFor="creditScore">Credit Score</label></td>
                    <td><input id="creditScore" name="creditScore" onChange = {onChangeHandler} value={formData.creditScore}></input></td>
                    <td><label htmlFor="occupancy">Occupancy</label></td>
                    <td><select id="occupancy" name="occupancy" onChange = {onChangeHandler} value={formData.occupancy}>
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
        {errorList()}
      </div>
    );
  }

  export default connect(
      null,
      redux_actions,
  )(PropertySearcherForm);