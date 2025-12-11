import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "vuetify/styles";

export default createVuetify({
	components,
	directives,
	defaults: {
		VCard: {
			elevation: 2,
			rounded: "lg",
		},
		VBtn: {
			variant: "flat",
			rounded: "lg",
			height: 44,
		},
		VTextField: {
			variant: "outlined",
			color: "primary",
		},
		VAutocomplete: {
			variant: "outlined",
			color: "primary",
		},
	},
	theme: {
		defaultTheme: "modernLight",
		themes: {
			modernLight: {
				dark: false,
				colors: {
					background: "#F3F4F6",
					surface: "#FFFFFF",
					primary: "#4F46E5", // Indigo profond
					secondary: "#10B981", // Émeraude
					error: "#EF4444",
					info: "#3B82F6",
					success: "#10B981",
					warning: "#F59E0B",
				},
			},
		},
	},
	icons: {
		defaultSet: "mdi",
		aliases,
		sets: {
			mdi,
		},
	},
});
