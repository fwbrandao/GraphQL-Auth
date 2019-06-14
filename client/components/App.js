import React from 'react';
import Header from './Header';

const App = (props) => {
    return (
        <did className="container">
            <Header />
            {props.children}
        </did>
    );
}

export default App;