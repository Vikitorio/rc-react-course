import { Component, ButtonHTMLAttributes } from 'react';
import style from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

class Button extends Component<ButtonProps> {
  static defaultProps = {
    variant: 'primary',
  };

  render() {
    const { variant, children, ...props } = this.props;

    return (
      <button className={`${style['button']} ${style[`button--${variant}`]}`} {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
