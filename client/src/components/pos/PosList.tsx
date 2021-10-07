import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  ShowButton,
} from "react-admin";

export const PosList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
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
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);
