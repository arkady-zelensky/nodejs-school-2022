import { AbstractPDFTemplate } from "../templates/abstract.pdf-template";

export interface IPDFGenerator {
  generatePDF<TPayload>(template: AbstractPDFTemplate<TPayload>): Promise<Buffer>;
}
