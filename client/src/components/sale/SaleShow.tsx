import * as React from "react";
import {
  TextField,
  Show,
  ReferenceField,
  DateField,
  ReferenceManyField,
  Datagrid,
  NumberField,
  ListBase,
  ListContextProvider,
  useListController,
  useGetList,
  useRecordContext,
} from "react-admin";
import { GridShowLayout, RaGrid } from "ra-compact-ui";
import { PageTitle } from "../shared/PageTitle";

const currentSort = { field: "date", order: "DESC" };

const SaleSkuList: React.FunctionComponent = (props) => {
  const { id, ...rest } = useRecordContext();

  const { ids, data, total, loaded } = useGetList(
    "sale_sku",
    undefined,
    undefined,
    { sale_id: id }
  );

  return (
    <Datagrid
      basePath=""
      currentSort={currentSort}
      data={data}
      ids={ids}
      selectedIds={[]}
      loaded={loaded}
      total={total}
    >
      <ReferenceField source="sku_id" reference="sku" link={false} fullWidth>
        <TextField source="name" fullWidth />
      </ReferenceField>
      <NumberField source="qty" />
      <NumberField
        source="price"
        options={{ style: "currency", currency: "EUR" }}
      />
    </Datagrid>
  );
};

export const SaleShow: React.FunctionComponent = (props) => {
  return (
    <Show {...props} title={<PageTitle title="Point of Sale" />}>
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
