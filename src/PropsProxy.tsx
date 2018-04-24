import * as React from 'react';

interface State {
    name: string;
}

const propsProxy = <T extends {}>(WrappedComponent: new() => React.Component<T, {}, {}>) => {
    return class  PP extends React.Component<T, State> {
        constructor(props: T){
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

export default propsProxy;
