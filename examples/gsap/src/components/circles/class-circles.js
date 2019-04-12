import React from 'react';
import withRefGroups from 'react-ref-groupie';

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
      num: 0,
      squaresConfig: false
    };
  }

  toggle = () => {
    const {
      refGroupsMethods: {
        circles: {
          moveUp,
          moveDown
        },
        squares: {
          moveLeft,
          moveRight
        }
      }
    } = this.props;

    const { toggled } = this.state;

    const { squaresConfig } = this.state;

    if (toggled) {
      if (squaresConfig) {
        moveLeft(this.increment);
      } else {
        moveUp(this.increment);
      }
    } else {
      if (squaresConfig) {
        moveRight(this.increment);
      } else {
        moveDown(this.increment);
      }
    }

    if (!squaresConfig) {
      this.setState(({ toggled }) => ({ toggled: !toggled }));
    }
  };

  increment = () => this.setState(({ num }) => ({ num: num + 1 }));

  setCirclesConfig = () => {
    this.refGroups = this.props.getRefGroups({
      circles: `
        firstCircle
        secondCircle
        thirdCircle
      `
    });

    this.setState({ squaresConfig: false });
  };

  setSquaresConfig = () => {
    this.refGroups = this.props.getRefGroups({
      squares: `
        firstSquare
        secondSquare
        thirdSquare
      `
    });

    this.setState({ squaresConfig: true });
  };

  render() {
    const {
      num,
      squaresConfig
    } = this.state;

    let refGroup;

    if (squaresConfig) {
      const {
        squares: {
          firstSquare,
          secondSquare,
          thirdSquare
        }
      } = this.refGroups;

      refGroup = {
        firstRef: firstSquare,
        secondRef: secondSquare,
        thirdRef: thirdSquare
      };
    } else {
      const {
        circles: {
          firstCircle,
          secondCircle,
          thirdCircle
        }
      } = this.refGroups;

      refGroup = {
        firstRef: firstCircle,
        secondRef: secondCircle,
        thirdRef: thirdCircle
      };
    }

    return (
      <React.Fragment>
        <div className={`config config--${squaresConfig ? 'squares' : 'circles'}`}>
          <div
            className="config__toggle"
            onClick={this.setCirclesConfig}
          >
            Use circles config
          </div>
          <div
            className="config__toggle"
            onClick={this.setSquaresConfig}
          >
            Use squares config
          </div>
        </div>
        <div
          onClick={this.toggle}
          className="circles"
        >
          <div
            ref={refGroup.firstRef}
            className="circles__first"
          />
          <div
            ref={refGroup.secondRef}
            className="circles__second"
          >
            {num}
          </div>
          <div
            ref={refGroup.thirdRef}
            className="circles__third"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRefGroups(Circles);
