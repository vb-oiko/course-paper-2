import * as React from "react";
import { List, Datagrid, TextField } from "react-admin";

export const CustomerList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);
