import * as React from 'react';

export const clickCounted = ({ debug = false }: Options = {}) =>
    <TOriginalProps extends {}>(
        Component: (React.ComponentClass<TOriginalProps & InjectedProps>
                  | React.StatelessComponent<TOriginalProps & InjectedProps>)
    ) => {
        type ResultProps = TOriginalProps & ExternalProps;
        const result = class ClickCounted extends React.Component<ResultProps, State> {
            public static displayName = `ClickCounted(${Component.displayName || Component.name})`;

            constructor(props: ResultProps) {
                super(props);
                this.state = {
                    clickCount: 0,
                };
            }

            public handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
                if (debug) {
                    // console.log('Clicked');
                }
                this.setState(state => ({ clickCount: state.clickCount + 1 }));
            }

            public render(): JSX.Element {
                return (
                    <div onClick={this.handleClick} style={this.props.style}>
                        <span>Clicked {this.state.clickCount} times</span>
                        <Component {...this.props} {...this.state} />
                    </div>
                );
            }
        };

        return result;
};

interface Options {
    debug?: boolean;
}

interface State {
    clickCount: number;
}

interface ExternalProps {
    style?: React.CSSProperties;
}

export interface InjectedProps {
    clickCount: number;
}
