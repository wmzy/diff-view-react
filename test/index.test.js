import React from 'react';
import { shallow } from 'enzyme';

import DiffView from '../src/index';

describe('<DiffView />', () => {
  it('Should render', () => {
    const renderedComponent = shallow(
      <DiffView baseText={ '123\na\nc\neeeeee\nw\nw\nw\nw\nrrr' } newText={ 'a\nb\nc\nttt\neeeeee\nw\nw\nw\nw\nrrr' } />
    );
    expect(renderedComponent.find('DiffView')).toHaveLength(1);
    expect(renderedComponent.shallow().find('div')).toHaveLength(1);
    // expect(renderedComponent.setProps({ baseText: 'e', newText: 'e' }).shallow().find('div')).toHaveLength(1);
    renderedComponent.shallow().instance().componentWillReceiveProps({ baseText: 'e', newText: 'e' });
    renderedComponent.shallow().instance().componentWillReceiveProps({ baseText: 'e', newText: 'e' });

    expect(renderedComponent.render().find('table')).toHaveLength(1);
  });
});
