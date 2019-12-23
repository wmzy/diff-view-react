import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { stringAsLines, SequenceMatcher } from 'jsdifflib';
import escape from 'lodash.escape';


class DiffView extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    baseText: PropTypes.string.isRequired,
    newText: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.baseTextLines = stringAsLines(escape(props.baseText));
    this.newTextLines = stringAsLines(escape(props.newText));
    this.opcodes = new SequenceMatcher(this.baseTextLines, this.newTextLines).get_opcodes();

    this.state = {};
  }

  componentWillReceiveProps({ baseText, newText }) {
    if (newText === this.props.newText && baseText === this.props.baseText) return;

    if (baseText !== this.props.baseText) this.baseTextLines = stringAsLines(escape(baseText));
    if (newText !== this.props.newText) this.newTextLines = stringAsLines(escape(newText));

    this.opcodes = new SequenceMatcher(this.baseTextLines, this.newTextLines).get_opcodes();
  }

  buildView = () => {
    let v = '<table>';
    const contextSize = 3;
    this.opcodes.forEach(([change, bs, be, ns, ne], i) => {
      /* eslint-disable no-param-reassign, no-plusplus */
      if (change !== 'equal') {
        v += this.baseTextLines.slice(bs, be)
          .map(r => `<tr class="del"><td>${++bs}</td><td></td><td>-${r}</td></tr>`).join('');
        v += this.newTextLines.slice(ns, ne)
          .map(r => `<tr class="ins"><td></td><td>${++ns}</td><td>+${r}</td></tr>`).join('');

        return;
      }
      if (this.opcodes.length <= 1) return;
      const contextSizeTop = i === 0 ? 0 : contextSize;
      const contextSizeBottom = i === this.opcodes.length - 1 ? 0 : contextSize;
      if (be - bs >= contextSizeTop + contextSizeBottom + 1) {
        const e = bs + contextSizeTop;
        const rowsTop = this.baseTextLines.slice(bs, e);
        v += rowsTop.map(r => `<tr><td>${++bs}</td><td>${++ns}</td><td> ${r}</td></tr>`).join('');

        v += '<tr class="fold"><td>...</td><td>...</td><td></td></tr>';

        let bst = be - contextSizeBottom;
        let nst = ne - contextSizeBottom;
        const rowsBottom = this.baseTextLines.slice(bst, be);
        v += rowsBottom
          .map(r => `<tr><td>${++bst}</td><td>${++nst}</td><td> ${r}</td></tr>`).join('');
      } else {
        const rows = this.baseTextLines.slice(bs, be);
        v += rows.map(r => `<tr><td>${++bs}</td><td>${++ns}</td><td> ${r}</td></tr>`).join('');
      }
    });
    v += '</table>';
    return v;
  };

  /**
   * Render
   */
  render() {
    const view = this.buildView();
    return (<div className={ this.props.className }>
      <pre dangerouslySetInnerHTML={ { __html: view } } />
    </div>);
  }
}

export default styled(DiffView)`
  border: 1px solid #d9d9d9;
  .del {
    color: #b30000;
    background: #fadad7;
  }
  .ins {
    background: #eaf2c2;
    color: #406619;
  }
  .fold {
    background: rgba(166, 163, 166, 0.37);
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  tr > :nth-child(-n+2) {
    width: 40px;
    text-align: right;
    border-right: 1px solid #d9d9d9;
    padding: 0 5px;
    user-select: none;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.3);
    &:hover {
        color: rgba(0, 0, 0, 0.6);
    }
  }
`;