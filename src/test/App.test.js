import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import App from '../component/App';
import {shallow, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('should display edit button when click preview button', function () {
    const app = shallow(<App/>);

    expect(app.find('button#changeButton').text()).toEqual('Preview')
    expect(app.state().isPreview).toEqual(false);

    app.find('button#changeButton').simulate('click');

    expect(app.find('button#changeButton').text()).toEqual('Edit')
    expect(app.state().isPreview).toEqual(true);
  });

  it('should list add text when select text input in modal click add button', function () {
    const app = shallow(<App/>);
    app.find('button.add-button').simulate('click');
    app.find('#textInput').simulate('click', {target: {value: 'text'}});
    app.find('button#addButton').simulate('click');

    expect(app.state('list')).toEqual(['text'])

    app.find('#datePicker').simulate('click', {target: {value: 'date'}});
    app.find('button#addButton').simulate('click');

    expect(app.state('list')).toEqual(['text', 'date'])

  });
})
