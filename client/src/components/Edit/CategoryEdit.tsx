import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

export const CategoryEdit: React.FunctionComponent = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
