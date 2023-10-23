import { DeviceType } from "./deviceType";
export interface Device {
  id?: number;
  userId: number;
  name: string;
  typeId: number;
  type?: DeviceType,
  color?: string;
  volume?: number;
  isOpen?: boolean;
}
