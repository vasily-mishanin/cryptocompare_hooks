import classes from './Loading.module.scss';

type LoadingProps = {
  isLoading: boolean;
  loadingMessage: string;
  resultMessage?: string;
};
export function Loading({
  isLoading,
  loadingMessage,
  resultMessage,
}: LoadingProps) {
  return (
    <div className={classes.wrapper}>
      {isLoading && <p>{loadingMessage ? loadingMessage : 'Loading...'}</p>}
      {!isLoading && resultMessage && <p>{resultMessage}</p>}
    </div>
  );
}
