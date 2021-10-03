import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PosList } from "./components/PosList";
import { SellerList } from "./components/SellerList";
import { SellerEdit } from "./components/SellerEdit";
import { SellerCreate } from "./components/SellerCreate";
import { PosEdit } from "./components/PosEdit";

const dataProvider = jsonServerProvider("http://localhost:3001/api");
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="pos" list={PosList} edit={PosEdit} />
    <Resource
      name="seller"
      list={SellerList}
      edit={SellerEdit}
      create={SellerCreate}
    />
  </Admin>
);

export default App;
