export interface UtilityGroup {
  title: string;
  path?: string;
  fragment?: string;
  classes: UtilityClass[];
}
export interface UtilityClass {
  className: string;
  description: string;
  styling: string;
}
