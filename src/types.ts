export type ViewAngle = 'front34' | 'profile' | 'rear' | 'cockpit' | 'windtunnel';

export interface CarColorFinish {
  id: string;
  name: string;
  subtitle: string;
  hex: string;
  secondaryHex: string;
  metallicGloss: number;
  matte: boolean;
  stripeColor?: string;
  description: string;
}

export interface WheelFinish {
  id: string;
  name: string;
  rimColor: string;
  caliperColor: string;
}

export interface CarTelemetry {
  speedMph: number;
  rpm: number;
  gear: string;
  downforceKg: number;
  dragCoefficient: number;
  wingAngleDeg: number;
  gForce: number;
}
