import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { Button, DefaultTheme } from 'react-native-paper';
import { CORES } from '~/constantes/estiloBase';

const iSUSLogoAppReview = require('../../assets/images/appReviewImg/logo_iSUS-appreview.png');

const primaryButtonTheme = {
  ...DefaultTheme,
  colors: {
    primary: CORES.BRANCO,
  },
};
const secondaryButtonTheme = {
  ...DefaultTheme,
  colors: {
    primary: CORES.LARANJA,
  },
};

const AppRateModal = () => {
  const DISABLE_APP_REVIEW = 'DISABLE_APP_REVIEW';

  const [openModal, setOpenModal] = useState(false);

  const { getItem, setItem } = useAsyncStorage('@isus:app-review');

  const today = moment();

  const handleReviewNow = async () => {
    try {
      await setItem(DISABLE_APP_REVIEW);
      setOpenModal(false);
      await InAppReview.RequestInAppReview();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewLater = async () => {
    try {
      const reviewLaterIntervalDays = 10;

      setItem(
        moment(today)
          .add(reviewLaterIntervalDays, 'days')
          .format()
          .toString()
      );
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDontShowAgain = async () => {
    try {
      await setItem(DISABLE_APP_REVIEW);
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const checkShowReviewModal = async () => {
    try {
      const reviewLaterDate = await getItem();

      if (reviewLaterDate === DISABLE_APP_REVIEW) {
        return;
      }

      if (reviewLaterDate) {
        const itShouldShowReviewToday = moment(reviewLaterDate)
          .isSameOrBefore(today);

        if (itShouldShowReviewToday) {
          setOpenModal(true);
        }
      } else {
        const defaultIntervalDays = 5;

        await setItem(
          moment(today)
            .add(defaultIntervalDays, 'days')
            .format()
            .toString()
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (InAppReview.isAvailable()) {
      checkShowReviewModal();
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={handleReviewLater}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalContent}>
          <Image
            style={styles.modalImage}
            source={iSUSLogoAppReview}
          />
          <View style={styles.modalBody}>

            <Text style={styles.modalTitle}>O que está achando do iSUS?</Text>
            <Text style={styles.modalSubtitle}>Avalie nosso aplicativo! É rapidinho, você dá a sua nota e nos ajuda a seguir melhorando.</Text>
            <Button
              theme={primaryButtonTheme}
              style={styles.buttonReview}
              onPress={handleReviewNow}
            >
              AVALIAR AGORA
            </Button>
            <Button
              theme={primaryButtonTheme}
              style={styles.buttonReview}
              onPress={handleReviewLater}
            >
              LEMBRE-ME DEPOIS
            </Button>
            <Button
              theme={secondaryButtonTheme}
              style={styles.buttonDontShowAgain}
              onPress={handleDontShowAgain}
            >
              NÃO QUERO AVALIAR O ISUS
            </Button>
          </View>

        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalContent: {
    height: 513,
    width: 343,
    backgroundColor: CORES.BRANCO,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalImage: {
    width: '100%'
  },
  modalBody: {
    marginHorizontal: 18
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: CORES.PRETO30,
    paddingVertical: 16
  },
  modalSubtitle: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 16,
    color: CORES.PRETO30,
    paddingBottom: 16
  },

  buttonReview: {
    width: 295,
    height: 36,
    backgroundColor: CORES.VERDE,
    marginBottom: 16,
  },
  buttonDontShowAgain: {
    width: 295,
    height: 36,
    color: CORES.LARANJA,
  },

});

export default AppRateModal;
