import React from 'react';

const withSpinner = WrapperComponent => {
    return class extends React.Component {
        render() {
            const { loading, ...otherProps } = this.props;
            console.log(this.props);

            return <WrapperComponent {...this.props} />;
        }
    };
};

export default withSpinner;
