export interface UtilityGroup {
  title: string;
  path?: string;
  fragment?: string;
  classes: UtilityClass[];
}
interface UtilityClass {
  className: `e-${string}`;
  description: `${string}.`;
  styling: string;
}
