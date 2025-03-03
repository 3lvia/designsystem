export interface UtilityGroup {
  title: string;
  path?: string;
  fragment?: string;
  classes: UtilityClass[];
}
export interface UtilityClass {
  className: `e-${string}`;
  description: `${string}.`;
  styling: string;
}
