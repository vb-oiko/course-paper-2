import * as React from "react";

export interface PageTitleProps {
  record?: Record<string, any>;
  title?: string;
  field?: string;
}
export const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  record,
  title,
  field = "name",
}) => {
  return (
    <span>
      {title} {record ? `"${record[field]}"` : ""}
    </span>
  );
};
