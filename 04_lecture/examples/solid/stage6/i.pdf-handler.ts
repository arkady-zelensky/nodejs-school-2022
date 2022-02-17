import { AbstractPDFTemplate } from "./templates/abstract.pdf-template";

export interface IPDFHandler {
  generatePDF<TPayload>(template: AbstractPDFTemplate<TPayload>): Promise<Buffer>;
}
