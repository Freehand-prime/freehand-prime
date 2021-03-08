import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';


export default function EnterPerson() {

    
    const history = useHistory();
    const dispatch = useDispatch();

    const [newPerson, setNewPerson] = React.useState({
        name: '',
        relationship: '',
    })

    //function to update state from input fields
    const handleChange = (key, event) => {
        console.log('in handleChange');

        switch(key) {
            case 'name':
                setNewPerson({ ...newPerson, name: event.target.value })
                break;
            case 'relationship':
                setNewPerson({ ...newPerson, relationship: event.target.value })
                break;

        }
    }; //end handleChange

    //onClick function to submit person & relationship details
    conat handleContinue = (event) => {
        console.log('clicked handleContinue');

        //dispatch to reducer:

        dispatch({
            type: ''
        })
    }; //end handleContinue



    return (
        <div>
            <div>
                <h1>EnterPerson</h1>
            </div>
            <div>
                <TextField
                    id="person-name"
                    label= "name"
                    placeholder="enter name"
                    type="text"
                    value={newPerson.name}
                    onChange={(event) => handleChange('name', event)}
                    variant="outlined"
                />
            </div>
            <div>
                <TextField
                    id="person-relationship"
                    label= "relationship"
                    placeholder="enter your relationship"
                    type="text"
                    value={newPerson.relationship}
                    onChange={(event) => handleChange('name', event)}
                    variant="outlined"
                />
            </div>
        </div>
    )
}