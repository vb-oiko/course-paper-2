import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const CategoryList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
