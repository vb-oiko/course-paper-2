import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const posSkuFilters = [
  <ReferenceInput
    source="pos_id"
    reference="pos"
    label="Store"
    allowEmpty={false}
    alwaysOn
  >
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

export const PosSkuList: React.FunctionComponent = (props) => (
  <List {...props} filters={posSkuFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="sku_id" reference="sku">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="price" />
      <NumberField source="qty" />
    </Datagrid>
  </List>
);
