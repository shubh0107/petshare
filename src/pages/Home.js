import React, { useEffect } from 'react';
import { getCurrentUser } from '../services/user.service';



const Home = props => {


    useEffect(() => {
        getCurrentUser().then(currentUser => {
            console.log('CURRENT USER RESPONSE: ', currentUser);
        }).catch(error => {
            console.log('Error while fetching current user: ', error);
        })
    }, [getCurrentUser])




    return (
        <div>
            This is home
        </div>
    )
}


export default Home;