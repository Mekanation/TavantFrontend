import React, { useState } from 'react';
import axios from 'axios';
import { getToken, removeUserSession } from '../Utils/Common'; 

function LoanApplication(props){
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
        <section>
            <form autoComplete="off">
                <section>
                    <label htmlFor="loanName">Name</label>
                    <input {...loanName}/> 
                </section>
                <section>
                    <label htmlFor="annualIncome">Annual Income</label>
                    <input {...annualIncome}/> 
                </section> 
                <section>
                    <label htmlFor="assetsValue">Assets Value</label>
                    <input {...assetsValue}/> 
                </section>   
                <section>
                    <label htmlFor="debtsValue">Debts Value</label>
                    <input {...debtsValue}/> 
                </section>  
                <section>
                    <label htmlFor="creditScore">Credit Score</label>
                    <input {...creditScore}/> 
                </section>  
                <section>
                    <label htmlFor="loanAmountRequested">Loan Amount Needed?</label>
                    <input {...loanAmountRequested}/> 
                </section>          



            </form>



            <input type="button" value={loading ? 'Loading...' : 'Submit'} onClick={handleApp} disabled={loading} />

        </section>



        // <div>
        //     Signup <br/>
        //     <div style={{marginTop: 10}}>
        //         First Name <br/>
        //         <input type="email" {...firstName} />
        //     </div>
        //     <div style={{marginTop: 10}}>
        //         Last Name <br/>
        //         <input type="email" {...lastName} />
        //     </div>

        //     <div style={{marginTop: 10}}>
        //         Email <br/>
        //         <input type="email" {...email} />
        //     </div>
        //     <div style={{marginTop: 10}} >
        //         Password <br/>
        //         <input type="password" {...password} />
        //     </div>
        //      <br/>


        // </div>
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



export default LoanApplication;