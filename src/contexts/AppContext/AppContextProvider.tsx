import { ReactNode, useReducer } from "react";
import AppContext from "./AppContext";
import type { NavItem } from "epubjs";
import bookmarks from '@/components/Bookmarks'

export enum AppMode {
  Read = "read",
  Preview = "preview",
}

export enum ReaderMode {
  Read = "read",
  Settings = "settings",
  SettingsView = "SettingsView",
  AddedBookmark = "AddedBookmark",
  Bookmarks = "Bookmarks",
  Chapters = "chapters",
}

type Book = {
  title: string;
  author: string;
  genre: string;
  desc: string;
};

export interface Bookmark {
  page: number;
  title: string;
  author: string;
  chapter: string;
}

export interface IAppState {
  appMode: AppMode;
  readerMode: ReaderMode;
  book: Book;
  chapters: NavItem[];
  location: string;
  currentChapterIndex: number;
  currentPage: number;
  bookmarkIconHighlighted: boolean;
  bookmarks: Bookmark[];
}

const initalState: IAppState = {
  appMode: AppMode.Preview,
  readerMode: ReaderMode.Read,
  book: {
    title: "Вино из одуванчиков",
    author: "Рэй Брэдбери",
    genre: "Роман",
    desc: `Утро было тихое, город, окутанный тьмой, мирно нежился в постели. Пришло лето, и ветер был летний — теплое дыхание мира, неспешное и ленивое. Стоит лишь встать, высунуться в окошко, и тотчас поймешь: вот она начинается, настоящая свобода и жизнь, вот оно, первое утро лета. Дуглас Сполдинг, двенадцати лет от роду, только что открыл глаза и, как в теплую речку, погрузился в предрассветную безмятежность. Он лежал в сводчатой комнатке на четвертом этаже — во всем городе не было башни выше, — и оттого, что он парил так высоко в воздухе вместе с июньским ветром, в нем рождалась чудодейственная сила. По ночам, когда вязы, дубы и клены сливались в одно беспокойное море, Дуглас окидывал его взглядом, пронзавшим тьму, точно маяк. И сегодня… — Вот здорово! — шепнул он. Впереди целое лето, несчетное множество дней — чуть не полкалендаря. Он уже видел себя многоруким, как божество Шива из книжки про путешествия: только поспевай рвать еще зеленые яблоки, персики, черные как ночь сливы. Его не вытащить из лесу, из кустов, из речки. А как приятно будет померзнуть, забравшись в заиндевелый ледник, как весело жариться в бабушкиной кухне заодно с тысячью цыплят!`,
  },
  chapters: [],
  location: "",
  currentChapterIndex: 1,
  currentPage: 0,
  bookmarkIconHighlighted: false,
  bookmarks: [],
};

type TAppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider = ({ children }: TAppContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initalState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export type TAppReducerAction = {
  type: string;
  value: unknown;
};

const appReducer = (state: IAppState, action: TAppReducerAction) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.value as string };
    case "SET_APPMODE":
      return { ...state, appMode: action.value as AppMode };
    case "SET_READERMODE":
      return { ...state, readerMode: action.value as ReaderMode };
    case "SET_CHAPTERS":
      return { ...state, chapters: action.value as NavItem[] };
    case "SET_LOCATION":
      return { ...state, location: action.value as string };
    case "SET_CHAPTERINDEX":
      return { ...state, currentChapterIndex: action.value as number };
    case "SET_CURRPAGE":
      return { ...state, currentPage: action.value as number };
    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.value] };
    case "SET_BOOKMARK_ACTIVE":
      return { ...state, bookmarkIconHighlighted: action.value };
    default:
      return state;
  }
};

export default AppContextProvider;
