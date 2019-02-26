import React from 'react';
import useRefGroup from 'react-ref-groupie';

import './squares.scss';

class Squares extends React.Component {
  constructor(props) {
    super(props);
    const {
      refGroupie: {
        squares: {
          firstSquare,
          secondSquare,
          thirdSquare
        },
      },
    } = this.props;

    this.firstSquare = firstSquare;
    this.secondSquare = secondSquare;
    this.thirdSquare = thirdSquare;

    this.state = { toggled: false, num: 0 };
  }

  toggle = () => {
    const {
      refGroupie: {
        squares: {
          moveRight,
          moveLeft
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

    return (
      <div
        onClick={this.toggle}
        className="squares"
      >
        <div
          ref={this.firstSquare}
          className="squares__first"
        />
        <div
          ref={this.secondSquare}
          className="squares__second"
        >
          {num}
        </div>
        <div
          ref={this.thirdSquare}
          className="squares__third"
        />
      </div>
    );
  }
}

export default useRefGroup(Squares);
