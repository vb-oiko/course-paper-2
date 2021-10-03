import * as React from "react";
import { List, Datagrid, TextField, ReferenceField } from "react-admin";

export const SkuList: React.FunctionComponent = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="category_id" reference="category">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
    </Datagrid>
  </List>
);
