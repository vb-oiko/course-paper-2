import * as React from "react";
import { SimpleForm, TextInput, NumberInput, Create } from "react-admin";

export const PosCreate: React.FunctionComponent = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="type" />
      <NumberInput source="area" />
      <NumberInput source="utilities" />
      <NumberInput source="rent" />
      <NumberInput source="floors" />
      <NumberInput source="departments" />
      <NumberInput source="halls" />
      <NumberInput source="workplaces" />
    </SimpleForm>
  </Create>
);
