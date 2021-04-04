import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Index from "../../pages/index";
import dotenv from "dotenv";
dotenv.config({ path: ".." });

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Index uid="mocked" />);
  expect(getByText("welcome to fyagear!")).toBeInTheDocument();
});

it("renders correctly", () => {
  const tree = renderer.create(<Index uid="mocked" />).toJSON();
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
        <button
          className="ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          LOGOUT
        </button>
      </main>
    </div>
  `);
});
