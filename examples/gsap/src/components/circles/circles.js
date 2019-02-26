import React from 'react';
import useRefGroup from 'react-ref-groupie';

import './circles.scss';

class Circles extends React.Component {
  constructor(props) {
    super(props);
    const {
      refGroupie: {
        circles: {
          firstCircle,
          secondCircle,
          thirdCircle
        },
      },
    } = this.props;

    this.firstCircle = firstCircle;
    this.secondCircle = secondCircle;
    this.thirdCircle = thirdCircle;

    this.state = { toggled: false, num: 0 };
  }

  toggle = () => {
    const {
      refGroupie: {
        circles: {
          moveUp,
          moveDown
        }
      }
    } = this.props;

    if (this.state.toggled) {
      moveUp(this.increment);
    } else {
      moveDown(this.increment);
    }

    this.setState(({ toggled }) => ({ toggled: !toggled }));
  };

  increment = () => this.setState(({ num }) => ({ num: num + 1 }));

  render() {
    const { num } = this.state;

    return (
      <div
        onClick={this.toggle}
        className="circles"
      >
        <div
          ref={this.firstCircle}
          className="circles__first"
        />
        <div
          ref={this.secondCircle}
          className="circles__second"
        >
          {num}
        </div>
        <div
          ref={this.thirdCircle}
          className="circles__third"
        />
      </div>
    );
  }
}

export default useRefGroup(Circles);
