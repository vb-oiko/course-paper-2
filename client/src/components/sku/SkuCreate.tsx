import * as React from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
} from "react-admin";

export const SkuCreate: React.FunctionComponent = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="category_id" reference="category">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
