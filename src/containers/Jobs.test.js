import Jobs from './Jobs';
import { Select } from 'antd';

describe('Jobs', () => {
  it('renders title', () => {
    const wrapper = shallow(<Jobs />);
    const welcome = <h1>WORKFLOW STATUS</h1>;
    // expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(welcome)).toEqual(true);
  });

  it('should call onChange with shallow', () => {
    const onFilterStateChange = sinon.spy();
    const wrapper = shallow(<Jobs onChange={onFilterStateChange}/>);
    const selectWrapper = wrapper.find("Select").at(0);
    selectWrapper.simulate('change',{  target: { value: 'Active' } });
    expect(onFilterStateChange.called).toBe(true);
  });
})