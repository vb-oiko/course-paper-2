import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const CustomerList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
