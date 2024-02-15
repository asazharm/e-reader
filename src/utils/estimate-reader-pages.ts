import { Rendition, Book, Location } from "epubjs";

export const estimatePages = async (book: Book, rendition: Rendition) => {
  const bookLocations = book.locations as Book["locations"] & {
    total: number;
    _locations: string[];
  };

  console.log('estimatePages')

  if (bookLocations.total == 0) await bookLocations.generate(2048);

  console.log('/estimatePages')

  const currentLocation = rendition.currentLocation() as unknown as Location;
  const sectionIndex = currentLocation.start.index;
  const sectionPages = currentLocation.start.displayed.total;
  const sectionBaseCFI = book.spine.get(sectionIndex).cfiBase;

  const sectionStartLocation = bookLocations._locations.findIndex((item) =>
    item.startsWith("epubcfi(" + sectionBaseCFI)
  );
  const sectionLocations = bookLocations._locations.filter((item) =>
    item.startsWith("epubcfi(" + sectionBaseCFI)
  ).length;

  const totalLocations = bookLocations.total;
  const estPages = (totalLocations * sectionPages) / sectionLocations;
  const estSectionStartPage =
    estPages * (sectionStartLocation / totalLocations);
  const estCurrentPage =
    estSectionStartPage + currentLocation.start.displayed.page;

  return {
    currentPage: Math.round(estCurrentPage),
    totalPages: Math.round(estPages),
  };
};

export default estimatePages;
