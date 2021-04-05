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
        <span>
          <a
            href="/submitGear"
            onClick={[Function]}
            onMouseEnter={[Function]}
          >
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 border
          border-gray-500 rounded-md shadow-md transition-all duration-200 ease-in-out
          transform hover:scale-110
          translate-x-0 opacity-100 pointer-events-auto"
            >
              SUBMIT GEAR!
            </button>
          </a>
          <span
            className="ml-4"
          >
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 border
          border-gray-500 rounded-md shadow-md transition-all duration-200 ease-in-out
          transform hover:scale-110
          translate-x-0 opacity-100 pointer-events-auto"
            >
              LOGOUT
            </button>
          </span>
        </span>
      </main>
      <div>
        <div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black transition duration-300 ease-in-out
          bg-opacity-0 pointer-events-none"
        />
        <div
          className="fixed top-0 right-0 bottom-0 left-0 transition duration-300 ease-in-out
                flex justify-center items-center
                opacity-0 pointer-events-none"
        >
          <svg
            className="w-11 h-11 animate-spin"
            viewBox="0 0 50 50"
          >
            <circle
              className="stroke-current text-red-600 opacity-30"
              cx="25"
              cy="25"
              fill="none"
              r="20"
              strokeWidth="10"
            />
            <circle
              className="stroke-current text-red-600"
              cx="25"
              cy="25"
              fill="none"
              r="20"
              strokeDasharray="90, 150"
              strokeDashoffset="-35"
              strokeWidth="10"
            />
          </svg>
        </div>
      </div>
    </div>
  `);
});
