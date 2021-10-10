import * as React from "react";
import {
  TextField,
  ReferenceField,
  Datagrid,
  NumberField,
  useGetList,
  useRecordContext,
} from "react-admin";

const currentSort = { field: "date", order: "DESC" };

export const SaleSkuList: React.FunctionComponent = (props) => {
  const { id } = useRecordContext();

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
