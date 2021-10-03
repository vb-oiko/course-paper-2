import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { PosList } from "./components/List/PosList";
import { PosEdit } from "./components/Edit/PosEdit";
import { SellerList } from "./components/List/SellerList";
import { SkuList } from "./components/List/SkuList";
import { SellerEdit } from "./components/Edit/SellerEdit";
import { SellerCreate } from "./components/Create/SellerCreate";
import { CategoryList } from "./components/List/CategoryList";
import { CategoryEdit } from "./components/Edit/CategoryEdit";
import { SkuEdit } from "./components/Edit/SkuEdit";

const dataProvider = jsonServerProvider("http://localhost:3001/api");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="sku" list={SkuList} edit={SkuEdit} />
    <Resource name="category" list={CategoryList} edit={CategoryEdit} />
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
