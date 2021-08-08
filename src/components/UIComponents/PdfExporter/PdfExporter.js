import { jsPDF } from "jspdf";

const PAGE_LIMIT = 28;
const LEFT_MARGIN = 20;
const TOP_MARGIN = 10;
const LINE_HEIGHT = 10;

const PdfExporter = {
	exportToPdf: function (lines, fileName, documentTitle) {
		const pdfFile = new jsPDF();
		let lineIndex = 1;

		pdfFile.setFont("times", "bold");
		pdfFile.setFontSize(18);
		pdfFile.text(
			documentTitle,
			pdfFile.internal.pageSize.getWidth() / 2,
			TOP_MARGIN + lineIndex * LINE_HEIGHT,
			"center"
		);
		lineIndex++;

		pdfFile.setFont("times", "normal");
		pdfFile.setFontSize(15);

		lines.forEach((pdfLine) => {
			if (lineIndex % PAGE_LIMIT == 0) {
				pdfFile.addPage("a4", "p");
				lineIndex = 1;
			}

			pdfFile.text(pdfLine, LEFT_MARGIN, TOP_MARGIN + lineIndex * LINE_HEIGHT);
			lineIndex++;
		});

		pdfFile.save(fileName + ".pdf");
	},
};

export default PdfExporter;
