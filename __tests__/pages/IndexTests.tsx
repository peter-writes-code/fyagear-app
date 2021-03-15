import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Index from "../../pages/index";

test("Check for Getting Started Text", () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const { getByText } = render(
    <Provider store={store}>
      <Index />
    </Provider>
  );
  expect(getByText("SUBMIT GEAR!")).toBeInTheDocument();
});

it("renders correctly", () => {
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const tree = renderer
    .create(
      <Provider store={store}>
        <Index />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-white select-none"
    >
      <main
        className="flex-grow p-8 container mx-auto"
      >
        <h1
          className="text-5xl font-medium text-black"
        >
          welcome to fyagear!
        </h1>
        <div
          className="text-base py-6"
        >
          soon the stream of gear will go here. until then please go ahead and
        </div>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={[Function]}
          onMouseEnter={[Function]}
        >
          SUBMIT GEAR!
        </button>
      </main>
    </div>
  `);
});
