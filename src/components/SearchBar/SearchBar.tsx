import { Component, ReactNode } from 'react';
import classes from './SearchBar.module.scss';

type SearchBarProps = {
  placeholder: string;
  onSearch: (value: string) => void;
};

type SearchBarState = {
  value: string;
  placeholder: string;
};

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    value: '',
    placeholder: '',
  };

  constructor(props: SearchBarProps) {
    super(props);
    this.state.placeholder = props.placeholder;
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.onSearch(this.state.value);
  }

  handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const enteredSearchValue = (event.target as HTMLInputElement).value;
    this.setState({ value: enteredSearchValue });
  };

  render(): ReactNode {
    return (
      <form className={classes.wrapper} onSubmit={this.handleSubmit.bind(this)}>
        <input
          className={classes.input}
          type='text'
          placeholder={this.state.placeholder}
          onChange={this.handleInputChange}
        />
        <button className={classes.btn}> Search</button>
      </form>
    );
  }
}
