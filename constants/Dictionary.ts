import * as Localization from 'expo-localization';
import { I18nResolver } from 'i18n-ts';

const MESSAGES: any = {
    en: {
        add:                                                'add',
        perishableGoods:                                    'perishable goods',
        setLocation:                                        'set location',
        bestBefore:                                         'best before',
        successfullyAdded:                                  'successfully added',
        letsContinueWithOtherPerishableGood:                'let\'s continue with other perishable good',
        cancel:                                             'cancel',
        okay:                                               'Okay',
        new:                                                'New',
        chooseAPhoto:                                       'choose a photo',
        expirationDate:                                     'expiration date',
        pickedLocation:                                     'picked location',
        all:                                                'All',
        signUp:                                             'sign up',
        name:                                               'name',
        emailAddress:                                       'email address',
        password:                                           'password',
        confirmPassword:                                    'confirm password',
        submit:                                             'submit',
        youHaveSuccessfullysignedUp:                        'you have successfully signed up',
        aProblemOccurredWhileCommunicatingWithTheServer:    'a problem occurred while communicating with the server',
        inOrderToMarkAsAvailableYouNeedToSignIn:            'in order to mark as available you need to sign in',
        signIn:                                             'sign in',
        or:                                                 'or',
        pleaseEnterAName:                                   'please enter a name',
        pleaseEnterAPassword:                               'please enter a password',
        passwordMustBeAtLeast6Characters:                   'password must be at least 6 characters',
        confirmPasswordMustBeEqualToPassword:               'confirm password must be equal to password',
        pleaseEnterAnEmailAddress:                          'please enter an email address',
        pleaseEnterAValidEmailAddress:                      'please enter a valid email address',
        nearby:                                             'Nearby',
        meter:                                              'meter',
        showMyNeed:                                         'show my need',
        statusOfMyRequest:                                  'status of my request',
        loading:                                            'loading',
        inOrderToShowYourNeedYouHaveToSignIn:               'in order to show your need you have to sign in',
        lookWhoRequestedThis:                               'look who requested this',
        approve:                                            'approve'
    },
    hu: {
        add:                                                'hozzáad',
        perishableGoods:                                    'romlandó áru',
        setLocation:                                        'hely meghatározása',
        bestBefore:                                         'jó mielőtt',
        successfullyAdded:                                  'sikeresen hozzáadva',
        letsContinueWithOtherPerishableGood:                'gyerünk folytassa más romlandó áruval',
        cancel:                                             'mégsem',
        okay:                                               'Oké',
        new:                                                'Új',
        chooseAPhoto:                                       'válasszon egy fényképet',
        expirationDate:                                     'lejárat',
        pickedLocation:                                     'kiválasztott helyzet',
        all:                                                'Összes',
        signUp:                                             'regisztráció',
        name:                                               'név',
        emailAddress:                                       'email cím',
        password:                                           'jelszó',
        confirmPassword:                                    'jelszó megerősítése',
        submit:                                             'beküld',
        youHaveSuccessfullysignedUp:                        'sikeresen regisztrált',
        aProblemOccurredWhileCommunicatingWithTheServer:    'probléma merült fel a szerverrel való kommunikáció során',
        inOrderToMarkAsAvailableYouNeedToSignIn:            'be kell jelentkeznie, hogy megjelölje elérhetőként',
        signIn:                                             'bejelentkezés',
        or:                                                 'vagy',
        pleaseEnterAName:                                   'kérjük, adjon meg egy nevet',
        pleaseEnterAPassword:                               'kérjük, adjon meg egy jelszót',
        passwordMustBeAtLeast6Characters:                   'a jelszó legalább 6 karakter kell hogy legyen',
        confirmPasswordMustBeEqualToPassword:               'a két jelszó meg kell hogy egyezzen',
        pleaseEnterAnEmailAddress:                          'kérjük, adjon meg egy email címet',
        pleaseEnterAValidEmailAddress:                      'kérjük, adjon meg egy érvényes email címet',
        nearby:                                             'Közeli',
        meter:                                              'méter',
        showMyNeed:                                         'jelzem az igényemet',
        statusOfMyRequest:                                  'igénylésem állapota',
        loading:                                            'töltés',
        inOrderToShowYourNeedYouHaveToSignIn:               'be kell jelentkeznie, hogy jelezze az igényét',
        lookWhoRequestedThis:                               'nézze meg, hogy ki igényelte ezt',
        approve:                                            'jóváhagy'
    }
    // , default: en
};

export const i18n: unknown = new I18nResolver(MESSAGES, Localization.locale).translation;
