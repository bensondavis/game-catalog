import { MenuItem } from "@mui/material";
import CustomTextField from "./CustomTextField";
import { ChangeEvent } from "react";

export interface SelectMenuItem {
  label: string;
  value: string;
}

interface CustomSelectProps {
  id?: string;
  classNames?: string;
  menuItems: SelectMenuItem[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomSelect = ({
  id,
  classNames,
  menuItems,
  value,
  onChange,
}: CustomSelectProps) => {
  return (
    <CustomTextField
      id={id}
      value={value}
      select
      onChange={onChange}
      className={classNames}
      size="small"
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </CustomTextField>
  );
};

export default CustomSelect;
