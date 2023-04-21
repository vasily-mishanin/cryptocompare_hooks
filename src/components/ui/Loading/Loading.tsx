import classes from './Loading.module.scss';

type LoadingProps = {
  isLoading: boolean;
  message: string;
};
export function Loading({ isLoading, message }: LoadingProps) {
  return (
    <div className={classes.wrapper}>
      {isLoading && <p>{message ? message : 'Loading...'}</p>}
    </div>
  );
}
