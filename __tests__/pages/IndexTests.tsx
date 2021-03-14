import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import Home from "../../pages/index";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Gear stream goes here...")).toBeInTheDocument();
});

it("renders correctly", () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div>
      <main>
        <div
          className="p-8text-2xl font-medium text-black"
        >
          Gear stream goes here...
        </div>
      </main>
    </div>
  `);
});
