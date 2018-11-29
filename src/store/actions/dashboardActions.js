import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { siteName } from "../../App_config";


export const setDataStore = ( data ) => {
    return {
        type: actionTypes.SETDATA,
        data: data
    };
};

export const initWebsiteState = () => {
    const URL = `https://react-boiler-5ecbd.firebaseio.com/${siteName}.json`;

    return dispatch => {
        axios.get( URL )
            .then( response => {
               console.log('redux initial response',response) 
               dispatch(setDataStore(response.data));
            } )
            .catch( error => {
                console.log(error)
               // dispatch(fetchIngredientsFailed());
            } );
    };
};