import * as React from "react";
import { List, Datagrid, TextField, NumberField } from "react-admin";

export const PosList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
      <NumberField source="area" />
      <NumberField source="utilities" />
      <NumberField source="rent" />
      <NumberField source="floors" />
      <NumberField source="departments" />
      <NumberField source="halls" />
      <NumberField source="workplaces" />
    </Datagrid>
  </List>
);
