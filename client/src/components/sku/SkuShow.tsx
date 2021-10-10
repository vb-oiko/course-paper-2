import * as React from "react";
import { Show, SimpleShowLayout, TextField, ReferenceField } from "react-admin";
import { CrudActions } from "../shared/CrudActions";
import { PageTitle } from "../shared/PageTitle";

export const SkuShow: React.FunctionComponent = (props) => (
  <Show
    {...props}
    actions={<CrudActions />}
    title={<PageTitle title="Stock Keeping Unit" />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="category_id" reference="category" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);
