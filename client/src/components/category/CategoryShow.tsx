import * as React from "react";
import { Show, SimpleShowLayout, TextField } from "react-admin";
import { CrudActions } from "../shared/CrudActions";
import { PageTitle } from "../shared/PageTitle";

export const CategoryShow: React.FunctionComponent = (props) => (
  <Show
    {...props}
    actions={<CrudActions />}
    title={<PageTitle title="SKU Category" />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);
