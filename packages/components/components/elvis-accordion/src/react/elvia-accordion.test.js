import { Accordion } from '@elvia/elvis-accordion/react';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import enzyme from 'enzyme';
enzyme.configure({ adapter: new Adapter() });

describe('Elvis Accordion', function () {


    /*it('should not show content', function (done) {
        const wrapper = enzyme.mount(<Accordion
            labelPosition="center"
            openLabel="open"
            closeLabel="close"
            content="TextContent"
        ></Accordion>)
        expect(wrapper.find('div').at(2)).toBeVisible();
        done();
    });*/

    it('should show content when clicked', function (done) {
        const wrapper = enzyme.mount(<Accordion
            labelPosition="center"
            openLabel="open"
            closeLabel="close"
            content="TextContent"
        ></Accordion>)
        wrapper.find('button').simulate('click')
        expect(wrapper.find('div').at(2).text()).toBe("TextContent");
        done();
    });
});
