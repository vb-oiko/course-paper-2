import * as React from "react";
import { Edit, SimpleForm, TextInput, NumberInput } from "react-admin";

export const PosEdit: React.FunctionComponent = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
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
  </Edit>
);
