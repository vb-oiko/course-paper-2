import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PosList } from "./components/PosList";
import { SellerList } from "./components/SellerList";
import { SellerEdit } from "./components/SellerEdit";

const dataProvider = jsonServerProvider("http://localhost:3001/api");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="pos" list={PosList} />
    <Resource name="seller" list={SellerList} edit={SellerEdit} />
  </Admin>
);

export default App;
