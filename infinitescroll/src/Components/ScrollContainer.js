import React from 'react';

function ScrollContainer(props) {
    return (
        <div className="container mx-auto px-4">
            {props.children}
        </div>
    );
}

export default ScrollContainer;