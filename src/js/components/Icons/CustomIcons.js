import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.number,
};

const iconPropTypes = {
  ...propTypes,
  value: PropTypes.bool
}

const multiSelectPropTypes = {
  ...propTypes,
  options: PropTypes.arrayOf(PropTypes.number)
}

const defaultMultiSelectOptions = [12, 16, 20, 24, 28, 32];

export const PlusIcon = props => (
  <span onClick={props.onClick}
    className={`custom-fa ${props.className} fontsize-icon`}>
    +
  </span>
);
PlusIcon.propTypes = propTypes;

const fontControlCommonStyles = {
  height: '42px',
  marginBottom: 0,
  textAlignLast: 'center',
  width: 'inherit',
}
export const SizeControl = props => {
  const { options = defaultMultiSelectOptions, className, onChange, value } = props;

  return (
    <select
      className={`custom-fa ${className}`}
      style={{ ...fontControlCommonStyles }}
      onChange={(e) => {
        const updatedSize = e.currentTarget.value;
        onChange(updatedSize)
      }
      }
      value={value}>
      {options.map(val => <option key={val}>{val}</option>)}
    </select >
  )
}
SizeControl.propTypes = multiSelectPropTypes;

export const MinusIcon = props => (
  <span onClick={props.onClick}
    className={`custom-fa ${props.className} fontsize-icon`}>
    -
  </span>
)
MinusIcon.propTypes = propTypes;

export const AlignCenterIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>
    <svg id="Layer" enableBackground="new 0 0 64 64" height="25" viewBox="0 0 64 64" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /></svg>
  </span>
);
AlignCenterIcon.propTypes = iconPropTypes;

export const AlignLeftIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>
    <svg id="Layer" enableBackground="new 0 0 64 64" height="25" viewBox="0 0 64 64" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z" /><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z" /></svg>
  </span>
);
AlignLeftIcon.propTypes = iconPropTypes;

export const LarivaarIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>ੳਅ</span>
);
LarivaarIcon.propTypes = iconPropTypes;

export const LarivaarAssistIcon = props => (
  <span onClick={props.onClick} className={`custom-fa  custom-fa-assist ${props.value ? 'enabled' : ''}`}>ੳ</span>
);
LarivaarAssistIcon.propTypes = iconPropTypes;

export const SplitViewIcon = props => (
  <span onClick={props.onClick} className={`custom-fa ${props.value ? 'enabled' : ''}`}>
    <svg version="1.1" id="Capa_1"
      viewBox="0 0 512 512" enableBackground="new 0 0 512 512;" width="25" height="25"
      style={{ 'transform': 'rotate(90deg)', 'padding': '2px' }}>
      <g><g>
        <path d="M506.24,243.712l-96-80c-4.768-3.968-11.424-4.8-17.024-2.176C387.584,164.128,384,169.792,384,176v64h-64V16
			c0-8.832-7.168-16-16-16c-8.832,0-16,7.168-16,16v480c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V272h64v64
			c0,6.208,3.584,11.84,9.216,14.496c2.144,0.992,4.48,1.504,6.784,1.504c3.68,0,7.328-1.248,10.24-3.712l96-80
			c3.68-3.04,5.76-7.552,5.76-12.288C512,251.264,509.92,246.752,506.24,243.712z"/>
      </g>
      </g>
      <g>
        <g>
          <path d="M208,0c-8.832,0-16,7.168-16,16v224h-64v-64c0-6.208-3.584-11.872-9.216-14.496c-5.568-2.592-12.256-1.76-17.024,2.208
			l-96,80C2.112,246.752,0,251.264,0,256c0,4.736,2.112,9.248,5.76,12.288l96,80c2.912,2.464,6.56,3.712,10.24,3.712
			c2.304,0,4.64-0.512,6.784-1.504C124.416,347.84,128,342.208,128,336v-64h64v224c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16
			V16C224,7.168,216.832,0,208,0z"/>
        </g></g>
    </svg>
  </span>
);
SplitViewIcon.propTypes = iconPropTypes;

export const ParagraphIcon = props => (
  <span
    onClick={props.onClick}
    className={`custom-fa ${props.value ? 'enabled' : ''}`}>
    <svg
      transform="scale(1.4)"
      width="25px"
      height="25px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96">
      <path d="M75.5 20.5H35c-8 0-14.5 6.5-14.5 14.5S27 49.6 35 49.6h11v25.9h3.7V24.2h7.4v51.3h3.7V24.2h14.6v-3.7zM46.1 45.9H35c-6 0-10.9-4.9-10.9-10.9S29 24.1 35 24.1h11v21.8z" />
    </svg>
  </span>
)

ParagraphIcon.propTypes = iconPropTypes;

