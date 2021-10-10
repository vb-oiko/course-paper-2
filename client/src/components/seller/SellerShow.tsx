import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  NumberField,
} from "react-admin";
import { CrudActions } from "../shared/CrudActions";
import { PageTitle } from "../shared/PageTitle";

export const SellerShow: React.FunctionComponent = (props) => (
  <Show
    {...props}
    actions={<CrudActions />}
    title={<PageTitle title="Seller" />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="pos_id" reference="pos" link={false}>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <NumberField source="salary" />
    </SimpleShowLayout>
  </Show>
);
