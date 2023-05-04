import classes from './Loading.module.scss';
import { LoadingProps } from './types';

export function Loading({
  isLoading,
  loadingMessage,
  resultMessage,
}: LoadingProps) {
  return (
    <div className={classes.wrapper}>
      {isLoading && (
        <>
          <div className={classes.spinner}></div>
          <p>{loadingMessage ? loadingMessage : 'Loading...'}</p>
        </>
      )}
      {!isLoading && resultMessage && <p>{resultMessage}</p>}
    </div>
  );
}
