import { MutableRefObject, useContext, useEffect, useState } from "react";
import { Rendition } from "epubjs";
import { estimatePages } from "@/utils/estimate-reader-pages";
import { ReaderMode } from "@/contexts/AppContext/AppContextProvider.tsx";
import AppContext from "@/contexts/AppContext/AppContext.ts";

export const useReaderPagination = (
  rendition: MutableRefObject<Rendition | null>
) => {
  const { dispatch } = useContext(AppContext);

  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
  }>();

  const handleLocationChange = () => {
    if (!rendition.current) return;

    estimatePages(rendition.current.book, rendition.current).then((res) =>
      setPagination(res)
    );
  };

  const handlePageChange = (page: number) =>
    rendition.current?.display(
      rendition.current?.book.locations.cfiFromPercentage(
        pagination ? page / pagination.totalPages : 0
      )
    );

  useEffect(() => {
    dispatch({ type: "SET_CURRPAGE", value: pagination?.currentPage || 0 });
  }, [dispatch, pagination?.currentPage]);

  return {
    pagination,
    progress: pagination ? pagination.currentPage / pagination.totalPages : 0,
    handleLocationChange,
    handlePageChange,
  };
};
