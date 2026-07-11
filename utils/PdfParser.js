import products from '../testdata/products.json';
export class PdfParser {

    static parse(pdfText) {

        const text = pdfText.replace(/\s+/g, ' ');
        const productSection = text.match(/ProductsSKUQtyUnit Price[\s\S]*?Subtotal:/);

        console.log("Product Section:");
        console.log(productSection ? productSection[0] : "Not Found");

        console.log("PDF Text:", text);
        const getValue = (regex) => {
            const match = text.match(regex);
            return match ? match[1].trim() : null;
        };

        const orderNo = getValue(/Order No:\s*([A-Z0-9]+)/);
        const cleanProductName =
            products.find(product => text.includes(product.name))?.name || null;

        const unitPrice = parseFloat(
            getValue(/AVPA3SL128-00987\s+\d+\s+([\d,]+\.\d+)/)?.replace(/,/g, '')
        );
        const quantity = parseInt(
            getValue(/AVPA3SL128-00987\s+(\d+)/),
            10
        );
        //const invoiceDate = getValue(/Invoice Date:\s*(.+)/);
        const invoiceDate = getValue(/Invoice Date:\s*(.*?)\s*Order Date:/);
        const orderDate = getValue(/Order Date:\s*(.*?)\s*Supplier:/);
        console.log("Invoice Date:", invoiceDate);
        console.log("Order Date:", orderDate);
        //const orderDate = getValue(/Order Date:\s*(.+)/);

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