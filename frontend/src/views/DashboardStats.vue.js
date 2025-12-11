/* placeholder */
import { onMounted, ref } from "vue";
import ApiService from "../services/ApiService";
const loading = ref(false);
const items = ref([]);
const filters = ref({
    from: "",
    to: "",
});
const headers = [
    { title: "Code Analytique", key: "analyticCode" },
    { title: "Distance Totale", key: "totalDistanceKm" },
];
const fetchStats = async () => {
    loading.value = true;
    try {
        const params = {};
        if (filters.value.from)
            params.from = filters.value.from;
        if (filters.value.to)
            params.to = filters.value.to;
        const response = await ApiService.getStats(params);
        items.value = response.data.items;
    }
    catch (err) {
        console.error(err);
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    fetchStats();
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-h4 mb-4" },
});
/** @type {__VLS_StyleScopedClasses['text-h4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
let __VLS_0;
/** @ts-ignore @type {typeof ___VLS_components.vCard | typeof ___VLS_components.VCard} */
vCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "mb-4" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type {typeof ___VLS_components.vCardText | typeof ___VLS_components.VCardText} */
vCardText;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type {typeof ___VLS_components.vRow | typeof ___VLS_components.VRow} */
vRow;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const { default: __VLS_17 } = __VLS_15.slots;
let __VLS_18;
/** @ts-ignore @type {typeof ___VLS_components.vCol | typeof ___VLS_components.VCol} */
vCol;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    cols: "12",
    md: "4",
}));
const __VLS_20 = __VLS_19({
    cols: "12",
    md: "4",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
let __VLS_24;
/** @ts-ignore @type {typeof ___VLS_components.vTextField | typeof ___VLS_components.VTextField} */
vTextField;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.filters.from),
    type: "date",
    label: "Date début",
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.filters.from),
    type: "date",
    label: "Date début",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
// @ts-ignore
[filters,];
var __VLS_21;
let __VLS_29;
/** @ts-ignore @type {typeof ___VLS_components.vCol | typeof ___VLS_components.VCol} */
vCol;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    cols: "12",
    md: "4",
}));
const __VLS_31 = __VLS_30({
    cols: "12",
    md: "4",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_34 } = __VLS_32.slots;
let __VLS_35;
/** @ts-ignore @type {typeof ___VLS_components.vTextField | typeof ___VLS_components.VTextField} */
vTextField;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    modelValue: (__VLS_ctx.filters.to),
    type: "date",
    label: "Date fin",
}));
const __VLS_37 = __VLS_36({
    modelValue: (__VLS_ctx.filters.to),
    type: "date",
    label: "Date fin",
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
// @ts-ignore
[filters,];
var __VLS_32;
let __VLS_40;
/** @ts-ignore @type {typeof ___VLS_components.vCol | typeof ___VLS_components.VCol} */
vCol;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    cols: "12",
    md: "4",
    ...{ class: "d-flex align-center" },
}));
const __VLS_42 = __VLS_41({
    cols: "12",
    md: "4",
    ...{ class: "d-flex align-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
const { default: __VLS_45 } = __VLS_43.slots;
let __VLS_46;
/** @ts-ignore @type {typeof ___VLS_components.vBtn | typeof ___VLS_components.VBtn} */
vBtn;
// @ts-ignore
const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_48 = __VLS_47({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_47));
let __VLS_51;
const __VLS_52 = ({ click: {} },
    { onClick: (__VLS_ctx.fetchStats) });
const { default: __VLS_53 } = __VLS_49.slots;
// @ts-ignore
[loading, fetchStats,];
var __VLS_49;
var __VLS_50;
// @ts-ignore
[];
var __VLS_43;
// @ts-ignore
[];
var __VLS_15;
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
let __VLS_54;
/** @ts-ignore @type {typeof ___VLS_components.vCard | typeof ___VLS_components.VCard} */
vCard;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({}));
const __VLS_56 = __VLS_55({}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_59 } = __VLS_57.slots;
let __VLS_60;
/** @ts-ignore @type {typeof ___VLS_components.vDataTable | typeof ___VLS_components.VDataTable} */
vDataTable;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    headers: (__VLS_ctx.headers),
    items: (__VLS_ctx.items),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}));
const __VLS_62 = __VLS_61({
    headers: (__VLS_ctx.headers),
    items: (__VLS_ctx.items),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
/** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
const { default: __VLS_65 } = __VLS_63.slots;
{
    const { 'item.totalDistanceKm': __VLS_66 } = __VLS_63.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_66);
    (item.totalDistanceKm.toFixed(2));
    // @ts-ignore
    [loading, headers, items,];
}
// @ts-ignore
[];
var __VLS_63;
// @ts-ignore
[];
var __VLS_57;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
