import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";

export const SellerEdit: React.FunctionComponent = (props) => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <NumberInput disabled source="id" />
      <ReferenceInput source="pos_id" reference="pos">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <NumberInput source="salary" />
    </SimpleForm>
  </Edit>
);
