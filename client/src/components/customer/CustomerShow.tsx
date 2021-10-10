import * as React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";
import { CrudActions } from "../shared/CrudActions";
import { PageTitle } from "../shared/PageTitle";

export const CustomerShow: React.FunctionComponent = (props) => (
  <Show
    {...props}
    actions={<CrudActions />}
    title={<PageTitle title="Customer" />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);
