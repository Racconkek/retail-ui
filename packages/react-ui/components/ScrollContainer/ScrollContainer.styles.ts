import { css, memoizeStyle } from '../../lib/theming/Emotion';

const scrollSize = 4;
const hoverScrollSize = 10;

const styles = {
  root() {
    return css`
      height: 100%;
      overflow: hidden;
      position: relative;
    `;
  },

  inner() {
    return css`
      position: relative;
      overflow: scroll;
      max-height: 100%;
      max-width: 100%;

      /* IE sometimes enabled scroll: http://codepen.io/anon/pen/RRrLNX */
      margin-bottom: -1px;
      padding-bottom: 1px;
      margin-right: -1px;
      padding-right: 1px;

      /* Hide scrobars without losing functionality */
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    `;
  },

  bottomIndent() {
    return css`
      &::after {
        content: '';
        width: 100%;
        height: ${hoverScrollSize + 2}px;
        position: absolute;
      }
    `;
  },

  scrollY() {
    return css`
      position: absolute;
      right: 2px;
      transition: width 0.2s;
      width: ${scrollSize}px;
      z-index: 200;

      &::after {
        background: #b7b7b7;
        border-radius: 5px;
        bottom: 1px;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 1px;
      }
    `;
  },

  scrollYHover() {
    return css`
      width: ${hoverScrollSize}px;
    `;
  },

  scrollX() {
    return css`
      position: absolute;
      bottom: 1px;
      transition: height 0.2s;
      height: ${scrollSize}px;
      z-index: 200;

      &::after {
        background: #b7b7b7;
        border-radius: 5px;
        bottom: 0px;
        content: '';
        display: block;
        left: 1px;
        right: 1px;
        position: absolute;
        top: 0;
      }
    `;
  },

  scrollXIndentRight() {
    return css`
      &::after {
        right: ${hoverScrollSize + 2}px;
      }
    `;
  },

  scrollXHover() {
    return css`
      height: ${hoverScrollSize}px;
    `;
  },

  scrollInvert() {
    return css`
      &::after {
        background: #ccc;
        background: rgba(255, 255, 255, 0.5);
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
