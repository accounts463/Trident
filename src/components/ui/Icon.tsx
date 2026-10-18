import {
  Factory,
  HardHat,
  House,
  Layers,
  Leaf,
  MessagesSquare,
  Recycle,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Wrench,
  Zap,
  type LucideProps,
} from "lucide-react";

const icons = {
  factory: Factory,
  ruler: Ruler,
  hardhat: HardHat,
  home: House,
  wrench: Wrench,
  layers: Layers,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  message: MessagesSquare,
  sun: Sun,
  recycle: Recycle,
  zap: Zap,
  leaf: Leaf,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden strokeWidth={1.6} {...props} />;
}
