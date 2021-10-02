import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PosList } from "./components/PosList";
import { SellerList } from "./components/SellerList";

const dataProvider = jsonServerProvider("http://localhost:3001/api");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="poss" list={PosList} />
    <Resource name="sellers" list={SellerList} />
  </Admin>
);

export default App;
