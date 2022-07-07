import InAppReview from 'react-native-in-app-review';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function useAppReview() {
  const isAppReviewAvailable = InAppReview.isAvailable();

  const { getItem, setItem } = useAsyncStorage(
    '@isus:app-review',
    null
  );

  const onAppReview = async () => {
    const today = moment();
    const intervalDays = 15; // Intervalo de dias para solicitar review

    try {
      const lastDateAppReviewed = await getItem();

      if (lastDateAppReviewed) {

        const itShouldShowReviewToday = moment(lastDateAppReviewed)
          .add(intervalDays, 'days')
          .isSameOrBefore(today);

        if (itShouldShowReviewToday) {
          await setItem(today.format().toString());

          await InAppReview.RequestInAppReview();
        }

      } else {
        await setItem(today.format().toString());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    onAppReview,
    isAppReviewAvailable
  };
}
