import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import pos from "./components/pos";
import sku from "./components/sku";
import category from "./components/category";
import seller from "./components/seller";

const dataProvider = jsonServerProvider("http://localhost:3001/api");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="sku" {...sku} />
    <Resource name="category" {...category} />
    <Resource name="pos" {...pos} />
    <Resource name="seller" {...seller} />
  </Admin>
);

export default App;
