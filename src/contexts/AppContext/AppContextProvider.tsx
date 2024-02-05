import { ReactNode, useReducer } from "react";
import AppContext from "./AppContext";
import type { NavItem } from "epubjs";

export enum AppMode {
  Read = "read",
  Preview = "preview",
}
export enum ReaderMode {
  Read = "read",
  Settings = "settings",
  Chapters = "chapters",
}

type Book = {
  title: string;
  author: string;
  genre: string;
  desc: string;
};

export interface IAppState {
  appMode: AppMode;
  readerMode: ReaderMode;
  book: Book;
  chapters: NavItem[];
  location: string;
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
    default:
      return state;
  }
};

export default AppContextProvider;
