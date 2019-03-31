import React from 'react';
import { consumeRefs } from 'react-ref-groupie';

import './circles.scss';

class Circles extends React.Component {
  constructor(props) {
    super(props);

    this.refGroups = props.getRefGroups({
      circles: `
        firstCircle
        secondCircle
        thirdCircle
      `
    });

    this.state = {
      toggled: false,
      num: 0
    };
  }

  toggle = () => {
    const {
      refGroupsMethods: {
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
    const {
      circles: {
        firstCircle,
        secondCircle,
        thirdCircle
      }
    } = this.refGroups;

    return (
      <div
        onClick={this.toggle}
        className="circles"
      >
        <div
          ref={firstCircle}
          className="circles__first"
        />
        <div
          ref={secondCircle}
          className="circles__second"
        >
          {num}
        </div>
        <div
          ref={thirdCircle}
          className="circles__third"
        />
      </div>
    );
  }
}

export default consumeRefs(Circles);
