import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  DateInput,
  SelectInput,
} from "react-admin";

export const SaleEdit: React.FunctionComponent = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <DateInput source="date" />
      <ReferenceInput source="seller_id" reference="seller">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="customer_id" reference="customer">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
