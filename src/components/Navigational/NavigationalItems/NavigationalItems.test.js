import React from 'react';
import {configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationalItems from './NavigationalItems.js';
import NavigationalItem from './NavigationalItem/NavigationalItem.js';
configure({adapter:new Adapter()});

describe('<NavigationalItems/>',()=>{
	it('should render two <NavigationItem/> elements if not authenticated',()=>{
		const wrapper=shallow(<NavigationalItems/>);
		expect(wrapper.find(NavigationalItem)).toHaveLength(2);
	});
	it('should render three <NavigationItem/> elements if authenticated',()=>{
		const wrapper=shallow(<NavigationalItems isauth/>);
		expect(wrapper.find(NavigationalItem)).toHaveLength(3);
	});
	it('should render Logout <NavigationItem/> elements if authenticated',()=>{
		const wrapper=shallow(<NavigationalItems isauth/>);
		expect(wrapper.contains(<NavigationalItem link="/logOut">LogOut</NavigationalItem>)).toEqual(true);
	});
});