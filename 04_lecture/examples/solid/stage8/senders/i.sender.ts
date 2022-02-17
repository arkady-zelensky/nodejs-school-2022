export interface ISender {
  sendFile(filePath: string): Promise<void>;
}
