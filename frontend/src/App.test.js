import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './AppRedux';
import * as Contexto from "./Context";
import { Provider } from 'react-redux';
import store from './store';



describe("testingg <App/> component", () => {
  it("renders without errors", () => {
    const contextvals = { setViewport: jest.fn(), isDark: false }
    jest
      .spyOn(Contexto, "useDataLayer")
      .mockImplementation(() => contextvals)
      console.log(store)
    const appwrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })
})
// test('renders learn react link', () => {
//   const props = {setViewport: jest.fn(), isDark: true}
//   const { getByText } = render(<App {...props} />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// describe('<Hello />', () => {
//   test('it should mock the context', () => {
//     const contextValues = { color: 'orange' };
//     jest
//       .spyOn(AppContext, 'useAppContext')
//       .mockImplementation(() => contextValues);
//     const wrapper = shallow(<Hello />);
//     const h1 = wrapper.find('h1');

//     expect(h1.text()).toBe('Hello orange!');
//   });
// });