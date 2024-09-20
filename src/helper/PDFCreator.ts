import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import SoldCart from "../domain/model/soldCart/SoldCart";

export default class PDFCreator {
  public async createPDF(soldCart: SoldCart): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    const { width, height } = page.getSize();

    // Draw "Isabel González" header
    page.drawText(
      `${soldCart.getCustomer().getName().split(" ")[0]} ${soldCart.getCustomer().getLastName().split(" ")[0]}`,
      {
        x: 20,
        y: height - 50,
        size: 36,
        font: helveticaBoldFont,
        color: rgb(0.5, 0.5, 0.5),
      }
    );

    // Draw "Factura" title
    page.drawText("Factura", {
      x: width - 120,
      y: height - 50,
      size: 28,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });

    // Draw lines
    const lineY = height - 90;
    page.drawLine({
      start: { x: 20, y: lineY },
      end: { x: width - 20, y: lineY },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    // Section 1: "NÚMERO", "FECHA", etc.
    const leftSectionX = 20;
    const rightSectionX = width / 2 - 20;
    const sectionStartY = lineY - 20;
    const sectionLineHeight = 20;

    // Draw "NÚMERO" and related fields
    page.drawText("NÚMERO DE FACTURA", {
      x: leftSectionX,
      y: sectionStartY,
      size: 10,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`${soldCart.getId()}`, {
      x: leftSectionX,
      y: sectionStartY - sectionLineHeight,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Draw "FECHA" and related fields
    page.drawText("FECHA DE VENTA", {
      x: leftSectionX,
      y: sectionStartY - sectionLineHeight * 2,
      size: 10,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`${soldCart.getDate().toLocaleDateString("en-US")}`, {
      x: leftSectionX,
      y: sectionStartY - sectionLineHeight * 3,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Draw "NÚMERO DE PEDIDO" and related fields
    page.drawText("IDENTIFICACIÓN DEL COMPRADOR", {
      x: leftSectionX,
      y: sectionStartY - sectionLineHeight * 4,
      size: 10,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(`${soldCart.getCustomer().getId()}`, {
      x: leftSectionX,
      y: sectionStartY - sectionLineHeight * 5,
      size: 12,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Section 2: "DE", "PARA"
    const drawSectionText = (text: string, x: number, y: number) => {
      page.drawText(text, {
        x: x,
        y: y,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    };
    // Draw "DE" and related fields
    page.drawText("COMPRADOR", {
      x: rightSectionX,
      y: sectionStartY,
      size: 10,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    drawSectionText(
      `${soldCart.getCustomer().getName()} ${soldCart.getCustomer().getLastName()}`,
      rightSectionX,
      sectionStartY - sectionLineHeight
    );
    drawSectionText(
      `${soldCart.getCustomer().getPhoneNumber()}`,
      rightSectionX,
      sectionStartY - sectionLineHeight * 2
    );
    drawSectionText(
      `${soldCart.getCustomer().getEmail()}`,
      rightSectionX,
      sectionStartY - sectionLineHeight * 3
    );

    // Draw "PARA" and related fields
    const section3StartY = sectionStartY - sectionLineHeight * 6.5;
    page.drawText("EMPLEADO QUE FACTURA", {
      x: rightSectionX,
      y: section3StartY,
      size: 10,
      font: helveticaBoldFont,
      color: rgb(0, 0, 0),
    });
    drawSectionText(
      "MicroTech",
      rightSectionX,
      section3StartY - sectionLineHeight
    );
    drawSectionText(
      `${soldCart.getEmployee().getAddress()}`,
      rightSectionX,
      section3StartY - sectionLineHeight * 2
    );
    drawSectionText(
      `${soldCart.getEmployee().getPhoneNumber()}`,
      rightSectionX,
      section3StartY - sectionLineHeight * 3
    );
    drawSectionText(
      `${soldCart.getEmployee().getEmail()}`,
      rightSectionX,
      section3StartY - sectionLineHeight * 4
    );

    // Draw the table for the invoice items
    const tableLineHeight = 20;
    const colXPositions = [20, 300, 400, 500];

    // Function to draw a table row
    const drawTableRow = (
      page: any,
      y: number,
      values: string[],
      isBold = false
    ) => {
      values.forEach((value, index) => {
        page.drawText(value, {
          x: colXPositions[index],
          y: y,
          size: 10,
          font: isBold ? helveticaBoldFont : helveticaFont,
          color: rgb(0, 0, 0),
        });
      });
    };

    let currentPage = pdfDoc.addPage([600, 400]); // Start with a new page for the table
    let yPosition = height - 50;

    // Table Headers on the first table page
    drawTableRow(
      currentPage,
      yPosition,
      ["Producto", "Cantidad", "Precio unidad", "Importe"],
      true
    );
    yPosition -= tableLineHeight;

    soldCart.getProducts().forEach((product, _index) => {
      if (yPosition < 50) {
        // Add new page if there is no more space
        currentPage = pdfDoc.addPage([600, 400]);
        yPosition = height - 50;

        // Draw table headers on new page
        drawTableRow(
          currentPage,
          yPosition,
          ["Producto", "Cantidad", "Precio unidad", "Importe"],
          true
        );
        yPosition -= tableLineHeight;
      }
      const totalProduct =
        product.getProduct().getPrice() * product.getQuantity();
      const item = [
        product.getProduct().getName(),
        product.getQuantity().toString(),
        product.getProduct().getPrice().toString(),
        totalProduct.toString(),
      ];
      // Draw the item row
      drawTableRow(currentPage, yPosition, item);
      yPosition -= tableLineHeight;
    });
    const finalYPosition = yPosition - 5;

    currentPage.drawLine({
      start: { x: 20, y: finalYPosition },
      end: { x: width - 20, y: finalYPosition },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    let totalNeto = 0;

    soldCart.getProducts().forEach((product) => {
      totalNeto += product.getProduct().getPrice() * product.getQuantity();
    });

    const iva = totalNeto * 0.19;
    const totalBruto = totalNeto * 0.81;

    // Draw the total
    drawTableRow(
      currentPage,
      finalYPosition - 20,
      ["", "", "Total Bruto", `${totalBruto.toFixed(2)} $`],
      true
    );
    drawTableRow(
      currentPage,
      finalYPosition - 40,
      ["", "", "IVA (19%)", `${iva.toFixed(2)} $`],
      true
    );
    drawTableRow(
      currentPage,
      finalYPosition - 60,
      ["", "", "Total Neto", `${totalNeto.toFixed(2)} $`],
      true
    );

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  }
}
