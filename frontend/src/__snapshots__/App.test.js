import React from "react"
import { useContext } from 'react';
import { mount, render, shallow } from 'enzyme';
//import { render, fireEvent } from '@testing-library/react';
import App from '../AppRedux';
import * as Contexto from "../Context";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import Hall from '../components/Hall';
import { ProductSection2 } from '../components/ProductSection2';
import { ExpansionPanelActions } from '@material-ui/core';
import { StickyBar } from '../components/StickyBar';
import Product from "../components/Products2"
import ProductDispatcher from '../components/ProductDispatcher';
import { ResponsiveSkeleton } from "../components/ProductSection2"
import { act } from 'react-dom/test-utils';
import { useFakeTimers, SinonFakeTimers } from 'sinon';
import ReactDOM from "react-dom"


//lets unmount it


// describe("testingg <App/> component", () => {
//   it("renders without errors", () => {
//     //useDatalayer cannot be undefined, but could just put a empty object
//     const contextvals = { setViewport: jest.fn(), isDark: true, viewport: 400 }
//     jest
//       .spyOn(Contexto, "useDataLayer")
//       .mockImplementation(() => contextvals)
//     console.log(store)
//     //create artificially dom, in this case to attach portal
//     const modalRoot = global.document.createElement('div');
//     modalRoot.setAttribute('id', 'portal');
//     const body = global.document.querySelector('body');
//     body.appendChild(modalRoot);

//     const appwrapper = mount(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     )
//     appwrapper.unmount()
//     //cleanup artificially created dom elements
//     global.document.body.removeChild(modalRoot)
//   })
// })

// describe("testingg <Hall/> component", () => {
//   it("renders without errors", () => {
//     const contextvals = { setViewport: jest.fn(), isDark: true, viewport: 600 }
//     jest
//       .spyOn(Contexto, "useDataLayer")
//       .mockImplementation(() => contextvals)

//     const wrapper = mount(<Provider store={store}>
//       <Hall />
//     </Provider>)
//     //the 2 below perform the same action!!
//     //expect(wrapper.find(StickyBar).exists()).toBe(true)
//     //expect(wrapper.find(StickyBar)).toHaveLength(1)
//     wrapper.unmount()
//   })
// })
describe("testingg <ProducSection2/> component", () => {
  let clock;
  let container;
  beforeEach(() => {
    // clock = useFakeTimers();
    jest.useFakeTimers("modern")
    container = document.createElement("div")
    document.body.appendChild(container)
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders without errors", () => {
    // const contextvals = { setkaka: jest.fn(), ispoa: false }
    // jest
    //   .spyOn(Contexto, "useDataLayer")
    //   .mockImplementation(() => contextvals)
    // const useDataLayer =()=>useContext({})

    const contextvals = { setViewport: jest.fn(), isDark: true, viewport: 300 }
    jest
      .spyOn(Contexto, "useDataLayer")
      .mockImplementation(() => contextvals)
    const products = [{ name: "manilox shoes", brand: "nike", price: 25, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png", description: "mola molte", "rating": 4 }]
    const spy = jest.spyOn(redux, "useSelector")
    spy.mockReturnValue({ products, loading: false, error: "" })
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'portal');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);
    // jest.spyOn(React, 'useEffect')
    // const setState = jest.fn()
    // const useStateSpy = jest.spyOn(React, "useState")
    // useStateSpy.mockImplementation((init) => [init, setState])
    // const setState = jest.fn();
    // const useStateMock = (initState) => [initState, setState];

    // jest.spyOn(React, 'useState').mockImplementation(useStateMock);


    // jest.spyOn(React, 'useState').mockImplementation(useStateMock);


    let wrapper = mount(
      <Provider store={store}>
        <ProductSection2
        />
      </Provider>)
    // console.log(setState, "estados")
    // setState(false, 9)
    // act(() => {
    //   ReactDOM.render(wrapper, container)
    // })
    // act(() => {
    //   clock.tick(700)
    // })

    jest.advanceTimersByTime(2000)

    
      wrapper.update()
    

    //wrapper = wrapper.update()
    //console.log(wrapper.prop("isLoading"), "puta")
    //console.log(wrapper.debug())
    // console.log(wrapper.debug(), "potaaaaa")
    //expect(setState).toHaveBeenCalledTimes(1)
    // setTimeout(()=>{
    //   console.log("hola")
    //   
    //   done()
    // }, 2000)

    //console.log(wrapper.debug(), "potaaaaa")

    // console.log(wrapper.debug(), "potaaaaa")

    console.log(wrapper.find(StickyBar).props(), "keee")
    console.log(wrapper.debug(), "wrappar")
    expect(wrapper.containsMatchingElement(<ResponsiveSkeleton />)).toEqual(false)









  })
})

// describe("testingg <ProducSection2/> component", () => {
//   it("renders without errors", () => {
//     // const contextvals = { setkaka: jest.fn(), ispoa: false }
//     // jest
//     //   .spyOn(Contexto, "useDataLayer")
//     //   .mockImplementation(() => contextvals)
//     // const useDataLayer =()=>useContext({})

//     const contextvals = { setViewport: jest.fn(), isDark: true, viewport: 600 }
//     jest
//       .spyOn(Contexto, "useDataLayer")
//       .mockImplementation(() => contextvals)
//     const products= [{name: "manilox shoes", brand: "nike", price: 25, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png", description: "mola molte", "rating": 4}]
//     // const spy = jest.spyOn(redux, "useSelector")
//     // spy.mockReturnValue({products, loading: false, error: ""})

//     const wrapper = mount(
//       <Provider store={store}>
//         <ProductDispatcher
//         products={products}
//         />
//       </Provider>)
//       //console.log(wrapper.debug())
//       expect(wrapper.find(Product).exists()).toBe(true)
//   })
// })


































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
// })