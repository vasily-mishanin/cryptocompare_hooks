import classes from './Logo.module.scss';
import LogoBusiness from '../../../assets/images/logo.png';
import { LogoProps } from './types';

export function Logo({ size, text }: LogoProps) {
  const logoClass = [classes.logo, classes[size]].join(' ');
  return (
    <div className={logoClass}>
      <img src={LogoBusiness} alt={text} />
    </div>
  );
}
