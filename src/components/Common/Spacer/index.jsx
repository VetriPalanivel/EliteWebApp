import React, { Fragment } from 'react'

const Spacer = (props) => {
    const { style, spacing, ...rest } = props
    return (
        <Fragment>
            <div
                style={{
                    padding: spacing,
                    ...style
                }}
                {...rest}
            >

            </div>
        </Fragment>
    )
}

export default Spacer