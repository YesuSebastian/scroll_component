import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Header from '../../Components/Header/Header';
import NewHome from '../NewHome/NewHome';

const Home = ({handleLogged}) => {
    return(
        <div>
            <Header isLogged={handleLogged}/>
            <Switch>
                <Route exact path='/' component={NewHome}/>
            </Switch>
        </div>
    )
}

export default Home;