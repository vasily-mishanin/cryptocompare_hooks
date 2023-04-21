import { Logo } from '../ui/Logo/Logo';
import classes from './Header.module.scss';

export function Header() {
  return (
    <header className={classes.header}>
      <Logo size='l' text='Crypto Compare' />
    </header>
  );
}
