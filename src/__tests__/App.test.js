import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

import App from '../components/App';

it('Render without crashing', ()=> {
   shallow(<App />);
});