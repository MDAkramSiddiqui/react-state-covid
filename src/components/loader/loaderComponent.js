import React from 'react';
import { Loading } from 'carbon-components-react';

function Loader() {
    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: "translate('-50%', '-50%')",
            }}
        >
            <Loading description="Loading data..." withOverlay={false} />
        </div>
    );
}

export default Loader;
