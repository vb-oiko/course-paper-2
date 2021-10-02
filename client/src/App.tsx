import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PossList } from "./components/PosList";

const dataProvider = jsonServerProvider("http://localhost:3001/api");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="poss" list={PossList} />
  </Admin>
);

export default App;
