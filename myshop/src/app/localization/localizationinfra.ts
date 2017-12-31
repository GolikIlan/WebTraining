import { LANG_EN_NAME, LANG_EN_TRANS, LANG_HEB_NAME, LANG_HEB_TRANS, LANG_RU_NAME, LANG_RU_TRANS } from "./langs";
import { InjectionToken } from "@angular/core";


const dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_HEB_NAME]: LANG_HEB_TRANS,
    [LANG_RU_NAME]: LANG_RU_TRANS,
};

export const LOCALIZATION = new InjectionToken('translations');

export const LOCALIZATION_PROVIDERS = [
    { provide: LOCALIZATION, useValue: dictionary },
];