import { LanguageMap } from "./language-map";
export default function useCodeLanguage(fileName?: string) {
  if (fileName === undefined) return "";
  const splitted = fileName.split(".");
  const extension = splitted[splitted.length - 1];
  const lang = LanguageMap[extension];
  if (lang === undefined) return "text";
  return lang;
}
