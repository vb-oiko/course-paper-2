import * as React from "react";

export interface PageTitleProps {
  record?: { name: string };
  title?: string;
}
export const PageTitle: React.FunctionComponent<PageTitleProps> = ({
  record,
  title,
}) => {
  return (
    <span>
      {title} {record ? `"${record.name}"` : ""}
    </span>
  );
};
