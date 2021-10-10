import * as React from "react";
import {
  TextField,
  Show,
  ReferenceField,
  DateField,
  NumberField,
} from "react-admin";
import { GridShowLayout, RaGrid } from "ra-compact-ui";
import { PageTitle } from "../shared/PageTitle";
import { CrudActions } from "../shared/CrudActions";
import { SaleSkuList } from "../sale-sku/SaleSkuList";

export const SaleShow: React.FunctionComponent = (props) => {
  return (
    <Show
      {...props}
      actions={<CrudActions />}
      title={<PageTitle title="Sale" field="id" />}
    >
      <GridShowLayout>
        <RaGrid container spacing={2}>
          <RaGrid item xs={3}>
            <DateField source="date" />
          </RaGrid>
          <RaGrid item xs={3}>
            <ReferenceField
              source="customer_id"
              reference="customer"
              link={false}
            >
              <TextField source="name" />
            </ReferenceField>
          </RaGrid>
          <RaGrid item xs={3}>
            <ReferenceField
              source="seller_id"
              reference="seller"
              label="Store"
              link={false}
            >
              <ReferenceField source="pos_id" reference="pos" link={false}>
                <TextField source="name" />
              </ReferenceField>
            </ReferenceField>
          </RaGrid>
          <RaGrid item xs={3}>
            <ReferenceField source="seller_id" reference="seller" link={false}>
              <TextField source="name" />
            </ReferenceField>
          </RaGrid>
        </RaGrid>
        <SaleSkuList />
        <NumberField
          source="total"
          options={{ style: "currency", currency: "EUR" }}
        />
      </GridShowLayout>
    </Show>
  );
};
