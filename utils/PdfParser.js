export class PdfParser {

    static parse(pdfText) {

        const text = pdfText.replace(/\s+/g, ' ');

        const getValue = (regex) => {
            const match = text.match(regex);
            return match ? match[1].trim() : null;
        };

        const orderNo = getValue(/Order No:\s*([A-Z0-9]+)/);
        const productName = getValue(
            /1\s+([A-Za-z0-9]+[\s\S]*?)\s+AVPA3SL/
        );

        const cleanProductName = productName
            ? productName.replace(/\s+/g, ' ').trim()
            : null;

        const unitPrice = parseFloat(
            getValue(/AVPA3SL128-00987\s+\d+\s+([\d,]+\.\d+)/)?.replace(/,/g, '')
        );
        const quantity = parseInt(
            getValue(/AVPA3SL128-00987\s+(\d+)/),
            10
        );
        const invoiceDate = getValue(/Invoice Date:\s*(.+)/);
        const orderDate = getValue(/Order Date:\s*(.+)/);

        // Change 1: yaha se "\s+" hata diya
        const paymentMethod = getValue(/AED([A-Z]+)\d/);

        const subtotal = parseFloat(
            getValue(/Subtotal:\s*([\d,]+\.\d+)/)?.replace(/,/g, '')
        );

        const tax = parseFloat(
            getValue(/Tax:\s*([\d,]+\.\d+)/)?.replace(/,/g, '')
        );

        const discount = parseFloat(
            getValue(/Discount:\(-\)\s*([\d,]+\.\d+)/)?.replace(/,/g, '')
        );

        const grandTotal = parseFloat(
            getValue(/Grand Total:\s*([\d,]+\.\d+)/)?.replace(/,/g, '')
        );

        // Change 2: "Card" ke baad se space hata diya
        const paidByCard = parseFloat(
            getValue(/Paid by CardAED\s*([\d,]+\.\d+)/)?.replace(/,/g, '')
        );
        console.log(pdfText);
        console.log("Product :", cleanProductName);
        console.log("Unit Price :", unitPrice);
        console.log("Quantity :", quantity);
        return {
            orderNo,
            productName: cleanProductName,
            unitPrice,
            quantity,
            invoiceDate,
            orderDate,
            paymentMethod,
            subtotal,
            tax,
            discount,
            grandTotal,
            paidByCard
        };
    }
}