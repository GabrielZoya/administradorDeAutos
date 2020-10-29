import React from "react";
import { render } from "@testing-library/react";
import Formulario from "./Formulario";

test("Render componente Formulario", () => {
  const { container } = render(<Formulario onChange={() => {}} value={{}} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <form
        class=""
        novalidate=""
      >
        <div
          class="form-group"
        >
          <input
            class="form-control"
            id="formMarca"
            placeholder="Marca"
            required=""
            type="input"
            value=""
          />
        </div>
        <div
          class="form-group"
        >
          <input
            class="form-control"
            id="formModelo"
            placeholder="Modelo"
            required=""
            type="input"
            value=""
          />
        </div>
        <div
          class="form-group"
        >
          <input
            class="form-control"
            id="formColor"
            placeholder="Color"
            required=""
            type="input"
            value=""
          />
        </div>
        <div
          class="form-group"
        >
          <input
            class="form-control"
            id="formPatente"
            placeholder="Patente"
            required=""
            type="input"
            value=""
          />
        </div>
        <button
          class="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  `);
});
