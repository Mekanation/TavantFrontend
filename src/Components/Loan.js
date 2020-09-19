import React, { useState } from 'react';
import axios from 'axios';
import { getToken, removeUserSession } from '../Utils/Common'; 

function Loan(props){
    const [loading, setLoading] = useState(false);
    const loanName = useFormInput('');
    const [isIncomeVerified, setisIncomeVerified] = useState(false);
    const annualIncome = useFormInput('');
    const assetsValue = useFormInput('');
    const debtsValue = useFormInput('');
    const creditScore = useFormInput('');
    const loanAmountRequested = useFormInput('');

    const [error, setError] = useState(null);
    const token = "Bearer "+ getToken();


    var config = {
        method: 'post',
        url: 'http://18.207.205.219:8080/TavantDemo-1/api/v1/Loan/new',
        headers: { 
          'Content-Type': 'application/json',
          'authorization' : token
        },
        data: JSON.stringify({ 
            loanName: loanName.value, 
            isIncomeVerified: isIncomeVerified.value, 
            annualIncome: annualIncome.value, 
            assetsValue: assetsValue.value,
            debtsValue: debtsValue.value,
            creditScore: creditScore.value,
            loanAmountRequested: loanAmountRequested.value
        
        
        })
      };


    const handleApp = () => {
        setError(null);
        setLoading(true);
       
        axios(config)
        .then(response => {
            setLoading(false);
            console.log(response);
           props.history.push('/loans');
        }).catch(error => {
            setLoading(false);
            
            if(error.response.status === 401){
                console.log(error.response.status);
                setError("Please Login Again");
            } 
            else setError("Something went wrong, try again later");
        });
    }

    return(
        <div>
                Loan Approved!



        </div>

    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}



export default Loan;