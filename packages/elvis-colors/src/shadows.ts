export const shadows = {
  none: {
    boxShadow: 'none',
  },
  soft: {
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.03)',
  },
  medium: {
    boxShadow: '0 0 40px rgba(0, 0, 0, 0.06)',
  },
  hard: {
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.08)',
  },
} as const;

type Shadows = typeof shadows;

export type ShadowName = keyof Shadows;

type ShadowVariable<T extends ShadowName> = `var(--e-shadow-${T}, ${Shadows[T]['boxShadow']})`;
/**
 * @returns CSS-variable for the shadow from Elvis, with a fallback to the value.
 *
 * @example css`
 * box-shadow: ${getShadow('soft')};
 *`
 *
 * @since 1.7.0
 */
export const getShadow = <T extends ShadowName>(name: T): ShadowVariable<T> => {
  return `var(--e-shadow-${name}, ${shadows[name].boxShadow})` as ShadowVariable<T>;
};
