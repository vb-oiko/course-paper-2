import * as React from "react";
import {
  SimpleForm,
  ReferenceInput,
  DateInput,
  SelectInput,
  Create,
  useNotify,
  useRedirect,
} from "react-admin";

export const SaleCreate: React.FunctionComponent = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (props: any) => {
    const data = props.data;

    notify("ra.notification.created", "info", { smart_count: 1 });
    redirect("show", "/sale", data.id, data);
  };

  return (
    <Create {...props} onSuccess={onSuccess}>
      <SimpleForm>
        <DateInput source="date" />
        <ReferenceInput source="seller_id" reference="seller">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="customer_id" reference="customer">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