export const GearsIcon = props => (
  <span onClick={props.onClick} className={`custom-fa gear-icon ${props.value ? 'enabled' : ''}`}>
    <svg height="18" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg">
      <path d="m256 133.609375c-67.484375 0-122.390625 54.90625-122.390625 122.390625s54.90625 122.390625 122.390625 122.390625 122.390625-54.90625 122.390625-122.390625-54.90625-122.390625-122.390625-122.390625zm0 214.183594c-50.613281 0-91.792969-41.179688-91.792969-91.792969s41.179688-91.792969 91.792969-91.792969 91.792969 41.179688 91.792969 91.792969-41.179688 91.792969-91.792969 91.792969zm0 0" /><path d="m499.953125 197.703125-39.351563-8.554687c-3.421874-10.476563-7.660156-20.695313-12.664062-30.539063l21.785156-33.886719c3.890625-6.054687 3.035156-14.003906-2.050781-19.089844l-61.304687-61.304687c-5.085938-5.085937-13.035157-5.941406-19.089844-2.050781l-33.886719 21.785156c-9.84375-5.003906-20.0625-9.242188-30.539063-12.664062l-8.554687-39.351563c-1.527344-7.03125-7.753906-12.046875-14.949219-12.046875h-86.695312c-7.195313 0-13.421875 5.015625-14.949219 12.046875l-8.554687 39.351563c-10.476563 3.421874-20.695313 7.660156-30.539063 12.664062l-33.886719-21.785156c-6.054687-3.890625-14.003906-3.035156-19.089844 2.050781l-61.304687 61.304687c-5.085937 5.085938-5.941406 13.035157-2.050781 19.089844l21.785156 33.886719c-5.003906 9.84375-9.242188 20.0625-12.664062 30.539063l-39.351563 8.554687c-7.03125 1.53125-12.046875 7.753906-12.046875 14.949219v86.695312c0 7.195313 5.015625 13.417969 12.046875 14.949219l39.351563 8.554687c3.421874 10.476563 7.660156 20.695313 12.664062 30.539063l-21.785156 33.886719c-3.890625 6.054687-3.035156 14.003906 2.050781 19.089844l61.304687 61.304687c5.085938 5.085937 13.035157 5.941406 19.089844 2.050781l33.886719-21.785156c9.84375 5.003906 20.0625 9.242188 30.539063 12.664062l8.554687 39.351563c1.527344 7.03125 7.753906 12.046875 14.949219 12.046875h86.695312c7.195313 0 13.421875-5.015625 14.949219-12.046875l8.554687-39.351563c10.476563-3.421874 20.695313-7.660156 30.539063-12.664062l33.886719 21.785156c6.054687 3.890625 14.003906 3.039063 19.089844-2.050781l61.304687-61.304687c5.085937-5.085938 5.941406-13.035157 2.050781-19.089844l-21.785156-33.886719c5.003906-9.84375 9.242188-20.0625 12.664062-30.539063l39.351563-8.554687c7.03125-1.53125 12.046875-7.753906 12.046875-14.949219v-86.695312c0-7.195313-5.015625-13.417969-12.046875-14.949219zm-18.550781 89.3125-36.082032 7.84375c-5.542968 1.207031-9.964843 5.378906-11.488281 10.839844-3.964843 14.222656-9.667969 27.976562-16.949219 40.878906-2.789062 4.941406-2.617187 11.019531.453126 15.792969l19.980468 31.078125-43.863281 43.867187-31.082031-19.980468c-4.773438-3.070313-10.851563-3.242188-15.789063-.453126-12.90625 7.28125-26.660156 12.984376-40.882812 16.949219-5.460938 1.523438-9.632813 5.945313-10.839844 11.488281l-7.84375 36.082032h-62.03125l-7.84375-36.082032c-1.207031-5.542968-5.378906-9.964843-10.839844-11.488281-14.222656-3.964843-27.976562-9.667969-40.878906-16.949219-4.941406-2.789062-11.019531-2.613281-15.792969.453126l-31.078125 19.980468-43.863281-43.867187 19.976562-31.078125c3.070313-4.773438 3.246094-10.851563.457032-15.792969-7.28125-12.902344-12.984375-26.65625-16.953125-40.878906-1.523438-5.460938-5.941407-9.632813-11.484375-10.839844l-36.085938-7.84375v-62.03125l36.082032-7.84375c5.542968-1.207031 9.964843-5.378906 11.488281-10.839844 3.964843-14.222656 9.667969-27.976562 16.949219-40.878906 2.789062-4.941406 2.617187-11.019531-.453126-15.792969l-19.980468-31.078125 43.863281-43.867187 31.082031 19.980468c4.773438 3.070313 10.851563 3.242188 15.789063.453126 12.90625-7.28125 26.660156-12.984376 40.882812-16.949219 5.460938-1.523438 9.632813-5.945313 10.839844-11.488281l7.84375-36.082032h62.03125l7.84375 36.082032c1.207031 5.542968 5.378906 9.964843 10.839844 11.488281 14.222656 3.964843 27.976562 9.667969 40.878906 16.949219 4.941406 2.789062 11.019531 2.613281 15.792969-.453126l31.078125-19.980468 43.863281 43.867187-19.976562 31.078125c-3.070313 4.773438-3.246094 10.851563-.457032 15.792969 7.285156 12.902344 12.984375 26.65625 16.953125 40.878906 1.523438 5.460938 5.941407 9.632813 11.484375 10.839844l36.085938 7.84375zm0 0" />
    </svg>
  </span>
)
GearsIcon.propTypes = iconPropTypes;

export const DownArrowIcon = () => (
  <span className={`downarrow-key`}>
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='10' height='10' viewBox='0 0 32 24'>
      <polygon points='0,0 32,0 16,24'></polygon>
    </svg>
  </span>
)

export const IconLabel = props => (
  <span>{props.value}</span>
)
IconLabel.propTypes = {
  value: PropTypes.number
};