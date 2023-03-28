export interface TsDoc {
  id: number;
  name: string;
  children: InterfaceName[];
}

export interface InterfaceName {
  name: string;
  children?: Prop[];
  type: {
    type: PropType['type'];
    types: { type: string; value: string }[];
  };
}

export interface Prop {
  id: number;
  name: string;
  flags: PropFlags;
  type: PropType;
  comment?: PropComment;
}

interface PropFlags {
  isOptional?: boolean;
}

interface PropType {
  type: 'reference' | 'union' | 'intrinsic' | 'reflection' | 'array' | 'mapped' | 'literal';
  name?: string;
}

interface PropComment {
  blockTags: CommentTag[];
}

export interface CommentTag {
  tag: '@cegType' | '@cegValue' | '@cegLabel' | '@cegGroup' | 'example' | 'description';
  content: [{ kind: 'text'; text: string }];
}
