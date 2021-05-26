import { Accordion } from '@elvia/elvis-accordion/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import enzyme from 'enzyme';
enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').expect;
describe('Elvis Popover', function () {
    it('should load icon', function (done) {
        const wrapper = enzyme.mount(<Accordion
            labelPosition="center"
            openLabel="open"
            closeLabel="close"
            content="TextContent"
        ></Accordion>)
        expect(wrapper.find('i')).to.have.length(1);
        done();
    });

    it('should not show content', function (done) {
        const wrapper = enzyme.mount(<Accordion
            labelPosition="center"
            openLabel="open"
            closeLabel="close"
            content="TextContent"
        ></Accordion>)
        expect(wrapper.find('div').at(2)).to.equal("TextContent");
        done();
    });

    it('should show content when clicked', function (done) {
        const wrapper = enzyme.mount(<Accordion
            labelPosition="center"
            openLabel="open"
            closeLabel="close"
            content="TextContent"
        ></Accordion>)
        wrapper.find('button').simulate('click')
        expect(wrapper.find('div').at(2).text()).to.equal("TextContent");
        done();
    });
});
