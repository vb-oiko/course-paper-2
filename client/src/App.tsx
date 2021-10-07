import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import pos from "./components/pos";
import sku from "./components/sku";
import category from "./components/category";
import seller from "./components/seller";
import customer from "./components/customer";
import posSku from "./components/pos-sku";
import sale from "./components/sale";

const dataProvider = jsonServerProvider("http://localhost:3001/api");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="sku" {...sku} />
    <Resource name="category" {...category} />
    <Resource name="pos" {...pos} />
    <Resource name="seller" {...seller} />
    <Resource name="customer" {...customer} />
    <Resource name="pos_sku" {...posSku} />
    <Resource name="sale" {...sale} />
  </Admin>
);

export default App;
