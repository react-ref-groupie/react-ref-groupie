import React from 'react';
import withRefGroups from 'react-ref-groupie';

import './squares.scss';

class Squares extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
      num: 0
    };
  }

  toggle = () => {
    const {
      refGroupsMethods: {
        squares: {
          moveLeft,
          moveRight
        }
      }
    } = this.props;

    if (this.state.toggled) {
      moveLeft(this.increment);
    } else {
      moveRight(this.increment);
    }

    this.setState(({ toggled }) => ({ toggled: !toggled }));
  };

  increment = () => this.setState(({ num }) => ({ num: num + 1 }));

  render() {
    const { num } = this.state;
    const {
      squares: {
        firstSquare,
        secondSquare,
        thirdSquare
      }
    } = this.props.getRefGroups({
      squares: `
        firstSquare
        secondSquare
        thirdSquare
      `
    });

    return (
      <div
        onClick={this.toggle}
        className="squares"
      >
        <div
          ref={firstSquare}
          className="squares__first"
        />
        <div
          ref={secondSquare}
          className="squares__second"
        >
          {num}
        </div>
        <div
          ref={thirdSquare}
          className="squares__third"
        />
      </div>
    );
  }
}

export default withRefGroups(Squares);
