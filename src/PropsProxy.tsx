import * as React from 'react';

interface State {
    name: string;
}

const PropsProxy = (WrappedComponent: new() => React.Component) => {
    return class  PP extends React.Component<{}, State> {
        constructor(props: {}){
            super(props);
            this.state = {
                name: ''
            }
        }
        public onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
            this.setState({name: event.currentTarget.value})
        }
        public render() {
            const newProps = {
                value: this.state.name,
                onChange: this.onNameChange
            };
            return <WrappedComponent {...this.props} {...newProps}  />
        }
    }
};

export default PropsProxy;
