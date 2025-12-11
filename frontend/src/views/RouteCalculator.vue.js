/* placeholder */
import { ref } from "vue";
import stationsData from "../assets/stations.json";
import ApiService from "../services/ApiService";
const stations = ref(stationsData);
const fromStation = ref("");
const toStation = ref("");
const analyticCode = ref("");
const loading = ref(false);
const error = ref("");
const result = ref(null);
const calculate = async () => {
    if (!fromStation.value || !toStation.value || !analyticCode.value)
        return;
    loading.value = true;
    error.value = "";
    result.value = null;
    try {
        const response = await ApiService.createRoute({
            fromStationId: fromStation.value,
            toStationId: toStation.value,
            analyticCode: analyticCode.value,
        });
        result.value = response.data;
    }
    catch (err) {
        console.error(err);
        error.value = err.response?.data?.message || "Erreur lors du calcul";
    }
    finally {
        loading.value = false;
    }
};
const getStationName = (shortName) => {
    const s = stations.value.find((s) => s.shortName === shortName);
    return s ? s.longName : shortName;
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.vCard | typeof ___VLS_components.VCard} */
vCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "mx-auto" },
    max_width: "600",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "mx-auto" },
    max_width: "600",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type {typeof ___VLS_components.vCardTitle | typeof ___VLS_components.VCardTitle} */
vCardTitle;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
var __VLS_10;
let __VLS_13;
/** @ts-ignore @type {typeof ___VLS_components.vCardText | typeof ___VLS_components.VCardText} */
vCardText;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type {typeof ___VLS_components.vForm | typeof ___VLS_components.VForm} */
vForm;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    ...{ 'onSubmit': {} },
}));
const __VLS_21 = __VLS_20({
    ...{ 'onSubmit': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_24;
const __VLS_25 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.calculate) });
const { default: __VLS_26 } = __VLS_22.slots;
let __VLS_27;
/** @ts-ignore @type {typeof ___VLS_components.vAutocomplete | typeof ___VLS_components.VAutocomplete} */
vAutocomplete;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    modelValue: (__VLS_ctx.fromStation),
    items: (__VLS_ctx.stations),
    itemTitle: "longName",
    itemValue: "shortName",
    label: "Station de départ",
    rules: ([(v) => !!v || 'Requis']),
}));
const __VLS_29 = __VLS_28({
    modelValue: (__VLS_ctx.fromStation),
    items: (__VLS_ctx.stations),
    itemTitle: "longName",
    itemValue: "shortName",
    label: "Station de départ",
    rules: ([(v) => !!v || 'Requis']),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_32;
/** @ts-ignore @type {typeof ___VLS_components.vAutocomplete | typeof ___VLS_components.VAutocomplete} */
vAutocomplete;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    modelValue: (__VLS_ctx.toStation),
    items: (__VLS_ctx.stations),
    itemTitle: "longName",
    itemValue: "shortName",
    label: "Station d'arrivée",
    rules: ([(v) => !!v || 'Requis']),
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.toStation),
    items: (__VLS_ctx.stations),
    itemTitle: "longName",
    itemValue: "shortName",
    label: "Station d'arrivée",
    rules: ([(v) => !!v || 'Requis']),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_37;
/** @ts-ignore @type {typeof ___VLS_components.vTextField | typeof ___VLS_components.VTextField} */
vTextField;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    modelValue: (__VLS_ctx.analyticCode),
    label: "Code Analytique",
    rules: ([(v) => !!v || 'Requis']),
}));
const __VLS_39 = __VLS_38({
    modelValue: (__VLS_ctx.analyticCode),
    label: "Code Analytique",
    rules: ([(v) => !!v || 'Requis']),
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
let __VLS_42;
/** @ts-ignore @type {typeof ___VLS_components.vBtn | typeof ___VLS_components.VBtn} */
vBtn;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    type: "submit",
    color: "primary",
    loading: (__VLS_ctx.loading),
    block: true,
    ...{ class: "mt-4" },
}));
const __VLS_44 = __VLS_43({
    type: "submit",
    color: "primary",
    loading: (__VLS_ctx.loading),
    block: true,
    ...{ class: "mt-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
// @ts-ignore
[calculate, fromStation, stations, stations, toStation, analyticCode, loading,];
var __VLS_45;
// @ts-ignore
[];
var __VLS_22;
var __VLS_23;
if (__VLS_ctx.error) {
    let __VLS_48;
    /** @ts-ignore @type {typeof ___VLS_components.vAlert | typeof ___VLS_components.VAlert} */
    vAlert;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        type: "error",
        ...{ class: "mt-4" },
        closable: true,
    }));
    const __VLS_50 = __VLS_49({
        type: "error",
        ...{ class: "mt-4" },
        closable: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    const { default: __VLS_53 } = __VLS_51.slots;
    (__VLS_ctx.error);
    // @ts-ignore
    [error, error,];
    var __VLS_51;
}
if (__VLS_ctx.result) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-6" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    let __VLS_54;
    /** @ts-ignore @type {typeof ___VLS_components.vDivider | typeof ___VLS_components.VDivider} */
    vDivider;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
        ...{ class: "mb-4" },
    }));
    const __VLS_56 = __VLS_55({
        ...{ class: "mb-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-h6" },
    });
    /** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "d-flex justify-space-between align-center my-2" },
    });
    /** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['align-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['my-2']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-h4 text-primary" },
    });
    /** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    (__VLS_ctx.result.distance_km);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-subtitle-1 mt-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    let __VLS_59;
    /** @ts-ignore @type {typeof ___VLS_components.vTimeline | typeof ___VLS_components.VTimeline} */
    vTimeline;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
        density: "compact",
        align: "start",
    }));
    const __VLS_61 = __VLS_60({
        density: "compact",
        align: "start",
    }, ...__VLS_functionalComponentArgsRest(__VLS_60));
    const { default: __VLS_64 } = __VLS_62.slots;
    for (const [stop, index] of __VLS_getVForSourceType((__VLS_ctx.result.path))) {
        let __VLS_65;
        /** @ts-ignore @type {typeof ___VLS_components.vTimelineItem | typeof ___VLS_components.VTimelineItem} */
        vTimelineItem;
        // @ts-ignore
        const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
            key: (index),
            dotColor: "primary",
            size: "x-small",
        }));
        const __VLS_67 = __VLS_66({
            key: (index),
            dotColor: "primary",
            size: "x-small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_66));
        const { default: __VLS_70 } = __VLS_68.slots;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mb-4" },
        });
        /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-weight-bold" },
        });
        /** @type {__VLS_StyleScopedClasses['font-weight-bold']} */ ;
        (__VLS_ctx.getStationName(stop));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-caption" },
        });
        /** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
        (stop);
        // @ts-ignore
        [result, result, result, getStationName,];
        var __VLS_68;
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
    var __VLS_62;
}
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
