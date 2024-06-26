export const languages = [
    {
        "language_code": "lang_ar",
        "language_name": "Arabic"
    },
    {
        "language_code": "lang_hy",
        "language_name": "Armenian"
    },
    {
        "language_code": "lang_bg",
        "language_name": "Bulgarian"
    },
    {
        "language_code": "lang_ca",
        "language_name": "Catalan"
    },
    {
        "language_code": "lang_cs",
        "language_name": "Czech"
    },
    {
        "language_code": "lang_da",
        "language_name": "Danish"
    },
    {
        "language_code": "lang_de",
        "language_name": "German"
    },
    {
        "language_code": "lang_el",
        "language_name": "Greek"
    },
    {
        "language_code": "lang_en",
        "language_name": "English"
    },
    {
        "language_code": "lang_es",
        "language_name": "Spanish"
    },
    {
        "language_code": "lang_et",
        "language_name": "Estonian"
    },
    {
        "language_code": "lang_tl",
        "language_name": "Filipino"
    },
    {
        "language_code": "lang_fi",
        "language_name": "Finnish"
    },
    {
        "language_code": "lang_fr",
        "language_name": "French"
    },
    {
        "language_code": "lang_hr",
        "language_name": "Croatian"
    },
    {
        "language_code": "lang_hi",
        "language_name": "Hindi"
    },
    {
        "language_code": "lang_hu",
        "language_name": "Hungarian"
    },
    {
        "language_code": "lang_id",
        "language_name": "Indonesian"
    },
    {
        "language_code": "lang_is",
        "language_name": "Icelandic"
    },
    {
        "language_code": "lang_it",
        "language_name": "Italian"
    },
    {
        "language_code": "lang_iw",
        "language_name": "Hebrew"
    },
    {
        "language_code": "lang_ja",
        "language_name": "Japanese"
    },
    {
        "language_code": "lang_ko",
        "language_name": "Korean"
    },
    {
        "language_code": "lang_lt",
        "language_name": "Lithuanian"
    },
    {
        "language_code": "lang_lv",
        "language_name": "Latvian"
    },
    {
        "language_code": "lang_nl",
        "language_name": "Dutch"
    },
    {
        "language_code": "lang_no",
        "language_name": "Norwegian"
    },
    {
        "language_code": "lang_fa",
        "language_name": "Persian"
    },
    {
        "language_code": "lang_pl",
        "language_name": "Polish"
    },
    {
        "language_code": "lang_pt",
        "language_name": "Portuguese"
    },
    {
        "language_code": "lang_ro",
        "language_name": "Romanian"
    },
    {
        "language_code": "lang_ru",
        "language_name": "Russian"
    },
    {
        "language_code": "lang_sk",
        "language_name": "Slovak"
    },
    {
        "language_code": "lang_sl",
        "language_name": "Slovenian"
    },
    {
        "language_code": "lang_sr",
        "language_name": "Serbian"
    },
    {
        "language_code": "lang_sv",
        "language_name": "Swedish"
    },
    {
        "language_code": "lang_th",
        "language_name": "Thai"
    },
    {
        "language_code": "lang_tr",
        "language_name": "Turkish"
    },
    {
        "language_code": "lang_uk",
        "language_name": "Ukrainian"
    },
    {
        "language_code": "lang_vi",
        "language_name": "Vietnamese"
    },
    {
        "language_code": "lang_zh-CN",
        "language_name": "Chinese (Simplified)"
    },
    {
        "language_code": "lang_zh-TW",
        "language_name": "Chinese (Traditional)"
    }
]

export type LanguageType = typeof languages[number]['language_code']
export type LanguageNameType = typeof languages[number]['language_name']


export const getLanguageById = (id?: LanguageType) => {
    if(!id) return undefined

    const res=  languages.find((language) => language.language_code === id)

    if(res) return {
        language_code: res.language_code?.replace('lang_', '')?.toLowerCase(),
        language_name: res.language_name
    }

    return undefined
}