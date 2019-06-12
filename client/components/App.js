import React from 'react';
import Header from './Header';

const App = (props) => {
    return (
        <did>
            <Header />
            {props.children}
        </did>
    );
}

export default App;