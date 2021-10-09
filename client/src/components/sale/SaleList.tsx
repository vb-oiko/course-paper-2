import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  ReferenceInput,
  SelectInput,
  NumberField,
} from "react-admin";
import { dateFormatOptions } from "../../const";

export const SaleList: React.FunctionComponent = (props) => {
  const [sellerFilter, setSellerFilter] = React.useState<{ pos_id?: number }>(
    {}
  );

  const onPosChange = React.useCallback((event) => {
    if (event.target) {
      setSellerFilter({ pos_id: event.target.value });
    } else {
      setSellerFilter({});
    }
  }, []);

  const filters = [
    <ReferenceInput
      source="customer_id"
      reference="customer"
      label="Customer"
      allowEmpty={false}
      alwaysOn
      resettable
    >
      <SelectInput optionText="name" />
    </ReferenceInput>,

    <ReferenceInput
      source="pos_id"
      reference="pos"
      label="Store"
      allowEmpty={false}
      alwaysOn
      resettable
      onChange={onPosChange}
    >
      <SelectInput optionText="name" />
    </ReferenceInput>,

    <ReferenceInput
      source="seller_id"
      reference="seller"
      label="Seller"
      allowEmpty={false}
      alwaysOn
      resettable
      filter={sellerFilter}
    >
      <SelectInput optionText="name" />
    </ReferenceInput>,
  ];

  return (
    <List {...props} filters={filters} sort={{ field: "date", order: "DESC" }}>
      <Datagrid rowClick="show">
        <DateField source="date" options={dateFormatOptions} />
        <NumberField
          source="total"
          options={{ style: "currency", currency: "EUR" }}
        />
        <ReferenceField source="customer_id" reference="customer" link={false}>
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="seller_id" reference="seller" link={false}>
          <TextField source="name" />
        </ReferenceField>
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
      </Datagrid>
    </List>
  );
};
