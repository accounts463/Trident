import {
  Award,
  Blocks,
  Bolt,
  Building2,
  Cable,
  Cog,
  Cpu,
  Factory,
  Gauge,
  GraduationCap,
  Handshake,
  HardHat,
  Hospital,
  Layers,
  Leaf,
  Lightbulb,
  Plug,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  TrainFront,
  Users,
  Wrench,
  Zap,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/content/types";

const icons: Record<IconKey, typeof Zap> = {
  award: Award,
  blocks: Blocks,
  bolt: Bolt,
  building: Building2,
  cable: Cable,
  cog: Cog,
  cpu: Cpu,
  factory: Factory,
  gauge: Gauge,
  graduation: GraduationCap,
  handshake: Handshake,
  hardhat: HardHat,
  hospital: Hospital,
  layers: Layers,
  leaf: Leaf,
  lightbulb: Lightbulb,
  plug: Plug,
  scale: Scale,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  train: TrainFront,
  users: Users,
  wrench: Wrench,
  zap: Zap,
};

export type IconName = IconKey;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden strokeWidth={1.6} {...props} />;
}
