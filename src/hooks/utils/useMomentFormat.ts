import { Moment } from "moment";

export default function useMomentFormat() {
  const formatMoment = (date: Moment) => {
    return date.format("DD-MM-YYYY HH:mm");
  };
  return { formatMoment };
}
