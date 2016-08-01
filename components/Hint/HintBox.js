// @flow

import React from 'react';

import RenderContainer from '../RenderContainer/RenderContainer';
import position from '../Tooltip/position';
import type {Result} from '../Tooltip/position';
import renderPin from '../Tooltip/renderPin';

import styles from './HintBox.less';

type State = {
  pos: ?Result,
};

export default class HintBox extends React.Component {
  props: {
    getTarget: () => ?HTMLElement,
    pos: 'top' | 'right' | 'bottom' | 'left',
    text: string,
  };

  state: State = {
    pos: null,
  };

  _dom: ?HTMLElement = null;
  _positioning: boolean = false;

  render() {
    let style = {};
    let className = styles.root;
    if (this.state.pos) {
      style = {...style, ...this.state.pos.boxStyle};

      const {pinDirection} = this.state.pos;
      if (pinDirection === 'top' || pinDirection === 'bottom') {
        className += ' ' + styles.rootCenter;
      }
    }

    return (
      <RenderContainer>
        <div ref={this._ref} style={style} className={className}>
          {this.props.text}
          {renderPin(this.state.pos, styles.pin, styles.pinInner)}
        </div>
      </RenderContainer>
    );
  }

  componentDidMount() {
    this._position();
  }

  componentDidUpdate() {
    this._position();
  }

  _ref = (el: ?HTMLElement) => {
    this._dom = el;
  };

  _position() {
    if (this._positioning) {
      return;
    }

    let posStr;
    switch (this.props.pos) {
      case 'top': posStr = 'top center'; break;
      case 'right': posStr = 'right middle'; break;
      case 'bottom': posStr = 'bottom center'; break;
      case 'left': posStr = 'left middle'; break;
      default: throw new Error('Should never happen.');
    }

    const target = this.props.getTarget();
    const box = this._dom;
    if (target && box) {
      const pos = position(box, target, posStr);

      this._positioning = true;
      this.setState({pos}, () => {
        this._positioning = false;
      });
    }
  }
}
