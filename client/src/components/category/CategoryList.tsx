import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const CategoryList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
