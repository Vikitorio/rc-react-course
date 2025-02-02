import { Component, ReactNode } from 'react';
import style from './style.module.scss';
interface SpinnerProps {
    children: ReactNode;
    isLoading: boolean;
    error: string | null;
}

interface SpinnerState { }

class Spinner extends Component<SpinnerProps, SpinnerState> {
    render() {
        if (this.props.error) {
            return (
                <div style={{ color: 'red', textAlign: 'center', padding: '10px' }}>
                    {this.props.error?.toString()}
                </div>
            );
        }
        return (
            <>
                {this.props.isLoading && !this.props.error ? (
                    <div className={style.box}>
                        <svg
                            className={style.path}
                            width="65px"
                            height="65px"
                            viewBox="0 0 66 66"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="path"
                                fill="none"
                                strokeWidth="6"
                                strokeLinecap="round"
                                cx="33"
                                cy="33"
                                r="30"
                            />
                        </svg>
                    </div>
                ) : (
                    this.props.children
                )}
            </>
        );
    }
}

export default Spinner;
