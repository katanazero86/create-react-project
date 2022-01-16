import React from 'react';

interface HelloComponentProps {
    msg: string,
}

export default function HelloComponent({msg}: HelloComponentProps): React.ReactElement {

    return (
        <div>
            {msg}
        </div>
    )
}