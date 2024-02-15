import { FC } from "react";
import { Rendition } from "epubjs";

import { Slider } from "@/components/Slider";
import FontSelector from "@/components/FontSelector";
import Sidebar from "@/components/Sidebar";

import EditFontSizeIcon from "@/assets/editFontSize.svg?react";
import BrightnessIcon from "@/assets/brightness.svg?react";
import FontsIcon from "@/assets/fonts.svg?react";

import SettingsItem from "./SettingsItem";

interface SettingsProps {
  rendition: Rendition | null;

  fontSize: number;
  brightness: number;
  font: string;

  setFontSize(fontSize: number): void;

  setBrightness(fontSize: number): void;

  setFont(font: string): void;
}

const Settings: FC<SettingsProps> = ({
  setFontSize,
  fontSize,
  setBrightness,
  brightness,
  font,
  setFont,
}) => (
  <Sidebar fullHeight={false}>
    <SettingsItem
      Icon={<BrightnessIcon />}
      label="Яркость"
      Inner={
        <Slider
          min={1}
          max={10}
          step={1}
          value={brightness}
          onChange={setBrightness}
        />
      }
    />

    <SettingsItem
      Icon={<FontsIcon />}
      label="Шрифт"
      Inner={<FontSelector setFont={setFont} font={font} />}
    />

    <SettingsItem
      Icon={<EditFontSizeIcon />}
      label="Размер"
      Inner={
        <Slider
          min={10}
          max={20}
          step={1}
          value={fontSize}
          onChange={setFontSize}
        />
      }
    />
  </Sidebar>
);

export default Settings;
