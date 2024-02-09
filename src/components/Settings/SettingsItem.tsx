import {FC, ReactNode} from "react";

interface SettingsItemProps {
  label: string;
  Icon: ReactNode;
  Inner: ReactNode;
}

const SettingsItem: FC<SettingsItemProps> = ({ label, Inner, Icon }) => {
  return <div style={{ gridTemplateColumns: '58px auto' }} className="grid gap-4 py-2 px-4 border-b-gray-100 border-b">
    <div className="flex flex-col gap-1 items-center">
      {Icon}

      <p className="text-sm">{label}</p>
    </div>

    {Inner}
  </div>;
};

export default SettingsItem;
