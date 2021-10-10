import * as React from "react";
import {
  EditButton,
  TopToolbar,
  Record,
  CreateButton,
  DeleteButton,
} from "react-admin";

export interface CrudActionsProps {
  data?: Record;
  basePath?: string;
}
export const CrudActions: React.FunctionComponent<CrudActionsProps> = ({
  basePath,
  data,
}) => {
  return (
    <TopToolbar>
      <CreateButton basePath={basePath} record={data} />
      <EditButton basePath={basePath} record={data} />
      <DeleteButton basePath={basePath} record={data} />
    </TopToolbar>
  );
};
