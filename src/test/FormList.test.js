import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import FormList from '../component/FormList';
import {shallow, configure} from 'enzyme';

configure({ adapter: new Adapter() });

describe('FormList', () => {
  it('should render input count is list length', function () {
    const formList = shallow(<FormList list={['text', 'date']}/>);

    expect(formList.find('input').length).toEqual(2);
    expect(formList.find('input').at(0).html()).toEqual('<input type="text" class="form-control"/>');
    expect(formList.find('input').at(1).html()).toEqual('<input type="date" class="form-control"/>');

  });

  it('should delete list item when click delete', function () {
    const list=['text', 'date']
    const formList = shallow(<FormList isPreview={false} list={list} deleteList={(index) => list.splice(index, 1)}/>);
    formList.find('button#delete0').simulate('click');
    expect(list).toEqual(['date'])
  });
})