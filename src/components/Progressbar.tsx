import AppContext from "@/contexts/AppContext/AppContext";
import { ReaderMode } from "@/contexts/AppContext/AppContextProvider";
import { FC, useContext } from "react";
import { Slider } from "@/components/Slider";

interface ProgressbarProps {
  value: number;
  title?: string;
  page?: number;
  total?: number;
  chapter?: string;

  setPage(page: number): void;
}

const Progressbar: FC<ProgressbarProps> = ({
  value,
  chapter = "",
  total = 0,
  page = 0,
  title = "",
  setPage,
}) => {
  const { state } = useContext(AppContext);

  return [ReaderMode.Read, ReaderMode.Settings].includes(state?.readerMode) ? (
    <div className="absolute bottom-0 z-50 w-full bg-[#F5F5F5] border-t border-[#D1D2D4]">
      {state?.readerMode === ReaderMode.Settings ? (
        <div className="p-4">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between text-secondary font-bold text-sm">
              <p>{title}</p>

              <p className="whitespace-nowrap">
                {page} из {total}
              </p>
            </div>

            <div className="text-secondary">{chapter}</div>
          </div>

          <Slider
            value={page}
            min={1}
            max={total}
            step={1}
            onChange={setPage}
          />
        </div>
      ) : (
        <div
          className="bg-primary h-1 rounded-full"
          style={{ width: `${value * 100}%` }}
        />
      )}
    </div>
  ) : null;
};

export default Progressbar;
