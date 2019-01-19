// import React from 'react';
// import {configure,shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import {BurgerBuilder} from './BurgerBuilder.js';
// import BuildControllers from '../../components/Burger/BuildControllers/BuildControllers.js';

// configure({adapter:new Adapter()});

// describe('<BurgerBuilder/>',()=>{
// 	let wrapper;

// 	beforeEach(() => {
// 		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
// 	});

// it('should render  <BuildControllers/> elements if ingredeints are fetched',()=>{
// 	wrapper.setProps({ings:{salad:0}});
// 	expect(wrapper.find(BuildControllers)).toHaveLength(1);
// });
// });