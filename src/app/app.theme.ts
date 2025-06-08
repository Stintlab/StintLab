import {definePreset} from "@primeng/themes";
import Aura from "@primeng/themes/aura";

export const StintLab = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                primary: {
                    color: '{sky.500}',
                    inverseColor: '#ffffff',
                    hoverColor: '{sky.900}',
                    activeColor: '{sky.800}'
                },
                surface: {
                    0: '#ffffff',
                    50: '{sky.50}',
                    100: '{sky.100}',
                    200: '{sky.200}',
                    300: '{sky.300}',
                    400: '{sky.400}',
                    500: '{sky.500}',
                    600: '{sky.600}',
                    700: '{sky.700}',
                    800: '{sky.800}',
                    900: '{sky.900}',
                    950: '{sky.950}'
                }
            },
            dark: {
                primary: {
                    color: '{sky.500}',
                    inverseColor: '{sky.950}',
                    hoverColor: '{sky.100}',
                    activeColor: '{sky.200}'
                },
                surface: {
                    0: '#ffffff',
                    50: '{sky.50}',
                    100: '{sky.100}',
                    200: '{sky.200}',
                    300: '{sky.300}',
                    400: '{sky.400}',
                    500: '{sky.500}',
                    600: '{sky.600}',
                    700: '{sky.700}',
                    800: '{sky.800}',
                    900: '{sky.900}',
                    950: '{sky.950}'
                }
            }
        }
    }
});