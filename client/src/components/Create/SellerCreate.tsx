import * as React from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  Create,
} from "react-admin";

export const SellerCreate: React.FunctionComponent = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="pos_id" reference="pos">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="salary" />
    </SimpleForm>
  </Create>
);
