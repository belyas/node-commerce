import React from 'react';

import { Spinner } from 'reactstrap';

const withSpinner = WrapperComponent => {
    return class extends React.Component {
        render() {
            const { loading, ...otherProps } = this.props;

            return loading ? (
                <Spinner color="primary" />
            ) : (
                <WrapperComponent {...otherProps} />
            );
        }
    };
};

export default withSpinner;
