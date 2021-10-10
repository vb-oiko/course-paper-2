import * as React from "react";
import {
  TextField,
  NumberField,
  Show,
  Datagrid,
  ReferenceField,
  ReferenceManyField,
} from "react-admin";
import { GridShowLayout, RaGrid } from "ra-compact-ui";
import { PageTitle } from "../shared/PageTitle";
import { CrudActions } from "../shared/CrudActions";

export const PosShow: React.FunctionComponent = (props) => {
  return (
    <Show
      {...props}
      title={<PageTitle title="Point of Sale" />}
      actions={<CrudActions />}
    >
      <GridShowLayout>
        <RaGrid container spacing={2}>
          <RaGrid item xs={4}>
            <TextField source="name" />
            <TextField source="type" />
            <NumberField source="area" />
          </RaGrid>
          <RaGrid item xs={4}>
            <NumberField source="utilities" />
            <NumberField source="rent" />
            <NumberField source="floors" />
          </RaGrid>
          <RaGrid item xs={4}>
            <NumberField source="departments" />
            <NumberField source="halls" />
            <NumberField source="workplaces" />
          </RaGrid>
        </RaGrid>
        <ReferenceManyField
          reference="pos_sku"
          target="pos_id"
          label="Price List"
        >
          <Datagrid rowClick="edit">
            <ReferenceField source="sku_id" reference="sku" link="show">
              <TextField source="name" />
            </ReferenceField>
            <NumberField
              source="price"
              options={{ style: "currency", currency: "EUR" }}
            />
          </Datagrid>
        </ReferenceManyField>
      </GridShowLayout>
    </Show>
  );
};
