/* global describe, it, expect, jest */
import React from 'react';
import { mount } from 'enzyme';
import GurmukhiKeyboard from '../GurmukhiKeyboard';
import { StaticRouter } from 'react-router-dom';

describe('<GurmukhiKeyboard />', () => {
  it('renders correctly', () => {
    const component = mount(
      <StaticRouter>
        <GurmukhiKeyboard value={'mere'} onKeyClick={jest.fn()} />
      </StaticRouter>
    );

    expect(component).toMatchSnapshot();
  });
  it('triggers onKeyClick', () => {
    const onKeyClick = jest.fn();
    const component = mount(
      <StaticRouter>
        <GurmukhiKeyboard onKeyClick={onKeyClick} value={'mere'} />
      </StaticRouter>
    );

    const button = component.find('button').filterWhere(n => n.text() === 'A');

    button.simulate('click');

    expect(onKeyClick).toHaveBeenCalledWith('mereA');

    component
      .find('[title="Backspace"]')
      .first()
      .simulate('click');

    expect(onKeyClick).toHaveBeenCalledWith('mer');
  });
});
