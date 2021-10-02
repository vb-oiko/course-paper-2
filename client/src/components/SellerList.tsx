import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";

export const SellerList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="salary" />
      <ReferenceField source="pos_id" reference="pos">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
