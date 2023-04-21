import classes from './Logo.module.scss';
import LogoBusiness from '../../../assets/images/logo.png';

type LogoProps = {
  size: 's' | 'l' | 'xl';
  text: string;
};

export function Logo({ size, text }: LogoProps) {
  const logoClass = [classes.logo, classes[size]].join(' ');
  return (
    <div className={logoClass}>
      <img src={LogoBusiness} alt={text} />
    </div>
  );
}
