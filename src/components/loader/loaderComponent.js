import React from 'react';
import './loader.css';
import { Loading } from 'carbon-components-react';

function Loader() {
    return (
        <div className="loader">
            <Loading description="Loading data..." withOverlay={false} />
        </div>
    );
}

export default Loader;
